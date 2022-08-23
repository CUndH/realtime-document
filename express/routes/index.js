const express = require("express");
const router = express.Router();
const tableRouter = require("./table");
// const wsRouter = require("./ws");

router.use("/table", tableRouter);

module.exports = router;
