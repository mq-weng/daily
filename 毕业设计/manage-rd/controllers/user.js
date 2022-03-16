const { getUser } = require("../DataBase/user");
getUser("小王").then((res) => {
  console.log(res.password);
});
