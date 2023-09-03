const express = require("express");

const router = express.Router();

const {fetchBalanceSheet} = require("../controller/balanceSheetController");

router.post("/balanceSheet", fetchBalanceSheet);

module.exports = router;