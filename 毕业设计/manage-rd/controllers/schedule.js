const { addSchedule, getSchedule } = require("../models/schedule");

async function getScheduleList(ctx) {
  const { userId } = ctx.query;
  let results = await getSchedule(userId);
  console.log(results)
  if (results.length > 0) {
    const res = [];
    results.forEach((element) => {
      console.log(typeof element.start)
      let cur = {};
      cur.id = element.id;
      cur.title = element.title;
      cur.start = Date.parse(element.start);
      cur.end = Date.parse(element.end);
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
  //时间转化问题
  // start = new UTC(new Date(start).toISOString());
  // end = new UTC(new Date(end).toISOString())
  let results = await addSchedule({ userId, title, start, end });
  // console.log(results)
}
module.exports = {
  getScheduleList,
  addScheduleList,
};
