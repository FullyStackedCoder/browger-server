const User = require("../models/user");
const io = require("../socket");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find a user with the given ID");
      error.statusCode = 404;
      throw error;
    }
    const updatedUser = user;
    updatedUser.status = "online";
    await updatedUser.save();
    io.getIO().emit("user status", {
      action: "set user status"
    });
    res.status(200).json({
      message: "Fetched user successfully.",
      userId: user._id,
      displayName: user.username,
      email: user.email,
      profileImageUrl: user.profileImageUrl
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find(
      {},
      "_id username email profileImageUrl status"
    );
    res
      .status(200)
      .json({ message: "Fetched all users successfully.", users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.setUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find a user with the given ID");
      error.statusCode = 404;
      throw error;
    }
    const updatedUser = user;
    updatedUser.status = "offline";
    await updatedUser.save();
    io.getIO().emit("user status", {
      action: "set user status"
    });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveUserColors = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find a user with the given ID");
      error.statusCode = 404;
      throw error;
    }
    user.colors.push({
      primaryColor: req.body.colorPrimary,
      secondaryColor: req.body.colorSecondary
    });
    await user.save();
    res.status(201).json({
      message: "Successfully saved user colors.",
      userColors: user.colors
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUserColors = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find a user with the given ID");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: "Successfully fetched user colors",
      userColors: user.colors
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateAvatarImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("Could not find a user with the given ID");
      error.statusCode = 404;
      throw error;
    }
    user.profileImageUrl = req.body.profileImageUrl;
    await user.save();
    res.status(200).json({
      message: "Updated user avatar successfully.",
      userId: user._id,
      displayName: user.username,
      email: user.email,
      profileImageUrl: user.profileImageUrl
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
