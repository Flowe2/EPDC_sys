// addr: ip:port/user/qubank
const express = require('express');
const router = express.Router();

// 题库管理 controller集
const questionsManage = require('../controller/questionsManage');

// 单选题接口
router.post('/singlechoicelist', async (req, res, next) => {
    let data = req.body;
    console.log("=== ~ receive POST : @ user - get single-choice list");
    let arr = await questionsManage.getSingleChoiceList(data);
    console.log("=== ~ ready to send");
    res.json(arr);
})


module.exports = router;