const db = require("./db");


// 获取书籍 userId
function getBook(userId) {
  return db.query("SELECT * FROM study WHERE userId=?", [userId]);
}

// 添加书籍 book:{userId,bookName}
function addBook(book) {
  return db.query(`INSERT INTO study SET ?`, book);
}

// 修改阅读状态
function updateBook(id,bookState){
  return db.query("UPDATE study SET bookState=? WHERE id=?", [bookState,id]);
}
module.exports = {
  getBook,
  addBook,
  updateBook
};
