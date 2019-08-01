const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user");
const authController = require("../controllers/auth");

const router = express.Router();

router.put(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be atleast 6 characters long.")
      .trim()
      .isLength({ min: 6 }),
    body("username")
      .trim()
      .withMessage("Username should be atleast 6 characters long.")
      .isLength({ min: 6 }),
    body("passwordConfirmation")
      .trim()
      .withMessage("Passwords did not match.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match.");
        }
        return true;
      })
  ],
  authController.register
);

router.post("/login", authController.login);

module.exports = router;
