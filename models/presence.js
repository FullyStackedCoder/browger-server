const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const presenceSchema = new Schema({
  UserId: {
    type: ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Presence", presenceSchema);
