const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "offline"
  },
  starred: [
    {
      type: Schema.Types.ObjectId,
      ref: "Channel"
    }
  ],
  colors: [
    {
      primaryColor: {
        type: String,
        default: ""
      },
      secondaryColor: {
        type: String,
        default: ""
      }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
