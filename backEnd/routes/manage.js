// addr: ip:port/admin/manage
const express = require('express');
const router = express.Router();
const path = require('path');

// multer上传目录
const multer = require('multer');
const config = require('../serverConf');
const tempPath = path.join(__dirname, '/..' + config.tempPicFolder);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempPath.toString());
    },
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + '.' + file.originalname.split('.').reverse()[0]);
    }
})
const upload = multer({ storage: storage });

// userMaintain controller集
const userMaintain = require('../controller/userMaintain');
// 账号维护接口
router.post('/usermaintain', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - request for checked user list");
    let arr = await userMaintain.checkedUserlist(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// 修改密码接口
router.post('/modifyupwd', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - to modify pwd of user: ", data.uemail);
    let arr = await userMaintain.toModifyUPwd(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// 删除用户接口 
router.post('/deleteuser', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - to delete user: ", data.uemail);
    let arr = await userMaintain.toDeleteUser(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// signupCheck controller集
const signupCheck = require('../controller/signupCheck');
// 注册管理接口
router.post('/signupcheck', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - request for checking list");
    let arr = await signupCheck.checkingList(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// 通过注册接口
router.post('/passapply', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - pass the signup apply of user: ", data.uemail);
    let arr = await signupCheck.toPassApply(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// 拒绝注册接口
router.post('/refuseapply', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - refuse the signup apply of user: ", data.uemail);
    let arr = await signupCheck.toRefuseApply(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// statistics controller集
const statistics = require('../controller/statistics');
// 各题型数量统计controller
router.post('/quantitystatistic', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - get question statistics");
    let arr = await statistics.getQuantityStatistic(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// 近期操作统计controller
router.post('/operationstatistic', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - get operation statistics");
    let arr = await statistics.getOperationStatistic(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// 用户热力统计controller
router.post('/getuserheatstatistic', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - get heatmap statistics");
    let arr = await statistics.getUserHeatStatistic(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// syslog controller集
const syslog = require('../controller/syslog');
// admin 获取系统日志
router.post('/syslog', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - get syslog");
    let arr = await syslog.getSyslog(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// admingsetting controller集
const addmingsetting = require('../controller/adminsetting');
// admin 修改当前管理员密码
router.post('/modifyapwd', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - to modify pwd of admin: ", data.modifyform.admin);
    let arr = await addmingsetting.toModifyAPwd(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// admin 拉取系统背景图片详情
router.post('/bgklistdetail', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - get all background pic");
    let arr = await addmingsetting.allBkgDetail(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// admin 上传背景图片
router.post('/ulsysbkgpic', upload.any(), async (req, res, next) => {
    // upload 会将图片暂存至 tempPicFolder, 然后将路径存入数据库时, 再将对应图片移动至loginbkg
    let data = { atoken: req.body.atoken, file: {} };
    let file = req.files[0]
    data.file = { name: file.filename, type: file.mimetype, path: path.join("/images/loginbkg/", file.filename), tempPath: file.path };
    console.log("=== ~ receive POST : @ admin - add certain background pic");
    let arr = await addmingsetting.addCertainBkgPic(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
// admin 删除指定背景图片
router.post('/delcertainpic', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ admin - del certain background pic");
    let arr = await addmingsetting.delCertainBkgPic(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
module.exports = router;