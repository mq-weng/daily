const db = require("./db");

// 获取书籍 userId
function getBook(userId) {
  return db.query("SELECT * FROM study WHERE userId=? AND deleteState=?", [
    userId,
    1,
  ]);
}
// 获取书籍 id
function getBookDetaile(id) {
  return db.query("SELECT * FROM study WHERE id=?", [id]);
}
// 添加书籍 book:{userId,bookName}
function addBook(book) {
  return db.query(`INSERT INTO study SET ?`, book);
}

function updateBookDetaile(
  id,
  bookName,
  bookState,
  curPage,
  totalPage,
  author
) {
  return db.query(
    "UPDATE study SET bookName=?,bookState=?,curPage=?,totalPage=?,author=? WHERE id=?",
    [bookName, bookState, curPage, totalPage, author, id]
  );
}
// 修改阅读状态
function updateBook(id, bookState) {
  return db.query("UPDATE study SET bookState=? WHERE id=?", [bookState, id]);
}

// 删除课程
function deleteBook(id) {
  return db.query("UPDATE study SET deleteState=? WHERE id=?", [0, id]);
}
module.exports = {
  getBook,
  addBook,
  updateBook,
  getBookDetaile,
  updateBookDetaile,
  deleteBook,
};
