const express = require("express");

const router = express.Router();

const {loanApplicationController} = require("../controller/loanApplicationController");

router.post("/engine", loanApplicationController);

var jwt = require("jsonwebtoken");
const secretKey = 'my-secret-key';

module.exports = router;

function verifyToken(req, res, next) {
    const token = req.cookies.authToken;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }