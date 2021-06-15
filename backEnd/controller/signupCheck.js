// 管理员账号维护controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');
// 系统日志controller
const syslog = require('../controller/syslog');


// 注册管理 - 查询处理
exports.checkingList = async function (data) {
    let res = { 'userlist': [], 'counter': 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { 'pass': false };
    const options = { projection: { '_id': 1, 'uname': 1, 'postscript': 1, 'signup': 1 } };
    try {
        res.userlist = await thDB.findData(targetCol, query, options);
        res.userlist.forEach(element => {
            let temp = element._id;
            element._id = undefined;
            element.uemail = temp;
        });
        res.counter = res.userlist.length;
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 注册管理 - 通过注册
exports.toPassApply = async function (data) {
    let res = { 'userlist': [], 'counter': 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { _id: data.uemail };
    const updateDoc = { $set: { 'pass': true } };
    const options = { upsert: true };
    try {
        let temp = await thDB.updateOneData(targetCol, query, updateDoc, options);
        if (temp === 1) {
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'pass signup [user:' + data.uemail + ']'
            };
            await syslog.addSyslog(logData);
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = 'No match';
        }
        return res;
    } catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 注册管理 - 拒绝注册
exports.toRefuseApply = async function (data) {
    let res = { ifSuccess: false, err: '' };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { _id: data.uemail };
    try {
        let queryRes = await thDB.deleteWithReturn(targetCol, query);
        if (queryRes) {
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'refuse signup [user:' + queryRes.uemail + ']'
            };
            await syslog.addSyslog(logData);
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = 'No match';
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}