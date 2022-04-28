const db = require("./db");

// 获取书籍 userId
function getCourse(userId) {
  return db.query("SELECT * FROM course WHERE userId=? AND deleteState=?", [
    userId,
    1,
  ]);
}

// 添加书籍 book:{userId,...}
function addCourse(course) {
  return db.query(`INSERT INTO course SET ?`, course);
}

// 修改课程信息
function updateCourse(courseName, courseOrigin, courseProgress, id) {
  return db.query(
    "UPDATE course SET courseName=?,courseOrigin=?, courseProgress=? WHERE id=?",
    [courseName, courseOrigin, courseProgress, id]
  );
}
// 删除课程
function deleteCourse(id) {
  return db.query("UPDATE course SET deleteState=? WHERE id=?", [0, id]);
}
module.exports = {
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
