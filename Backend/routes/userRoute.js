const express = require("express");

const router = express.Router();

const {registrationController, loginController} = require("../controller/userController");

router.post("/register", registrationController);
router.post("/login", loginController);

module.exports = router;