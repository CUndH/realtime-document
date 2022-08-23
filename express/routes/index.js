const express = require("express");
const router = express.Router();
const tableRouter = require("./table");

router.use("/table", tableRouter);

module.exports = router;
