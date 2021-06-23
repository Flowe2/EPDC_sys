// 题库管理controller

// 调用封装JWT工具
const { ObjectId } = require('bson');
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const DButil = require('../utils/theMongoDB');
const syslog = require('../controller/syslog');
// pirsrc controller集
const picsrc = require('../controller/picsrc');

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
    }
}

// 更新suggestedSubject
const updateSuggetList = async function (subject, keywords) {
    // 更新用参数
    const targetCol = 'suggestedsubject';
    const query = { 'subject': subject };
    const subjectQueryOptions = { projection: { '_id': 0, 'keywords': 1 } };
    // 查询科目是否存在
    let updateQuery = await DButil.findData(targetCol, query, subjectQueryOptions);
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
            let temp = await DButil.updateOneData(targetCol, query, updateDoc);
            if (temp === 1) {
                console.log("=== ~ suggestedList update success.");
            } else {
                console.log("=== ! suggestedList update failed.");
            }
        } catch (e) {
            console.log("=== ! suggestedList update failed. err: " + e.message);
        }
    } else {
        // 科目不存在则插入新的科目及关键词
        console.log("=== ~ no corresponding subject.");
        const insertDoc = { 'subject': subject, 'keywords': keywords };
        try {
            let insertRes = await DButil.insertOneData(targetCol, insertDoc);
            if (insertRes == 1) {
                console.log("=== ~ suggestedList update success.");
            } else {
                console.log("=== ~ suggestedList update failed.");
            }
        } catch (e) {
            res = { err: e.message };
            return res;
        }
    }
}

// 远程拉取科目(输入建议)
exports.asyncQuerySubjects = async function (data) {
    let res;
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = 'suggestedsubject';
    const query = {};
    const options = { projection: { '_id': 0, 'subject': 1 } };
    try {
        res = await DButil.findData(targetCol, query, options);
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 远程拉取参考关键词(输入建议)
exports.asyncQueryKeywords = async function (data) {
    let res = { 'keywords': [] };
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = 'suggestedsubject';
    const query = { 'subject': data.subject };
    const options = { projection: { '_id': 0, 'keywords': 1 } };
    try {
        let queryRes = await DButil.findData(targetCol, query, options);
        if (queryRes.length > 0) {
            res.keywords = queryRes[0].keywords;
        }
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 查询题目列表
exports.getQuestionsList = async function (data) {
    let res = { 'questionlist': [], 'counter': 0 };
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    let targetCol = questionTypeJudge(data.type);
    const query = { 'type': data.type };
    try {
        let qureyRes = await DButil.findData(targetCol, query);
        res.questionlist = qureyRes;
        res.counter = qureyRes.length;
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 上传题目资源
exports.addCertainQusrcPic = async function (data) {
    let res = { 'ifSuccess': false, "base64pic": null, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    try {
        res = await picsrc.addQusrcToBase64(data.file);
        if (res.base64pic) {
            console.log("=== ~ res: pic convert to base64 seccess");
        } else {
            console.log("=== ! err");
            res.err = '图片转换时遇到一些意外';
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}

// 上传题目
exports.uploadNewQuestion = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = questionTypeJudge(data.newqu.type);
    const insertDoc = data.newqu;
    try {
        let insertRes = await DButil.insertOneData(targetCol, insertDoc);
        if (insertRes == 1) {
            console.log("=== ~ res: insert seccess");
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'upload new question [id: ' + data.newqu._id + ']'
            }
            await syslog.addSyslog(logData)
            await updateSuggetList(data.newqu.subject, data.newqu.keywords);
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            console.log("=== ! err");
            res.err = '插入题库时遇到一些意外';
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}

// 删除题目
exports.deleteQuestion = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.token);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    let targetCol = ["singlechoice", "multiplechoice", "truefalse", "gapfilling", "subjective"];
    let targetList = [[], [], [], [], []];
    // 待删除题目分类
    data.deletelist.forEach(element => {
        switch (element.type) {
            case "sc":
                targetList[0].push(ObjectId(element._id));
                break;
            case "mc":
                targetList[1].push(ObjectId(element._id));
                break;
            case "tf":
                targetList[2].push(ObjectId(element._id));
                break;
            case "gf":
                targetList[3].push(ObjectId(element._id));
                break;
            case "sj":
                targetList[4].push(ObjectId(element._id));
                break;
        }
    })
    try {
        // 删除失败题目数
        let failDelSum = 0;
        let logSum = 0;
        for (let i = 0; i < 5; i++) {
            let delCounter = targetList[i].length;
            if (delCounter > 0) {
                let query = { _id: { $in: targetList[i] } };
                let queryRes = await DButil.deleteManyData(targetCol[i], query);
                if (queryRes == delCounter) {
                    console.log("=== ~ deleted some questions.");
                } else {
                    failDelSum += (delCounter - queryRes);
                }
                logSum += queryRes;
            }
        }
        if (failDelSum == 0) {
            console.log("=== ~ res: delete seccess");
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'delete some questions [sum: ' + logSum + ']'
            }
            await syslog.addSyslog(logData)
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            console.log("=== ! err");
            res.err = "遇到一些意外, 共有 " + failDelSum + " 题删除失败";
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}