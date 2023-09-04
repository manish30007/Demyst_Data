const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const path = require("path");

const dbService = require('./config/db.service');

const userRoute = require('./routes/userRoute');
const balanceSheetRoute = require('./routes/balanceSheetRoute');
const loanApplicationRoute = require('./routes/loanApplicationRoute');
const driver = dbService();

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: true,credentials:true}));

app.use("/api/user", userRoute);
app.use("/api/accounting", balanceSheetRoute);
app.use("/api/decision", loanApplicationRoute);

app.listen(7000, function () {
    console.log("Server running on Port :: ", 7000);
  });
  
module.exports = app;