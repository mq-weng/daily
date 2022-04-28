const { addAccount, getAccount } = require("../models/account");
let moment = require("moment");
// let { verifyAuthration } = require("../auth/index");
async function getAccountList(ctx) {
  let { userId, categorySelect, dateSelect, dateFlag } = ctx.query;
  console.log(typeof dateFlag);
  //dateFlag true 为按月
  let results = await getAccount(userId);
  let tableData = [];
  let data = { expand: {}, income: {} };
  let monthNumber = 0;
  let totalExpand = 0;
  let totalIncome = 0;
  if (dateFlag == "true") {
    dateSelect = moment(parseInt(dateSelect)).format("YYYY-MM");
    results.forEach((element) => {
      if (
        JSON.stringify(moment(element.date).format("YYYY-MM")) ==
        JSON.stringify(dateSelect)
      ) {
        tableData.push(element);
        totalExpand = totalExpand + element.expand;
        totalIncome = totalIncome + element.income;
      }
      element.date = moment(element.date).format("YYYY-MM-DD");
    });
    monthNumber = moment(dateSelect, "YYYY-MM").daysInMonth(); //获取当前月份的天数
  } else {
    dateSelect = moment(parseInt(dateSelect)).format("YYYY");
    results.forEach((element) => {
      if (
        JSON.stringify(moment(element.date).format("YYYY")) ==
        JSON.stringify(dateSelect)
      ) {
        tableData.push(element);
        totalExpand = totalExpand + element.expand;
        totalIncome = totalIncome + element.income;
      }
      element.date = moment(element.date).format("YYYY-MM-DD");
    });
  }
  let res = [];
  if (categorySelect == 0) {
    tableData.forEach((element) => {
      if (element.category == 0) {
        res.push(element);
      }
    });
  } else if (categorySelect == 1) {
    tableData.forEach((element) => {
      if (element.category == 1) {
        res.push(element);
      }
    });
  } else {
    res = tableData;
  }

  if (dateFlag == "true") {
    tableData.forEach((element) => {
      let index = element.date.split("-")[2];
      index = new String(parseInt(index.replace(/\"/,"")));
      if (element.category == 0) {
        if (!data.expand[index]) {
          data.expand[index] = parseInt(element.expand);
        } else {
          data.expand[index] = data.expand[index] + parseInt(element.expand);
        }
      } else {
        if (!data.income[index]) {
          data.income[index] = parseInt(element.income);
        } else {
          data.income[index] = data.income[index] + parseInt(element.income);
        }
      }
    });
  } else {
    tableData.forEach((element) => {
      let index = element.date.split("-")[1];
      index = new String(parseInt(index.replace(/\"/,"")));
      if (element.category == 0) {
        if (!data.expand[index]) {
          data.expand[index] = parseInt(element.expand);
        } else {
          data.expand[index] = data.expand[index] + parseInt(element.expand);
        }
      } else {
        if (!data.income[index]) {
          data.income[index] = parseInt(element.income);
        } else {
          data.income[index] = data.income[index] + parseInt(element.income);
        }
      }
    });
  }
  if (results.length > 0) {
    ctx.body = {
      state: "success",
      message: "成功",
      tableData: res,
      data: data,
      totalExpand: totalExpand,
      totalIncome: totalIncome,
      monthNumber: monthNumber,
    };
  } else {
    ctx.body = {
      state: "fail",
      message: "失败",
    };
  }
}
async function addAccountList(ctx) {
  let { category, money, desc, userId, date, classAccount } = ctx.request.body;
  date = moment(date).format("YYYY-MM-DD");
  let results;
  if (category == 1) {
    let income = money;
    results = await addAccount({
      income,
      category,
      money,
      desc,
      userId,
      date,
      classAccount,
    });
    // totalIncome = parseInt(totalIncome) + parseInt(money);
  } else {
    let expand = money;
    console.log(expand);
    // totalExpand = parseInt(totalExpand) + parseInt(money);
    results = await addAccount({
      expand,
      category,
      money,
      desc,
      userId,
      date,
      classAccount,
    });
  }
  // let results2 = await update(totalIncome, totalExpand, userId);
  // console.log(results2);
  if (results.insertId) {
    ctx.body = {
      state: "success",
    };
  }
}
module.exports = {
  getAccountList,
  addAccountList,
};
