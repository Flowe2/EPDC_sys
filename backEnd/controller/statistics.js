// 统计数据controller

// 调用封装JWT工具
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
            throw (e);
        }
    }
    return res;
}

// 近期操作统计
exports.getOperationStatistic = async function (data) {
    let res = { data: [] };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    let in30d = new Date();
    in30d.setDate(in30d.getDate() - 30);
    in30d = in30d.getFullYear() + "-" + (in30d.getMonth() + 1) + "-" + in30d.getDate();
    const targetCol = "syslog";
    const query1 = { role: "user", operation: { $regex: "upload new question" }, timestamp: { $gte: in30d } };
    const query2 = { role: "user", operation: { $regex: "delete some questions" }, timestamp: { $gte: in30d } };
    try {
        let queryRes1 = await thDB.countData(targetCol, query1);
        let queryRes2 = await thDB.countData(targetCol, query2)
        res.data.push(queryRes1);
        res.data.push(queryRes2);
        return res;
    } catch (e) {
        throw (e);
    }
}