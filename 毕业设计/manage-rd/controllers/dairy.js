const { getDairy, addDairy, updateDairy } = require("../models/dairy.js");
let { verifyAuthration } = require("../auth/index");
let moment = require("moment");
async function getList(ctx) {
  let { id } = ctx.query;
  let results = await getDairy(id);
  results.map((item)=>{
    item.time = moment(item.time).format("YYYY-MM-DD");
  })
  if (results.length > 0) {
    ctx.body = {
      state: "success",
      message: "成功",
      list: results,
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "获取列表失败",
    };
  }
}
async function writeDairy(ctx) {
  let { content, id } = ctx.request.body;
  let resultes = await addDairy({ content, userId: id, time: moment(Date.now()).format("YYYY-MM-DD") });
  if (resultes.insertId) {
    ctx.body = {
      state: "success",
      message: "日记发布成功",
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "日记发布失败",
    };
  }
}
async function deleteDairy(ctx) {
  verifyAuthration(ctx);
  const param = ctx.request.body;
  let { id } = param;
  let resultes = await updateDairy(id);
  if (resultes.affectedRows) {
    ctx.body = {
      state: "success",
      message: "成功",
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "失败",
    };
  }
}
module.exports = {
  getList,
  writeDairy,
  deleteDairy,
};
