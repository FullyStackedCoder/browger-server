const User = require("../models/user");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EXPIRES_IN = 60 * 60; // 1 hour
const SUPER_SECRET = "Brow-ger-ly Chat 4 Free";

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { username, email, password, profileImageUrl } = req.body;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: hashedPw,
      profileImageUrl: profileImageUrl
    });
    const result = await user.save();
    const token = await jwt.sign(
      {
        email: result.email,
        userId: result._id.toString()
      },
      SUPER_SECRET,
      {
        expiresIn: EXPIRES_IN
      }
    );
    res.status(201).json({
      message: "User created.",
      userId: result._id,
      token: token,
      expiresIn: EXPIRES_IN
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loadedUser = await User.findOne({ email: email });
    if (!loadedUser) {
      const error = new Error("A user with that email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, loadedUser.password);
    if (!isEqual) {
      const error = new Error("Password is incorrect.");
      error.statusCode = 401;
      throw error;
    }
    const token = await jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      SUPER_SECRET,
      {
        expiresIn: EXPIRES_IN
      }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      expiresIn: EXPIRES_IN
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
