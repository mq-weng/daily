const { getUser, addUser } = require("../models/user");
let creatAuth = require("../auth/index");

// getUser("小王").then((res) => {
//   console.log(res.password);
// });

//用户登录
async function login(ctx) {
  //1.接收表单
  let { name, password } = ctx.request.body;
  //2.安全验证
  if (name.length == 0) {
    ctx.body = {
      inputState: "fail",
      message: "用户名不能为空！",
    };
  } else {
    //连接数据库
    let results = await getUser(name, password);
    if (results) {
      let { id } = results;
      //生成token
      let loginUser = name;
      let token = creatAuth.creatAuthration({ name, password });
      ctx.body = { state: "success", token, loginUser, id };
    } else {
      ctx.body = {
        message: "登录失败，用户名或密码不正确",
        state: "fail",
      };
    }
  }
}
// login({request:{body: {name: '小王',password: '123456'}}})

//用户注册
async function regist(ctx) {
  // 1. 接收表单数据
  let { name, password } = ctx.request.body;
  // 2. 安全验证
  if (name.trim().length == 0) {
    ctx.body = {
      message: "用户名不能为空！",
    };
  } else {
    // 3. 连接数据库
    addUser({ name, password })
      .then(
        (res) => {
          ctx.body = {
            state: "success",
            message: "注册成功",
          };
        },
        (err) => {
          ctx.body = {
            message: "注册失败!",
          };
        }
      )
      .catch(() => {
        ctx.body = {
          message: "注册失败!",
        };
      });
  }
}
// console.log(regist({ request: { body: { name: "小红", password: "5671*" } } }));
module.exports = {
  login,
  regist,
};
