const router = require('express').Router();
const routes = require('./api');

router.use(routes);

module.exports = router;