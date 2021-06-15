// addr: ip:port/user
const express = require('express');
const router = express.Router();

// pirsrc controller集
const picsrc = require('../controller/picsrc');
// 系统背景接口
router.get('/bkglist', async (req, res, next) => {
  console.log("=== ~ receive GET : get system backgrounds");
  let arr = await picsrc.getBkglist();
  console.log("=== ~ ready to send");
  res.type("json");
  res.json(arr);
})

// login controller集
const login = require('../controller/login');
// 登录接口
router.post('/login', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ login");
  let arr = await login(data);
  console.log("=== ~ ready to send");
  res.type("json");
  res.json(arr);
})

// signup controller集
const signup = require('../controller/signup');
// 注册实时用户查重接口
router.post('/realtimecheck', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : realtimecheck " + data.uemail +" @ signup");
  let arr = await signup.realtimeCheck(data);
  console.log("=== ~ ready to send");
  res.type("json");
  res.json(arr);
})
// 注册接口
router.post('/signup', async (req, res, next) => {
  let data = req.body;
  // console.log(data);
  console.log("=== ~ receive POST : @ user " + data.uemail + " @ signup");
  let arr = await signup.signup(data);
  console.log("=== ~ ready to send");
  res.type("json");
  res.json(arr);
})

// 用户界面子路由接口
const qubank = require('../routes/qubank');
router.use('/qubank', qubank);

module.exports = router;