const express = require('express');
const router = express.Router();

// 登录接口
const login = require("../controller/login");
router.post('/login', (req, res, next) => {
  let data = req.body;
  console.log('user: ' + data.uemail);
  let arr = [data, {"token": ""} ]
  arr = login(arr);
  res.json(arr);
})

// 注册接口

// 管理员登录接口

module.exports = router;
