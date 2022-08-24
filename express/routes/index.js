const express = require("express");
const router = express.Router();
const tableRouter = require("./table");
const userRouter = require("./user");
// const wsRouter = require("./ws");

router.use("/table", tableRouter);
router.use("/user", userRouter);

module.exports = router;
