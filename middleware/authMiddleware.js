const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const EXPIRES_IN = 60*60; // 1 hour
const SUPER_SECRET = "Brow-ger-ly Chat 4 Free";

const authenticate = expressJwt({ secret: SUPER_SECRET });

const generateAccessToken = (req, res, next) => {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id
  }, SUPER_SECRET, {
    expiresIn: EXPIRES_IN
  });
  next();
}

const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

module.exports = {
  authenticate,
  generateAccessToken,
  respond
}