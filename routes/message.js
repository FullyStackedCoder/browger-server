const express = require("express");

const isAuth = require("../middleware/is-auth");
const messageController = require("../controllers/message");

const router = express.Router();

router.post("/add", isAuth, messageController.addMessage);

router.get("/channel/:channelId", isAuth, messageController.getChannelMessages);

router.get(
  "/notifications/:channelId",
  isAuth,
  messageController.getNotificationMessagesCount
);

module.exports = router;
