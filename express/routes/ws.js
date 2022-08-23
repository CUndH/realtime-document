const express = require("express");
const app = express();
var expressWs = require("express-ws");

expressWs(app);

app.ws("/tableChange", function (ws, req) {
  ws.send("你连接成功了");

  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

module.exports = app;
