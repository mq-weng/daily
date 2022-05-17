const router = require("koa-router")();
const schedule = require("../controllers/schedule");
router.get("/getScheduleList", schedule.getScheduleList);
router.post("/addScheduleList", schedule.addScheduleList);
router.post("/deleteSchedule", schedule.deleteSchedule);

module.exports = router;
