// 题库管理controller

// 调用封装JWT工具
const e = require('express');
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 查询题目列表
exports.getQuestionsList = async function (data, type) {
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    let res;
    let targetCol;
    switch (type) {
        case "sc":
            res = { singlechoicelist: [], counter: 0 };
            targetCol = 'singlechoice';
            break;
        case "mc":
            res = { multiplechoicelist: [], counter: 0 };
            targetCol = 'multiplechoice';
            break;
        case "tf":
            res = { truefalselist: [], counter: 0 };
            targetCol = 'truefalse';
            break;
        case "gf":
            res = { gapfillinglist: [], counter: 0 };
            targetCol = 'gapfilling';
            break;
        case "sj":
            res = { subjectivelist: [], counter: 0 };
            targetCol = 'subjective';
            break;
        default:
            res = { err: "type err."};
            return res;
    }
    const query = { 'type': type };
    try {
        questionlist = await thDB.pullQuestions(targetCol, query);
        for (let index in res){
            if (index != "counter") {
                res[index] = questionlist;
            }
            else {
                res[index] = questionlist.length;
            }
        }
        return res;
    } catch (e) {
        throw (e);
    }
}