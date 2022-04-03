var router = require('koa-router')();
var user  = require('./user');
var dairy = require('./dairy')
// var account = require('./account')
var schedule = require('./schedule')
router.use('/user', user.routes());
router.use('/dairy',dairy.routes())
// router.use('/account',account.routes())
router.use('/schedule',schedule.routes())

module.exports = router;