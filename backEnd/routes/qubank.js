// addr: ip:port/user/qubank
const express = require('express');
const router = express.Router();

// 题库管理 controller集
const questionsManage = require('../controller/questionsManage');

// 懒加载题目src
// router.post('/lazypullsrc', async (req, res, next) => {
//     let data = req.body;
//     console.log("=== ~ receive POST : @ user - lazy pull qustion src");
//     let arr = await questionsManage.getQuestionsSrc(data);
//     console.log("=== ~ ready to send");
//     res.json(arr);
// })


// 拉取建议科目接口
router.post('/suggestedsubjects', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get subjects list");
    let arr = await questionsManage.asyncQuerySubjects(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})


// 拉取建议关键词接口
router.post('/suggestedkeywords', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get subjects list");
    let arr = await questionsManage.asyncQueryKeywords(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})


// 拉取题目列表接口
router.post('/getquestionlist', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get " + data.type + " list");
    let arr = await questionsManage.getQuestionsList(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})

// 上传新题目接口
router.post('/uploadquestion', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - upload new quesion");
    let arr = await questionsManage.uploadNewQuestion(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})

// 上传新题目src接口
router.post('/uploadsrc', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - upload quesion src");
    console.log(data);
    // let arr = await questionsManage.uploadQuestionSrc(data);
    console.log("=== ~ ready to send");
    res.json({msg: 'add new question src'});
})

module.exports = router;