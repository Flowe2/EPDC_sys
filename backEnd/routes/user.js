// addr: ip:port/user
const express = require('express');
const router = express.Router();

// 登录接口
const login = require('../controller/login');
router.post('/login', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ login");
  let arr = await login(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

// 注册接口
const signup = require('../controller/signup');
router.post('/signup', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ login");
  let arr = await signup(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

// 用户界面子路由接口
const qubank = require('../routes/qubank');
router.use('/qubank', qubank);

module.exports = router;