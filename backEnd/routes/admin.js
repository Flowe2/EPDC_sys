// addr: ip:port/admin
const express = require('express');
const router = express.Router();

// 管理员登录接口
const adminlogin = require('../controller/adminlogin');
router.post('/login', async (req, res, next) => {
  let data = req.body;
  console.log(data);
  console.log("=== ~ receive POST : @ admin " + data.account + " @ login");
  let arr = await adminlogin(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})

// 管理员界面子路由接口
const manage = require('../routes/manage');
router.use('/manage', manage);

module.exports = router;