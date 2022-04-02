const db = require('./db')

//发表日记,dairy:{userId,content}
function addDairy(dairy){
    return db.query('INSERT INTO dairy SET ?',dairy)
}

//查询日记,
function getDairy(userId){
    return db.query('SELECT id,content FROM dairy WHERE userId=?',[userId])
}

module.exports = {
    addDairy,
    getDairy
}