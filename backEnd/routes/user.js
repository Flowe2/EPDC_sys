// addr: ip:port/user
const express = require('express');
const router = express.Router();

const login = require('../controller/login');
// 登录接口
router.post('/login', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ login");
  let arr = await login(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

const signup = require('../controller/signup');
// 注册实时用户查重
router.post('/realtimecheck', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : realtimecheck " + data.uemail +" @ signup");
  let arr = await signup.realtimeCheck(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

// 注册接口
router.post('/signup', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ signup");
  let arr = await signup.signup(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

// 用户界面子路由接口
const qubank = require('../routes/qubank');
router.use('/qubank', qubank);

module.exports = router;