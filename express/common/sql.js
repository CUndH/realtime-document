const mysql = require("mysql");

const config = require("../config").mysql;

const db = mysql.createConnection(config);

db.connect((err) => {
  if (err) {
    console.log("数据库连接失败:" + err.message);
    return;
  }
  console.log("数据库连接成功！");
});

module.exports = db;
