const router = require("koa-router")();
const dairy = require("../controllers/dairy");

//获取日记列表
router.get("/getList", dairy.getList);
router.post('/writeDairy',dairy.writeDairy)

module.exports = router;