const express = require("express");
const router = express.Router();
const UserValidator = require("../validators/userValidator");
const userCtrl = require("../controller/userCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", UserValidator, userCtrl.register);

router.post("/activation", userCtrl.activate);

router.post("/login", userCtrl.login);

router.post("/refresh_token", userCtrl.getAccessToken);

router.post("/forgot", userCtrl.forgetPassword);

router.post("/reset", auth, userCtrl.resetPassword);

router.get("/info", auth, userCtrl.getUserInfo);

router.get("/allinfo", auth, authAdmin, userCtrl.getUsersAllInfo);

router.get("/logout", userCtrl.logout);

router.patch("/update", auth, userCtrl.updateUser);

router.patch("/update_role/:id", auth, authAdmin, userCtrl.updateUsersRole);

router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);

//! Exporting User Router
module.exports = router;
