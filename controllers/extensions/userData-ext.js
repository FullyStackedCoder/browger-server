const userData = require('../../models/user');

class UserDataExt {
  static findUserByEmail(email, callback) {
    userData.findOne({ 'email': email }, (err, userData) => {
      if(err) {
        return callback(err, null);
      } else {
        return callback(null, userData)
      }
    });
  }
}

module.exports = UserDataExt;