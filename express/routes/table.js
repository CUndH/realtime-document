const express = require("express");
const router = express.Router();
const Result = require('../common/result');

const { SelectTableData, UpdateTableData } = require("../controllers/table");

router.get("/list", async (req, res) => {
  const { page, pageSize } = req.query;

  const params = {
    start: (page - 1) * pageSize,
    end: pageSize,
  };

  const result = await SelectTableData(params);

  res.send(Result.Ok(result));
});

router.post("/update", async (req, res) => {
  console.log(req.body);

  const result = await UpdateTableData(req.body);

  res.send(Result.Ok(result));
});

module.exports = router;
