const express = require("express");
const { body } = require("express-validator/check");

const isAuth = require("../middleware/is-auth");
const channelController = require("../controllers/channel");

const router = express.Router();

router.post(
  "/add",
  isAuth,
  [
    body("name", "Channel name should be at least 2 characters long.")
      .trim()
      .isLength({ min: 2 }),
    body("details", "Channel description should be at least 6 characters long.")
      .trim()
      .isLength({ min: 6 })
  ],
  channelController.addChannel
);

router.get("/channels", isAuth, channelController.getChannels);

router.post("/channel-starred", isAuth, channelController.addStarredChannel);

router.delete(
  "/channel-unstarred",
  isAuth,
  channelController.removeStarredChanel
);

router.get("/starred-channels", isAuth, channelController.getStarredChannels);

module.exports = router;
