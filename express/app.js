const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const logger = require("./common/logger");

const routerConfig = require("./routes");

app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use("/app", routerConfig);

const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} ` + err.message);
  const errorMsg = err.message;
  res.status(err.status || 500).json({
    code: -1,
    success: false,
    message: errorMsg,
    data: {},
  });
};

app.use(_errorHandler);

module.exports = app;
