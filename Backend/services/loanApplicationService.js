const dbService = require("../config/db.service");
const { decisionEngine } = require("./descisionEngine.service");
const driver = dbService();

var service = {};
service.submitLoanApplication=submitLoanApplication;
module.exports = service;
function submitLoanApplication(bussinessData) {
    return new Promise(async(resolve, reject) => {
        try {
            // storing business detail in database for future reference
            const applicationId = bussinessData.applicationId;
            const businessName = bussinessData.businessName;
            const yearOfEstb = bussinessData.yearOfEstb;
            const totalProfitOrLossByYear = bussinessData.totalProfitOrLossByYear;
            const loanAmount = bussinessData.loanAmount;
            const accountingProvider = bussinessData.accountingProvider;
            const balanceSheetData = bussinessData.balanceSheetData;
            //calculating preassessment value which has to give to the decision engine
            var preassessmentValue = 20;
            var wholeYearProfit = 0;
            var avgAssetVal = 0;
            for (let i = 0; i < balanceSheetData.length; i++) {
                wholeYearProfit += balanceSheetData[i].profitOrLoss;
                avgAssetVal += balanceSheetData[i].assetsValue;
            }

            avgAssetVal /= 12;

            if (wholeYearProfit > 0) {
                preassessmentValue = 60;
            }

            if (avgAssetVal > loanAmount) {
                preassessmentValue = 100;
            }
            console.log('preassessmentValue::', preassessmentValue);

            const session = driver.session();
            const query = 
      
        `MATCH (p:Person {applicationId:$applicationId})
        WITH p
        MERGE (la:LoanApplication {
          applicationId: $applicationId,
          businessName: $businessName,
          yearOfEstb: $yearOfEstb,
          accountingProvider: $accountingProvider,
          loanAmount: $loanAmount,
          totalProfitOrLossByYear: $totalProfitOrLossByYear,
          preassessmentValue: $preassessmentValue
        })
        WITH p, la
        CREATE (p)-[r:HAS_APPLIED_FOR_LOAN]->(la)
        RETURN la;
        `

        await session.run(query,
         {   applicationId:applicationId,
             businessName:businessName, 
             yearOfEstb:yearOfEstb, 
             totalProfitOrLossByYear:totalProfitOrLossByYear,
            loanAmount:loanAmount,
            accountingProvider:accountingProvider,
            preassessmentValue:preassessmentValue
        })
                .then((result) => {
                    if (result.records.length>0) {
                        console.log("Loan application of user are saved successfully");
                    } else {
                        console.log("Erron in saving loan application data of user");
                    }
                }).catch((err) => {
                    console.log("Erron in saving loan application data of user",err);
                })

            //call the third party decision engine for checking loan approval with the given business detail and calculated preassessment value
           // this just for completing the backend simulation, actual decision engine will be third party api which will call and give result
          const finalResult = decisionEngine(bussinessData,preassessmentValue);
          resolve({stat:true, data:finalResult})
             
        } catch (error) {
        console.log('Error in submitting loan application::',error);
            reject({stat:false,message:"Error in submitting loan application",error:error});
        }
    })
}