const express = require("express");
const router = express.Router();
const Result = require('../common/result');

const { AddUserData, getUserInfo } = require("../controllers/user");

router.get("/info", async (req, res) => {
  const { page, pageSize } = req.query;

  const params = {
    start: (page - 1) * pageSize,
    end: pageSize,
  };

  const result = await getUserInfo(params);

  res.send(Result.Ok(result));
});

router.post("/add", async (req, res) => {
  console.log(req.body);

  const result = await AddUserData(req.body);

  res.send(Result.Ok(result));
});

module.exports = router;
