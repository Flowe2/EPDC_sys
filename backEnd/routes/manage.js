// addr: ip:port/admin/manage
const express = require('express');
const router = express.Router();

// userMaintain controller集
const userMaintain = require('../controller/userMaintain');
// 账号维护接口
router.post('/usermaintain', async (req, res, next) => {
    let data = req.body;
    // 打印atoken
    // console.log(data);
    console.log("=== ~ receive POST : @ admin - request for checked user list");
    let arr = await userMaintain.checkedUserlist(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})
// 修改密码接口
router.post('/modifyupwd', async (req, res, next) => {
    let data = req.body;
    // 打印atoken
    // console.log(data);
    console.log("=== ~ receive POST : @ admin - to modify pwd of user: ", data.uemail);
    let arr = await userMaintain.toModifyUPwd(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})
// 删除用户接口 
router.post('/deleteuser', async (req, res, next) => {
    let data = req.body;
    // 打印atoken
    // console.log(data);
    console.log("=== ~ receive POST : @ admin - to delete user: ", data.uemail);
    let arr = await userMaintain.toDeleteUser(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})

// signupCheck controller集
const signupCheck = require('../controller/signupCheck');
// 注册管理接口
router.post('/signupcheck', async (req, res, next) => {
    let data = req.body;
    // 打印atoken
    // console.log(data);
    console.log("=== ~ receive POST : @ admin - request for checking list");
    let arr = await signupCheck.checkingList(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})
// 通过注册接口
router.post('/passapply', async (req, res, next) => {
    let data = req.body;
    // 打印atoken
    // console.log(data);
    console.log("=== ~ receive POST : @ admin - pass the signup apply of user: ", data.uemail);
    let arr = await signupCheck.toPassApply(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})
// 拒绝注册接口
router.post('/refuseapply', async (req, res, next) => {
    let data = req.body;
    // 打印atoken
    // console.log(data);
    console.log("=== ~ receive POST : @ admin - refuse the signup apply of user: ", data.uemail);
    let arr = await signupCheck.toRefuseApply(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})

module.exports = router;