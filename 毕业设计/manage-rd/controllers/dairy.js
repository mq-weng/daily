const { getDairy, addDairy } = require("../models/dairy.js");

async function getList(ctx) {
  let { id } = ctx.query;
  let results = await getDairy(id);
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
    console.log(ctx.request.body)
  let { content, id } = ctx.request.body;
  let resultes = await addDairy({ content, userId:id });
  if(resultes.insertId){
    ctx.body = {
        state: "success",
        message: "日记发布成功",
      };
  }else{
    ctx.body = {
        state: "fail",
        message: "日记发布失败",
      };
  }
}
module.exports = {
  getList,
  writeDairy,
};
