const express = require('express');
const router = express.Router();

// 登录接口
const login = require("../controller/login");
router.post('/login', (req, res, next) => {
  const data = req.body;
  console.log('user: ' + data.umail);
  let arr = [data, ''];
  arr = login(arr);
  if(arr[0] == true) {
    res.json({'pass': 'OK', 'token': arr[1]});
  } else {
    res.json({'pass': 'Failed'});
  }
})

// 注册接口

// 管理员登录接口

module.exports = router;
