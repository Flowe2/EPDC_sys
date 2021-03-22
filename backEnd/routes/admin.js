const express = require('express');
const router = express.Router();

// 管理员登录接口
const adminlogin = require("../controller/adminlogin");
router.post('/login', async (req, res, next) => {
  let data = req.body;
  console.log(data);
  console.log("=== ~ receive POST : @ admin " + data.account + " @ login");
  let arr = await adminlogin(data);
  console.log("=== ~ ready to send");
  res.json(arr);
})







module.exports = router;