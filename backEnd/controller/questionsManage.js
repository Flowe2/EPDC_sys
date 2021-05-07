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

// 更新suggestedSubject
const updateSuggetList = async function (subject, keywords) {
    // 更新用参数
    const targetCol = 'suggestedsubject';
    const query = { 'subject': subject };
    const subjectQueryOptions = { projection: { '_id': 0, 'keywords': 1 } };
    // 查询科目是否存在
    let updateQuery = await thDB.findData(targetCol, query, subjectQueryOptions);
    if (updateQuery.length != 0) {
        // 存在则将新的关键词加入keywords并更新到数据库
        console.log("=== ~ subject exist. ");
        let existedKeywords = new Set(updateQuery[0].keywords);
        let tempKeywords = new Set();
        keywords.forEach(keyword => {
            existedKeywords.has(keyword) ? {} : tempKeywords.add(keyword)
        });
        tempKeywords = Array.from(tempKeywords);
        try {
            const updateDoc = { $push: { "keywords": { $each: tempKeywords } } };
            let temp = await thDB.updateOneData(targetCol, query, updateDoc);
            if (temp === 1) {
                console.log("=== ~ suggestedList update success.");
            } else {
                console.log("=== ~ suggestedList update failed.");
            }
        } catch (e) {
            throw (e);
        }
    } else {
        // 科目不存在则插入新的科目及关键词
        console.log("=== ~ no corresponding subject.");
        const insertDoc = { 'subject': subject, 'keywords': keywords };
        try {
            let insertRes = await thDB.insertOneData(targetCol, insertDoc);
            if (insertRes == 1) {
                console.log("=== ~ suggestedList update success.");
            } else {
                console.log("=== ~ suggestedList update failed.");
            }
        } catch (e) {
            throw e;
        }
    }
}

// 远程拉取科目(输入建议)
exports.asyncQuerySubjects = async function (data) {
    let res = { 'subjects': []};
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'suggestedsubject';
    const query = {};
    const options = { projection: { '_id': 0, 'subject': 1 } };
    try {
        res = await thDB.findData(targetCol, query, options);
        return res;
    } catch (e) {
        throw e;
    }
}

// 远程拉取参考关键词(输入建议)
exports.asyncQueryKeywords = async function (data) {
    let res = { 'keywords': []};
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'suggestedsubject';
    const query = { 'subject': data.subject };
    const options = { projection: { '_id': 0, 'keywords': 1 } };
    try {
        let queryRes = await thDB.findData(targetCol, query, options);
        res.keywords = queryRes[0].keywords;
        return res;
    } catch (e) {
        throw e;
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
        let qureyRes = await thDB.findData(targetCol, query);
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
        let insertRes = await thDB.insertOneData(targetCol, insertDoc);
        if (insertRes == 1) {
            console.log("=== ~ res: insert seccess");
            await updateSuggetList(data.newqu.subject, data.newqu.keywords);
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