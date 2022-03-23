var router = require('koa-router')();
var user  = require('./user');

router.use('/user', user.routes());

module.exports = router;