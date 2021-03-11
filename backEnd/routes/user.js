const express = require('express');
const router = express.Router();

// 登录接口
const login = require("../controller/login");
router.post('/login', (req, res, next) => {
  let data = req.body;
  console.log('user: ' + data[0].uemail);
  data[1] = {"token": ""};
  let arr = login(data);
  res.json(arr);
  // if(arr[0].ifPass == true) {
  //   res.json(arr);
  // } else {
  //   res.json(arr);
  // }
})

// 注册接口

// 管理员登录接口

module.exports = router;
