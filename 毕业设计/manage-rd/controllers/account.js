const {
  addAccount,
  update,
  getAccount,
  getTotal,
} = require("../models/account");
async function getAccountList(ctx) {
  const { userId } = ctx.query;
  console.log(ctx.query);
  let results1 = await getAccount(userId);
  let results2 = await getTotal(userId);
  if (results1.length > 0 && results2.length > 0) {
    ctx.body = {
      state: "success",
      message: "成功",
      tableData: results1,
      totalList: results2[0],
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "失败",
    };
  }
}
async function addAccountList(ctx) {
  let { category, money, desc, userId, totalIncome, totalExpand } =
    ctx.request.body;
  let results1;
  if (category == 1) {
    let income = money;
    results1 = await addAccount({ income, category, money, desc, userId });
    totalIncome = parseInt(totalIncome) + parseInt(money);
  } else {
    let expand = money;
    console.log(expand)
    totalExpand = parseInt(totalExpand) + parseInt(money);
    results1 = await addAccount({ expand, category, money, desc, userId });
  }
  let results2 = await update(totalIncome, totalExpand, userId);
  console.log(results2);
  if (results1.insertId) {
    ctx.body = {
      state: "success",
    };
  }
}
module.exports = {
  getAccountList,
  addAccountList,
};
