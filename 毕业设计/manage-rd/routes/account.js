const router = require("koa-router")();
const account = require("../controllers/account");

//获取账目信息
router.get("/getList", account.getAccountList);
router.post("/addList",account.addAccountList);
module.exports = router;