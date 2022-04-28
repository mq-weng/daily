const router = require("koa-router")();
const course = require("../controllers/course");

//获取日记列表
router.get("/getCourseList", course.getCourseList);
router.post('/addCourseList',course.addCourseList);
router.post('/editeCourseList',course.editeCourseList);
router.post('/deleteCourseList',course.deleteCourseList);
module.exports = router;