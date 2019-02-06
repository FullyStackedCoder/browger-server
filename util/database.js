const mongoose = require('mongoose');

const config = require('../config');

module.exports = callback => {
  let db;
  mongoose.connect(config.mongoUrl, function(err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(config.mongoUrl);
    db = database;
    console.log("Database connection is ready");
    callback(db)
  })
}