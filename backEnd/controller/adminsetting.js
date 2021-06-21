// 系统设置controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');
// pirsrc controller集
const picsrc = require('../controller/picsrc');
// 系统日志controller
const syslog = require('../controller/syslog');

// 修改当前管理员密码
exports.toModifyAPwd = async function (data) {
    let res = { 'ifSuccess': false, 'err': '' };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    // 预处理查询参数
    const targetCol = 'adminlist';
    const query = { _id: data.modifyform.admin, apwd: data.modifyform.oldpwd };
    const updateDoc = { $set: { 'apwd': data.modifyform.newpwd } };
    const options = { upsert: true };
    try {
        let temp = await thDB.updateOneData(targetCol, query, updateDoc, options);
        if (temp === 1) {
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'modify password [admin: ' + data.modifyform.admin + ']'
            };
            await syslog.addSyslog(logData);
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = 'error old password';
        }
        return res;
    } catch (e) {
        console.log("=== ! modify password err: " + e.message);
        res.err = 'error old password';
        return res;
    }
}

// 获取系统背景图片详情
exports.allBkgDetail = async function (data) {
    let res = { 'pics': [], 'counter': '' };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    try {
        res = await picsrc.getBkglistDetail();
        return res;
    }
    catch (e) {
        throw (e)
    }
}

// 新增系统背景图片
exports.addCertainBkgPic = async function (data) {
    let res = { 'ifSuccess': false, 'err': '' };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    try {
        res = await picsrc.addOneBkgPic(data.file);
        if (res.ifSuccess == true) {
            // 成功时插入系统日志
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'add system background [pic: ' + data.file.name + ']'
            };
            await syslog.addSyslog(logData);
        }
        return res;
    }
    catch (e) {
        res.err = e.message;
        return res;
    }
}

// 删除指定系统背景图片
exports.delCertainBkgPic = async function (data) {
    let res = { 'ifSuccess': false, 'err': '' };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
    }
    try {
        res = await picsrc.delOneBkgPic('loginbkg', data.deltarget);
        if (res.ifSuccess == true) {
            // 成功时插入系统日志
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'delete system background [pic: ' + data.deltarget + ']'
            };
            await syslog.addSyslog(logData);
        }
        return res;
    }
    catch (e) {
        res.err = e.message;
        return res;
    }
}