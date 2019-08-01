const { validationResult } = require("express-validator/check");

const io = require("../socket");
const Channel = require("../models/channel");
const User = require("../models/user");

exports.addChannel = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(
      "There has been a validation error for some fields."
    );
    error.statusCode = 422;
    throw error;
  }
  const { name, details } = req.body;
  const channel = new Channel({
    name,
    details,
    creator: req.userId
  });
  try {
    await channel.save();
    io.getIO().emit("channels", {
      action: "add"
    });
    res
      .status(201)
      .json({ message: "Channel added successfully.", channel: channel });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find().populate(
      "creator",
      "_id username email profileImageUrl status"
    );
    res
      .status(200)
      .json({ message: "Channels fetched successfully.", channels: channels });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addStarredChannel = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    user.starred.push(req.body.currentChannelId);
    await user.save();
    res.status(201).json({
      message: "Channel starred successfully."
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.removeStarredChanel = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    user.starred.pull(req.body.currentChannelId);
    await user.save();
    res.status(201).json({
      message: "Channel un-starred successfully."
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getStarredChannels = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("starred");
    res.status(200).json({
      message: "Fetched starred channels successfully.",
      starredChannels: user.starred
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
