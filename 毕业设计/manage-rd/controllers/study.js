const { getBook, addBook, updateBook } = require("../models/study");
let { verifyAuthration } = require("../auth/index");

async function getBookList(ctx) {
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
  let resultes = await getBook(userId);
  let list0 = [];
  let list1 = [];
  let list2 = [];
  if (resultes.length > 0) {
    resultes.forEach((element) => {
      switch (element.bookState) {
        case 0:
          list0.push(element);
          break;
        case 1:
          list1.push(element);
          break;
        case 2:
          list2.push(element);
          break;
      }
    });
    ctx.body = {
      state: "success",
      list0: list0,
      list1: list1,
      list2: list2,
    };
  } else {
    ctx.body = {
      state: "fail",
    };
  }
}
async function addBookList(ctx) {
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
  let { bookName } = ctx.request.body;
  let resultes = await addBook({ userId, bookName });
  if(resultes.insertId){
    ctx.body = {
      state: "success",
      message: "添加书籍成功",
    };
  }else{
    ctx.body = {
      state: "fail",
      message: "获取失败",
    };
  }
}
async function updateBookList(ctx) {
  verifyAuthration(ctx);
  const param = ctx.request.body;
  let resultes = await updateBook(param.id, param.bookState);
  if (resultes.affectedRows) {
    ctx.body = {
      state: "success",
      meaaage: "成功",
    };
  }
}

module.exports = {
  getBookList,
  updateBookList,
  addBookList
};
