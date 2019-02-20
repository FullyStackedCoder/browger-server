const express = require('express');
const passport = require('passport');

const Account = require('../models/account');
const UserDataExt = require('./extensions/userData-ext');
const { authenticate, generateAccessToken, respond } = require('../middleware/authMiddleware');

module.exports = ({ config, database }) => {
  let api = express.Router();

  api.post('/register', (req, res) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
      if (err) {
        res.status(409).json({ message: `An error occured: ${err.message}` });
      } else if (userData) {
        res.status(300).json({ message: `Email ${req.body.email} already exists.`});
      } else {
        Account.register(new Account({ username: req.body.email }), req.body.password, function(err, account) {
          if (err) {
            res.status(500).json({ message: err });
          } else {
            passport.authenticate('local', {session: false })(req, res, () => {
              res.status(200).send('Successfully created new account');
            });
          }
        });
      }
    });
  });

  return api;
}