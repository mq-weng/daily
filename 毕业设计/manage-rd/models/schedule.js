const db = require("./db");

// 新增日志，schedule:{userId,title,start,end}
function addSchedule(schedule) {
  return db.query("INSERT INTO schedule SET ?", schedule);
}

// 查询日志
function getSchedule(userId) {
  return db.query("SELECT * FROM schedule WHERE userId=? AND deleteState=?", [
    userId,
    1,
  ]);
}
//删除日记
function updateSchedule(id) {
  return db.query("UPDATE schedule SET deleteState=? WHERE id=?", [0, id]);
}
module.exports = {
  addSchedule,
  getSchedule,
  updateSchedule,
};
