const RunSQL = require("../common/utils");
const dayjs = require('dayjs');

async function AddUserData(params) {
  const { username, password } = params;

  const sql = `INSERT INTO real_user
    (username, password, create_time)
    VALUES
    ('${username}', '${password}', '${dayjs().format('YYYY-MM-DD HH:mm:ss')}')`;

  const data = await RunSQL(sql);

  return data;
}

async function UpdateUserData(params) {
  const { username, password } = params;

  const sql = `UPDATE real_user SET username='${username}', password='${password}', update_time='${dayjs().format('YYYY-MM-DD HH:mm:ss')}'`;

  const data = await RunSQL(sql);

  return data;
}

async function getUserInfo(params) {
  const { id } = params;

  const sql = `SELECT id, username FROM real_user WHERE id=${id}`;

  const data = await RunSQL(sql);

  return data;
}

async function checkPwd(params) {
  const { username, password } = params;

  const sql = `SELECT id FROM real_user WHERE username='${username}' AND password='${password}'`;

  const result = await RunSQL(sql);

  let id = result[0] ? result[0].id : null;

  return id;
}


module.exports = {
  AddUserData,
  getUserInfo,
  UpdateUserData,
  checkPwd
}