const express = require("express");

const isAuth = require("../middleware/is-auth");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/me", isAuth, userController.getUser);

router.get("/all", isAuth, userController.getAllUsers);

router.get("/status", isAuth, userController.setUserStatus);

router.post("/save-user-colors", isAuth, userController.saveUserColors);

router.get("/get-user-colors", isAuth, userController.getUserColors);

router.post("/update-avatar-image", isAuth, userController.updateAvatarImage);

module.exports = router;
