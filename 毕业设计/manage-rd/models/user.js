const db = require("./db");

// console.log(db.query("SELECT * FROM account").then((res)=>{console.log(res)}))

// 注册,user:{name,password}
function addUser(user) {
  return db.query("INSERT INTO user SET ?", [user]);
}

// 登录
function getUser(name, password) {
  return db.query(`SELECT id FROM user WHERE name=? and password=?`, [
    name,
    password,
  ]);
}

module.exports = {
  addUser,
  getUser,
};
