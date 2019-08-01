const express = require("express");

const isAuth = require("../middleware/is-auth");
const uploadController = require("../controllers/upload");

const router = express.Router();

router.get("/new/:type", isAuth, uploadController.newUpload);

router.get("/new-avatar/:type", isAuth, uploadController.newAvatar);

module.exports = router;
