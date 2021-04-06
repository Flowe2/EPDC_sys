// 管理员账号维护controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 账户维护 - 查询处理
exports.checkedUserlist = async function (data) {
    let res = {userlist: [], counter: 0};
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if ( verifyRes.pass == true ) {
        console.log('=== ~ token verify pass');
    } else {
        console.log('=== ! token verify failed, err: ', verifyRes.err);
    }
    try {
        res.userlist = await thDB.findCheckedUser();
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
    let res = {userlist: [], counter: 0};
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if ( verifyRes.pass == true ) {
        console.log('=== ~ token verify pass');
    } else {
        console.log('=== ! token verify failed, err: ', verifyRes.err);
    }
    try {
        let temp = await thDB.modifyUPwd(data.uemail, data.newupwd);
        if (temp === 1) {
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = "No match";
        }
        return res;
    } catch (e) {
        throw (e);
    }
}

// 账户维护 - 删除账户
exports.toDeleteUser = async function (data) {
    let res = {ifSuccess: false, err: ''};
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if ( verifyRes.pass == true ) {
        console.log('=== ~ token verify pass');
    } else {
        console.log('=== ! token verify failed, err: ', verifyRes.err);
    }
    try {
        let temp = await thDB.deleteUser(data.uemail);
        if (temp === 1) {
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = "No match";
        }
        return res;
    } catch (e) {
        throw (e);
    }
}