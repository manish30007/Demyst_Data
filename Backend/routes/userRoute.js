const express = require("express");

const router = express.Router();

const {registrationController, loginController} = require("../controller/userController");

router.post("/signUp", registrationController);
router.post("/login", loginController);

module.exports = router;