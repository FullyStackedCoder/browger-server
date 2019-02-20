const express = require('express');

const config = require('../config');
const middleware = require('../middleware');
const initDb = require('../util/database');
const account = require('../controllers/account');

let router = express();

initDb(database => {
  router.use(middleware({config, database}));

  router.use('/account', account({config, database}));
});

module.exports = router;