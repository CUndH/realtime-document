const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
// const createError = require("http-errors");
// const morgan = require("morgan");
// const logger = require("./common/logger");var winston = require('winston');
var expressWs = require("express-ws");
const wsRouter = require("./routes/ws");

var winston = require("winston");
var expressWinston = require("express-winston");

const routerConfig = require("./routes");

// app.use(morgan("dev"));
expressWs(app);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
      new winston.transports.File({
        filename: "logs/success.log",
      }),
    ],
  })
);

app.use(cookieParser());

app.use("/app", routerConfig);

// app.use("/ws", wsRouter);

app.ws("/ws", function (ws, req) {
  ws.send("你连接成功了");
  ws.on("message", function (msg) {
    console.log(msg);
  });
  console.log("socket", req.testing);
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
      new winston.transports.File({
        filename: "logs/error.log",
      }),
    ],
  })
);

// const _errorHandler = (err, req, res, next) => {
//   logger.error(`${req.method} ${req.originalUrl} ` + err.message);
//   const errorMsg = err.message;
//   res.status(err.status || 500).json({
//     code: -1,
//     success: false,
//     message: errorMsg,
//     data: {},
//   });
// };

// app.use(_errorHandler);

module.exports = app;
