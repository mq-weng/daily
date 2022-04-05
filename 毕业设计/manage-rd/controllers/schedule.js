const { addSchedule, getSchedule } = require("../models/schedule");
let moment = require("moment");
async function getScheduleList(ctx) {
  const { userId } = ctx.query;
  let results = await getSchedule(userId);
  if (results.length > 0) {
    const res = [];
    results.forEach((element) => {
      let cur = {};
      cur.id = element.id;
      cur.title = element.title;
      cur.start = moment(element.start).format("YYYY-MM-DD");
      cur.end = moment(element.end).format("YYYY-MM-DD");
      cur.category = "time";
      res.push(cur);
    });
    ctx.body = {
      state: "success",
      message: "成功",
      schedules: res,
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "获取列表失败",
    };
  }
}

async function addScheduleList(ctx) {
  let { userId, title, start, end } = ctx.request.body;
  //时间转化
  start = moment(start).format("YYYY-MM-DD");
  end = moment(end).format("YYYY-MM-DD");
  let results = await addSchedule({ userId, title, start, end });
  if (results.insertId) {
    ctx.body = {
      state: "success",
      message: "发布成功",
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "发布失败",
    };
  }
}
module.exports = {
  getScheduleList,
  addScheduleList,
};
