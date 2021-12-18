const express = require("express");
const router = express.Router();
const UserValidator = require("../validators/userValidator");
const userCtrl = require("../controller/userCtrl");

router.post("/register", UserValidator, userCtrl.register);

//! Exporting User Router
module.exports = router;
