const express = require('express');

const config = require('../config');
const middleware = require('../middleware');
const initDb = require('../util/database');
const account = require('../controllers/account');
const user = require('../controllers/user');

let router = express();

initDb(database => {
  router.use(middleware({config, database}));

  router.use('/user', user({ config, database }));
  router.use('/account', account({ config, database }));
});

module.exports = router;