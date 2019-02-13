const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const socket = require('socket.io');

const LocalStrategy = require('passport-local').Strategy;

const config = require('./config');
const routes = require('./routes');

const app = express();
app.server = http.createServer(app);
const io = socket(app.server);

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use(passport.initialize());
let Account = require('./models/account');
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/v1', routes);

app.get('/', (req, res, next) => {
  res.json({message: 'Chat API is ALIVE!'})
});

app.server.listen(config.port);