var userService = require('../services/user.service');

exports.registrationController = (req, res) =>{
  userService.registrationService(req,res)
  .then((data)=>{
    res.status(200).send(data);
   })
  .catch((data)=>{
    res.status(400).send(data);
  })
  }
exports.loginController = (req, res) =>{
  userService.loginService(req,res)
  .then((data)=>{
    res.status(200).send(data);
   })
  .catch((data)=>{
    res.status(401).send(data);
  })
  }

