// 管理员登录验证controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 用户登录接口
async function adminlogin(data) {
    // console.log("=== ~ " + data);
    let arr = { "ifPass": false, "token": '' };
    let token = '';
    let targetAdmin;
    // 查询用户
    try {
        targetAdmin = await thDB.findAdmin(data.account);
        if (targetAdmin.length != 0) {
            targetAdmin = targetAdmin[0];
            console.log('=== ~ res: admin exist');
        } else {
            console.log("=== ! no such a administrator");
            arr.token = undefined;
            arr.err = "no such a administrator";
            return arr;
        }
    } catch (e) {
        throw e;
    }
    if (targetAdmin.apwd == data.apwd) {
        // 验证通过, 生成token
        token = jwtutil.generateToken(data);
        arr.ifPass = true;
        arr.token = token;
        // console.log(arr);
        return arr;
    }
    else {
        console.log("=== ! error password");
        arr.token = undefined;
        arr.err = "error password";
        return arr;
    }
}

module.exports = login;