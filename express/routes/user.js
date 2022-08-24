const express = require("express");
const router = express.Router();
const Result = require('../common/result');
const CryptoJS = require('crypto-js');

const {
  AddUserData,
  getUserInfo,
  UpdateUserData,
  checkPwd
} = require("../controllers/user");

router.get("/info", async (req, res) => {
  let { id } = req.query;

  if (!id) {
    let text = req.cookies.token;
    let bytes = CryptoJS.AES.decrypt(text, 'realtime666');
    console.log(bytes);
    let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(data);
    id = data.id;
  }

  const params = {
    id,
  };

  const [result] = await getUserInfo(params);

  if (!result) {
    res.send(Result.Error(null, '用户不存在！'));
    return;
  }

  res.send(Result.Ok(result));
});

router.post("/add", async (req, res) => {
  const result = await AddUserData(req.body);

  res.send(Result.Ok(result));
});

router.post("/update", async (req, res) => {
  const result = await UpdateUserData(req.body);

  res.send(Result.Ok(result));
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const id = await checkPwd({username, password});

  if (id) {
    const [result] = await getUserInfo({id});
    // 设置 token
    let text = CryptoJS.AES.encrypt(JSON.stringify({id: id}), 'realtime666').toString();
    res.cookie('token', text, {
      maxAge: 24 * 60 * 60 * 1000
    });
    res.send(Result.Ok(result));
    return;
  }

  res.send(Result.Error(null, '请检查用户名或密码'));
});


module.exports = router;
