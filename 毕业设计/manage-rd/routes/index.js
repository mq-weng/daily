var router = require('koa-router')();
var user  = require('./user');
var dairy = require('./dairy');
var account = require('./account');
var schedule = require('./schedule');
var study = require('./study');
var course = require('./course')
router.use('/user', user.routes());
router.use('/dairy',dairy.routes())
router.use('/account',account.routes())
router.use('/schedule',schedule.routes())
router.use('/study',study.routes())
router.use('/course',course.routes())
module.exports = router;