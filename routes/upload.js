const router = require("express").Router();
const uploadImage = require('../middleware/uploadimage');
const uploadCtrl = require("../controller/uploadCtrl");

router.post("/upload_avatar", uploadImage, uploadCtrl.uploadAvatar);

//! Exporting Upload Router
module.exports = router;