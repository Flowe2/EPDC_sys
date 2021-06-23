// addr: ip:port/user/qubank
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

// 题库管理 controller集
const questionsManage = require('../controller/questionsManage');

// 拉取建议科目接口
router.post('/suggestedsubjects', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get suggested subjects list");
    let arr = await questionsManage.asyncQuerySubjects(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// 拉取建议关键词接口
router.post('/suggestedkeywords', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get suggested keywords list");
    let arr = await questionsManage.asyncQueryKeywords(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// 拉取题目列表接口
router.post('/getquestionlist', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get " + data.type + " list");
    let arr = await questionsManage.getQuestionsList(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// 上传新题目接口
router.post('/uploadquestion', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - upload new quesion");
    let arr = await questionsManage.uploadNewQuestion(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// 上传新题目src接口
router.post('/ulqusrcpic',  upload.any(), async (req, res, next) => {
    // upload 会将图片暂存至 tempPicFolder, 然后将路径存入数据库时, 再将对应图片移动至loginbkg
    let data = { token: req.body.token, file: req.files[0] };
    console.log("=== ~ receive POST : @ user - upload quesion src");
    let arr = await questionsManage.addCertainQusrcPic(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})

// 删除题目接口
router.post('/deletequestion', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - delete questions");
    let arr = await questionsManage.deleteQuestion(data);
    console.log("=== ~ ready to send");
    res.type("json");
    res.json(arr);
})
module.exports = router;