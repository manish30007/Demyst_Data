const express = require("express");

const router = express.Router();

const {loanApplicationController} = require("../controller/loanApplicationController");

router.post("/engine", loanApplicationController);

module.exports = router;