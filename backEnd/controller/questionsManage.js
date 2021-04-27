// 题库管理controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 题型判断
const questionTypeJudge = function (type) {
    switch (type) {
        case "sc":
            return 'singlechoice';
        case "mc":
            return 'multiplechoice';
        case "tf":
            return 'truefalse';
        case "gf":
            return 'gapfilling';
        case "sj":
            return 'subjective';
        default:
            return undefined;
    }
}

// 查询题目列表
exports.getQuestionsList = async function (data) {
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    let targetCol = questionTypeJudge(data.type);
    const query = { 'type': data.type };
    let res = { questionlist: [], counter: 0 };
    try {
        qureyRes = await thDB.pullQuestions(targetCol, query);
        res.questionlist = qureyRes;
        res.counter = qureyRes.length;
        return res;
    } catch (e) {
        throw (e);
    }
}

// 上传题目
exports.uploadNewQuestion = async function (data) {
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = questionTypeJudge(data.newqu.type);
    const insertDoc = data.newqu;
    let arr = { 'ifSuccess': false, 'err': '' };
    try {
        let insertRes = await thDB.insertQuestion(targetCol, insertDoc);
        if (insertRes == 1) {
            console.log("=== ~ res: insert seccess");
            arr.ifSuccess = true;
            arr.err = undefined;
        } else {
            console.log("=== ! err");
            arr.err = '插入题库时遇到一些意外';
        }
        return arr;
    } catch (e) {
        throw e;
    }
}