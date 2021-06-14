// 统计数据controller

// 调用封装JWT工具
const { query } = require('express');
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 各题型数量统计
exports.getQuantityStatistic = async function (data) {
    let res = [{ value: 0, name: '单选题' },
    { value: 0, name: '多选题' },
    { value: 0, name: '填空题' },
    { value: 0, name: '判断题' },
    { value: 0, name: '主观题' }];
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = ["singlechoice", "multiplechoice", "truefalse", "gapfilling", "subjective"];
    const query = {};
    for (let i = 0; i < 5; i++) {
        try {
            let queryRes = await thDB.countData(targetCol[i], query);
            res[i].value = queryRes
        } catch (e) {
            res = { err: e.message };
        }
    }
    return res;
}

// // 近期操作统计
// exports.getOperationStatistic = async function (data) {
//     let res = { data: [] };
//     let verifyRes = jwtutil.verifyToken(data.atoken);
//     if (verifyRes.pass == true) {
//         console.log("=== ~ token verify pass");
//     } else {
//         console.log("=== ! token verify failed, err: ", verifyRes.err);
//     }
//     // 预处理查询参数
//     let in30d = new Date();
//     in30d.setDate(in30d.getDate() - 30);
//     in30d = in30d.getFullYear() + "-" + (in30d.getMonth() + 1) + "-" + in30d.getDate();
//     const targetCol = "syslog";
//     const query1 = { role: "user", operation: { $regex: "upload new question" }, timestamp: { $gte: in30d } };
//     const query2 = { role: "user", operation: { $regex: "delete some questions" }, timestamp: { $gte: in30d } };
//     try {
//         let queryRes1 = await thDB.countData(targetCol, query1);
//         let queryRes2 = await thDB.countData(targetCol, query2)
//         res.data.push(queryRes1);
//         res.data.push(queryRes2);
//         return res;
//     } catch (e) {
//         throw (e);
//     }
// }

// 用户热力统计
exports.getUserHeatStatistic = async function (data) {
    let res = { startEnd: [], data: [] };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    let startTime = new Date();
    startTime.setMonth(startTime.getMonth() - 6);
    startTime = startTime.getFullYear() + "-" + (startTime.getMonth() + 1) + "-" + startTime.getDate();
    let endTime = new Date();
    endTime = endTime.getFullYear() + "-" + (endTime.getMonth() + 1) + "-" + endTime.getDate();
    // 显示时间
    res.startEnd = [startTime, endTime];
    // 查询用时间条件
    let endTime2 = new Date();
    endTime2.setDate(endTime2.getDate() + 1);
    endTime2 = endTime2.getFullYear() + "-" + (endTime2.getMonth() + 1) + "-" + endTime2.getDate();
    // 查询条件
    const targetCol = "syslog";
    const match = {
        "role": "user",
        "timestamp": {
            $gte: startTime,
            $lt: endTime2
        }
    };
    const group = {
        "_id": {
            $dateToString: {
                date: { $toDate: "$timestamp" },
                format: "%Y-%m-%d"
            }
        },
        count: {
            $sum: 1
        }
    }
    const sort = {
        count: -1
    }
    try {
        let queryRes = await thDB.aggregateFind(targetCol, match, group, sort);
        queryRes.forEach(col => {
            res.data.push([col._id, col.count])
        })
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}