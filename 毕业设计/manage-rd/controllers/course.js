const {
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../models/course");
let { verifyAuthration } = require("../auth/index");
async function getCourseList(ctx) {
  let auth = verifyAuthration(ctx);
  let userId;
  await auth.then(
    (res) => {
      userId = res.id;
    },
    (err) => {
      ctx.body = {
        state: "fail",
        message: "获取失败",
      };
    }
  );
  let resultes = await getCourse(userId);
  if (resultes.length) {
    ctx.body = {
      state: "success",
      message: "添加书籍成功",
      data: resultes,
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "获取失败",
    };
  }
}
async function addCourseList(ctx) {
  // 添加书籍 book:{userId,bookName}
  let auth = verifyAuthration(ctx);
  let userId;
  await auth.then(
    (res) => {
      userId = res.id;
    },
    (err) => {
      ctx.body = {
        state: "fail",
        message: "获取失败",
      };
    }
  );
  let { courseName, courseOrigin, courseProgress } = ctx.request.body;
  let resultes = await addCourse({
    userId,
    courseName,
    courseOrigin,
    courseProgress,
  });
  if (resultes.insertId) {
    ctx.body = {
      state: "success",
      message: "添加课程成功",
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "添加失败",
    };
  }
}
async function editeCourseList(ctx) {
  verifyAuthration(ctx);
  const param = ctx.request.body;
  let { courseName, courseOrigin, courseProgress, id } = param;
  let resultes = await updateCourse(
    courseName,
    courseOrigin,
    courseProgress,
    id
  );
  if (resultes.affectedRows) {
    ctx.body = {
      state: "success",
      meaaage: "成功",
    };
  }
}
async function deleteCourseList(ctx) {
  console.log("Ff");
  verifyAuthration(ctx);
  const param = ctx.request.body;
  let { id } = param;
  let resultes = await deleteCourse(id);
  if (resultes.affectedRows) {
    ctx.body = {
      state: "success",
      meaaage: "成功",
    };
  }else{
    ctx.body = {
      state: "fail",
      meaaage: "失败",
    };
  }
}
module.exports = {
  getCourseList,
  addCourseList,
  editeCourseList,
  deleteCourseList,
};
