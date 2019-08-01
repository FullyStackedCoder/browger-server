const Message = require("../models/message");
const io = require("../socket");

exports.addMessage = async (req, res, next) => {
  const {
    messageBody,
    userId,
    channelId,
    username,
    userAvatar,
    messageType
  } = req.body;
  let newMessage = new Message();
  newMessage.messageBody = messageBody;
  newMessage.timeStamp = getCurrentTimeUTC();
  newMessage.userId = userId;
  newMessage.channelId = channelId;
  newMessage.username = username;
  newMessage.userAvatar = userAvatar;
  newMessage.messageType = messageType;

  try {
    await newMessage.save();
    io.getIO().emit("messages", { action: "added", payload: newMessage });
    res.status(201).json({ message: "Message saved successfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getChannelMessages = async (req, res, next) => {
  const channelId = req.params.channelId;
  try {
    const messages = await Message.find({ channelId: channelId });
    res.status(200).json({
      message: "Fetched channel messages successfully.",
      messages
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getNotificationMessagesCount = async (req, res, next) => {
  const channelId = req.params.channelId;
  try {
    const totalMessages = await Message.find({
      channelId: channelId
    }).countDocuments();
    res.status(200).json({
      message: "Fetched channel messages successfully.",
      totalMessages
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const getCurrentTimeUTC = () => {
  let tmLoc = new Date();
  return tmLoc.getTime();
};
