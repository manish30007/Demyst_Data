// this just for completing the backend simulation, actual decision engine will be third party api which will call and give result
var service={}
service.decisionEngine=decisionEngine;

module.exports=service;

function decisionEngine(businessData,preassessment){
if(preassessment>=60)return 'Loan approved';
else return "Loan not approved";
}