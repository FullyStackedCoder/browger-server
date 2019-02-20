const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  displayName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  profileImageUrl: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('User', userSchema);