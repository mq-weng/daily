var mysql = require("mysql");
const { HOST, USER, PASSWORD, DATABASE } = require("../config/db.config");
//连接池
var pool = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
});

// 封装数据库的调用格式
module.exports = {
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sql, values, (err, res) => {
          connection.release();
          if (err) {
            reject(err[0]);
          } else {
            resolve(res[0]);
          }
        });
      });
    });
  },
};
