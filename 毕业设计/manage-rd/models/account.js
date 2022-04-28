const db = require("./db");

//记账,dairy:{userId,money,category,desc,income,expand}
function addAccount(account) {
  return db.query("INSERT INTO account SET ?", account);
}
// //更新(在记账之后调用)
// function update(totalIncome,totalExpand,userId) {
//   return db.query("UPDATE user SET totalIncome=?,totalExpand=? WHERE id=?", [totalIncome,totalExpand,userId]);
// }
//查询账目
function getAccount(userId) {
  return db.query("SELECT * FROM account WHERE userId=?", [userId]);
}
// function getTotal(userId) {
//   return db.query("SELECT totalIncome,totalExpand FROM user WHERE id=?", [userId]);
// }

module.exports = {
  addAccount,
  getAccount,
};
