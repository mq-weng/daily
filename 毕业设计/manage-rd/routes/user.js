const router = require("koa-router")();
const user = require("../controllers/user");
//用户登录
router.post("/login", user.login);

//用户注册
// router.get("/regist",userControl.check);

//用户注册表单提交
router.post("/regist", user.regist);
module.exports = router;
