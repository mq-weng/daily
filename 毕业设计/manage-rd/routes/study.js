const router = require("koa-router")();
const study = require("../controllers/study");
router.get("/getBookList", study.getBookList);
router.post("/updateBookList", study.updateBookList);
router.post("/addBookList", study.addBookList);
router.get("/getBookDetaile", study.getBookDetaileId);
router.post("/updateBookDetaile",study.updateBookDetaileId)
router.post("/deleteBookList",study.deleteBookList)
module.exports = router;
