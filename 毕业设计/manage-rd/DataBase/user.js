const db = require('./db')

// console.log(db.query("SELECT * FROM account").then((res)=>{console.log(res)}))
// 注册
function addUser(userName,userPassword){
    // return db.query("INSERT * FROM user")
}

// 用来登录
function getUser(userName){
    return db.query(`SELECT password FROM user WHERE name=?`,userName)
}

module.exports = {
    addUser,
    getUser
}