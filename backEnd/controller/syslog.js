// 系统日志controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 获取日志
exports.getSyslog = async function (data) {
    let res = { syslog: [], counter: 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'syslog';
    const query = { };
    const options = { projection: { 'timestamp': 1, 'role': 1, 'who': 1, 'operation': 1 } };
    try {
        res.syslog = await thDB.findData(targetCol, query, options);
        res.counter = res.syslog.length;
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 插入日志处理
exports.addSyslog = async function (data) {
    // 预处理查询参数
    const targetCol = 'syslog';
    const insertDoc = {
        'timestamp': jwtutil.timeStamp(),
        'role': (data.role ? 'admin' : 'user'),
        'who': data.who,
        'operation': data.operation,
    };
    try {
        let insertRes = await thDB.insertOneData(targetCol, insertDoc);
        if (insertRes == 1) {
            console.log("=== ~ res: syslog insert seccess");
        } else {
            console.log("=== ! err: syslog insert failed");
        }
    } catch (e) {
        throw e;
    }
}