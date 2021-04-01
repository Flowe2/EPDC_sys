// 管理员账号维护controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 注册管理 - 查询处理
exports.checkingList = async function (data) {
    // console.log("=== ~ " + data);
    let userlist;
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if ( verifyRes.pass == true ) {
        console.log('=== ~ token verify pass');
    } else {
        console.log('=== ! token verify failed, err: ', verifyRes.err);
    }
    try {
        userlist = await thDB.findCheckingUser();
        return userlist;
    } catch (e) {
        throw (e);
    }
}