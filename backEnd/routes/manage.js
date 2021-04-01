// addr: ip:port/admin/manage
const express = require('express');
const router = express.Router();

// userMaintain controller集
const userMaintain = require('../controller/userMaintain');
// 账号维护接口
router.post('/usermaintain', async (req, res, next) => {
    let data = req.body;
    console.log(data);
    console.log("=== ~ receive POST : @ admin - request for checked user list");
    let arr = await userMaintain.checkedUserlist(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})

// signupCheck controller集
const signupCheck = require('../controller/signupCheck');
// 注册管理接口
router.post('/signupcheck', async (req, res, next) => {
    let data = req.body;
    console.log(data);
    console.log("=== ~ receive POST : @ admin - request for checking list");
    let arr = await signupCheck.checkingList(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})

module.exports = router;