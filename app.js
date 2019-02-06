const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const config = require('./config');

const app = express();
app.server = http.createServer(app);
const io = socket(app.server);

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.get('/', (req, res, next) => {
  res.json({message: 'Chat API is ALIVE!'})
});

app.server.listen(config.port);