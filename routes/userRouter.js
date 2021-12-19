const express = require("express");
const router = express.Router();
const UserValidator = require("../validators/userValidator");
const userCtrl = require("../controller/userCtrl");

router.post("/register", UserValidator, userCtrl.register);

router.post("/activation", userCtrl.activate);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

//! Exporting User Router
module.exports = router;
