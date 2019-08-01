const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema(
  {
    messageBody: {
      type: String,
      required: true
    },
    timeStamp: {
      type: String,
      required: true
    },
    userId: {
      type: ObjectId,
      ref: "User"
    },
    channelId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    userAvatar: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
