const express = require("express");

const router = express.Router();
var jwt = require("jsonwebtoken");
const secretKey = 'my-secret-key';


const {fetchBalanceSheet} = require("../controller/balanceSheetController");

router.post("/balanceSheet", fetchBalanceSheet);

module.exports = router;

function verifyToken(req, res, next) {
    // console.log('myRequest::',req);
    const token = req.cookies.authToken;
  console.log(token);
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