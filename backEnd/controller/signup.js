// 用户注册controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 实时用户名查重处理
exports.realtimeCheck = async function (data) {
    let arr = { 'ifAvailable': false};
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { '_id': data.uemail };
    const options = { projection: { '_id': 1 } };
    try {
        targetUser = await thDB.findData(targetCol, query, options);
        if (targetUser.length == 0) {
            console.log('=== ~ res: uemail has not been signed yet');
            arr.ifAvailable = true;
        } else {
            console.log("=== ! user already exists");
        }
        return arr;
    } catch (e) {
        throw e;
    }
}

// 用户注册处理
exports.signup = async function (data) {
    let arr = { 'ifSuccess': false, 'err': '' };
    // 预处理查询参数
    const targetCol = 'userlist';
    const insertDoc = {
        '_id': data.uemail,
        'uname': data.uname,
        'upwd': data.upwd,
        'pass': false,
        'postscript': data.postscript,
        'signup': jwtutil.timeStamp(),
        'lastlog': ''
    };
    try {
        let insertRes = await thDB.insertOneData(targetCol, insertDoc);
        if (insertRes == 1) {
            console.log("=== ~ res: insert seccess");
            arr.ifSuccess = true;
            arr.err = undefined;
        } else {
            console.log("=== ! err");
            arr.err = '遇到一些意外';
        }
        return arr;
    } catch (e) {
        throw e;
    }
}