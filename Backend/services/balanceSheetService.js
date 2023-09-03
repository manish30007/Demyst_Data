const dbService = require("../config/db.service");
const driver = dbService();

var service = {};

service.fetchBalanceSheet = fetchBalanceSheet;

module.exports = service;

function fetchBalanceSheet(AccountingProvider,email){
    return new Promise((resolve,reject)=>{
        try {
        var balanceSheet;
            //We can use a Map data structure, with the name of the provider as the key and the related URL as the associated value, to record different third-party accounting provider API URLs.

        if(AccountingProvider=='Xero'){
            //call third party Xero api and get balance sheet by using email or any other user data and initialise the balanceSheet variable. 
            //i am now just fetching balance from a folder named 'common' in backend directory having balance sheet in the form of array of object.
            balanceSheet = require('./common/balanceSheet').sheet;
            resolve({stat:true, data:balanceSheet});

        }else if(AccountingProvider=='MYOB'){
            //call third party MYOB api and get balance sheet by using email or any other user data and initialise the balanceSheet variable. 
            //i am now just fetching balance from a folder named 'common' in backend directory having balance sheet in the form of array of object.
            balanceSheet = require('./common/balanceSheet').sheet;
            resolve({stat:true, data:balanceSheet});

        }else{
            reject({stat:false, message:"Error in fetching balance sheet",}); 
        }
        } catch (error) {
            console.log("Error in fetching Balance Sheet",error);
            reject({stat:false, message:"Error in fetching  balance sheet", error:error});
        }
    })
}