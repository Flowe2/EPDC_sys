// 系统设置controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const DButil = require('../utils/theMongoDB');
const { ObjectID } = require('mongodb');
// pirsrc controller集
const picsrc = require('../controller/picsrc');
// 系统日志controller
const syslog = require('../controller/syslog');

// 获取系统背景图片详情
exports.allBkgDetail = async function (data) {
    let res = { 'pics': [], 'counter': 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    try {
        res = await picsrc.getBkglistDetail();
        return res;
    }
    catch (e) {
        res = { err: e.message };
        return res;
    }
}

// 7191b00c7499d632ef7c8ffc45071cf67673655bfe68763c650f391300cc82b2
// 新增系统背景图片
exports.addCertainBkgPic = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
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
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    try {
        res = await picsrc.delOneBkgPic('loginbkg', data.deltarget);
        if (res.ifSuccess == true) {
            // 成功时插入系统日志
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'delete system background [pic: ' + res.name + ']'
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

// 修改当前管理员密码
exports.toModifyAPwd = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = 'adminlist';
    const query = { _id: data.modifyform.admin, apwd: data.modifyform.oldpwd };
    const updateDoc = { $set: { 'apwd': data.modifyform.newpwd } };
    const options = { upsert: true };
    try {
        let temp = await DButil.updateOneData(targetCol, query, updateDoc, options);
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

// 获取接口列表
exports.getAPIs = async function (data) {
    let res = { 'apis': [], 'counter': 0 };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = 'apis';
    const query = {};
    const options = {};
    try {
        res.apis = await DButil.findData(targetCol, query, options);
        res.counter = res.apis.length;
        return res;
    }
    catch (e) {
        res = { err: e.message };
        return res;
    }
}
// 新增接口
exports.addAPIs = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = "apis"
    const insertDoc = {
        name: data.newapi.name,
        status: data.newapi.enable,
        expire: data.newapi.expire,
        token: jwtutil.generateToken({
            'account': data.newapi.name,
            'role': false,
            'expire': Math.ceil((new Date(data.newapi.expire).getTime() - Date.now()) / 1000) // 处理过期时间, 转化为时间差(number类型, 单位秒)
        }),
    }
    try {
        let insertRes = await DButil.insertOneData(targetCol, insertDoc);
        if (insertRes == 1) {
            console.log("=== ~ res: insert api seccess");
            // 成功时插入系统日志
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'add new api [id: ' + data.newapi.name + ']'
            }
            await syslog.addSyslog(logData)
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            console.log("=== ! err");
            res.err = '插入数据库时遇到一些意外';
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}
// 停用与恢复接口
exports.changeAPIs = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = 'apis';
    const query = { _id: ObjectID(data.target) };
    const updateDoc = { $set: { 'status': data.enable } };
    const options = { upsert: true };
    try {
        let temp = await DButil.updateOneData(targetCol, query, updateDoc, options);
        if (temp === 1) {
            console.log("=== ~ res: change api status seccess");
            // 成功时插入系统日志
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'change api [api: ' + data.name + ']'
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
// 删除接口
exports.delAPIs = async function (data) {
    let res = { 'ifSuccess': false, 'err': null };
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if (verifyRes.pass == true) {
        console.log("=== ~ token verify pass");
    } else {
        console.log("=== ! token verify failed, err: ", verifyRes.err);
        res = { err: verifyRes.err };
        return res;
    }
    // 预处理查询参数
    const targetCol = 'apis';
    const query = { _id: ObjectID(data.target) };
    try {
        let queryRes = await DButil.deleteWithReturn(targetCol, query);
        if (queryRes) {
            const logData = {
                'role': verifyRes.payload.role,
                'who': verifyRes.payload.account,
                'operation': 'delete api [api: ' + queryRes.name + ']'
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