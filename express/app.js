const express = require('express')
const app = express()

app.get('/test', (req, res) => {
  console.log(req.query);
  res.send('Hello World!')
})

module.exports = app;