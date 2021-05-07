// 管理员账号维护controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');
// 系统日志controller
const syslog = require('../controller/syslog');

// 账户维护 - 查询处理
exports.checkedUserlist = async function (data) {
    let res = { userlist: [], counter: 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { 'pass': true };
    const options = { projection: { '_id': 1, 'uname': 1, 'lastlog': 1 } };
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
        throw (e);
    }
}

// 账户维护 - 修改账户
exports.toModifyUPwd = async function (data) {
    let res = { userlist: [], counter: 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { _id: data.uemail };
    const updateDoc = { $set: { 'upwd': data.newupwd } };
    const options = { upsert: true };
    try {
        let temp = await thDB.updateOneData(targetCol, query, updateDoc, options);
        if (temp === 1) {
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'modify password [user:' + data.uemail + ']'
            };
            await syslog.addSyslog(logData);
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = 'No match';
        }
        return res;
    } catch (e) {
        throw (e);
    }
}

// 账户维护 - 删除账户
exports.toDeleteUser = async function (data) {
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
        let temp = await thDB.deleteOneData(targetCol, query);
        if (temp === 1) {
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'delete user [user:' + data.uemail + ']'
            };
            await syslog.addSyslog(logData);
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = 'No match';
        }
        return res;
    } catch (e) {
        throw (e);
    }
}