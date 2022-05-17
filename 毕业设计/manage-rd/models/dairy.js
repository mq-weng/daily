const db = require('./db')

//发表日记,dairy:{userId,content}
function addDairy(dairy){
    return db.query('INSERT INTO dairy SET ?',dairy)
}

//查询日记,
function getDairy(userId){
    return db.query('SELECT id,content,time FROM dairy WHERE userId=? AND deleteState=?',[userId,1])
}

//删除日记
function updateDairy(id) {
    return db.query("UPDATE dairy SET deleteState=? WHERE id=?", [0, id]);
}
module.exports = {
    addDairy,
    getDairy,
    updateDairy
}