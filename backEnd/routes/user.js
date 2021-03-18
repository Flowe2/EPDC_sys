const express = require('express');
const router = express.Router();

// 登录接口
const login = require("../controller/login");
router.post('/login', async (req, res, next) => {
  let data = req.body;
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ login");
  let arr = await login(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

// 注册接口

// 管理员登录接口

module.exports = router;
