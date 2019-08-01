const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const config = require("./config");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const channelRoutes = require("./routes/channel");
const messageRoutes = require("./routes/message");
const uploadRoutes = require("./routes/upload");

const app = express();

app.use(
  bodyParser.json({
    limit: config.bodyLimit
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/channel", channelRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
});

app.get("/", (req, res, next) => {
  res.json({ message: "Chat API is ALIVE!" });
});

let typingUsers = {};

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("Database connection is ready");
    const server = app.listen(config.port);
    const io = require("./socket").init(server);
    io.on("connection", socket => {
      console.log("Client connected...");
      socket.on("startType", data => {
        console.log("User " + data.username + " is writing a message...");
        typingUsers[data.username] = data.channelId;
        io.emit("userTypingUpdate", { typingUsers, channelId: data.channelId });
      });
      socket.on("stopType", data => {
        console.log(
          "User " + data.username + " has stopped writing a message..."
        );
        delete typingUsers[data.username];
        io.emit("userTypingUpdate", { typingUsers, channelId: data.channelId });
      });
    });
  })
  .catch(err => console.log(err));
