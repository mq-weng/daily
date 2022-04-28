const router = require("koa-router")();
const study = require("../controllers/study");
router.get("/getBookList", study.getBookList);
router.post("/updateBookList",study.updateBookList);
router.post("/addBookList",study.addBookList)

module.exports = router;
