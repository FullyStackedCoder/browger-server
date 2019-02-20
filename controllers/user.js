const express = require('express');

const User = require('../models/user');
const { authenticate } = require('../middleware/authMiddleware');

module.exports = ({ config, database }) => {
  let api = express.Router();

  api.post('/add', authenticate, (req, res) => {
    let newUser = new User();
    newUser.displayName = req.body.name;
    newUser.email = req.body.email;
    newUser.profileImageUrl = req.body.profileImageUrl;

    newUser.save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => res.status(500).json({ message: err }));
  });

  return api;
}