const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
});

accountSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', accountSchema);