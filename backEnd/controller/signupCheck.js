// 管理员账号维护controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 注册管理 - 查询处理
exports.checkingList = async function (data) {
    // console.log("=== ~ " + data);
    let res = {userlist: [], counter: 0};
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log('=== ~ token verify pass');
    } else {
        console.log('=== ! token verify failed, err: ', verifyRes.err);
    }
    try {
        res.userlist = await thDB.findCheckingUser();
        res.userlist.forEach(element => {
            let temp = element._id;
            element._id = undefined;
            element.uemail = temp;
        });
        res.counter = res.userlist.length;
        return res;
    } catch (e) {
        throw (e);
    }
}