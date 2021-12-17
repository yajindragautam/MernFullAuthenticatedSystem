const express = require("express");
const router = express.Router();
const userCtrl = require('../controller/userCtrl');

router.post('/register', userCtrl.register);


//! Exporting User Router
module.exports = router;