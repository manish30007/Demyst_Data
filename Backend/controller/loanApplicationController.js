var loanApplicationService = require('../services/loanApplicationService');

exports.loanApplicationController = (req, res)=>{
    try {
        loanApplicationService.submitLoanApplication(req,res)
        .then((data)=>{
            res.status(200).send(data);
           })
          .catch((data)=>{
            res.status(400).send(data);
          })
    } catch (error) {
        res.status(400).send(data);
    }
}