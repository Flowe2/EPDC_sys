// 用户登录验证controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');
// 系统日志controller
const syslog = require('../controller/syslog');

// 用户登录处理
async function login(data) {
    let res = { "ifPass": false, "token": '' };
    let targetUser;
    // 预处理查询参数
    const targetCol = 'userlist';
    const query = { '_id': data.uemail };
    const options = { projection: { '_id': 1, 'upwd': 1, 'pass': 1 } };
    // 查询用户
    try {
        targetUser = await thDB.findData(targetCol, query, options);
        if (targetUser.length != 0) {
            targetUser = targetUser[0];
            console.log("=== ~ res: user exist");
        } else {
            console.log("=== ! need to sign up");
            res.token = undefined;
            res.err = 'need to sign up';
            return res;
        }
    } catch (e) {
        throw e;
    }
    if (targetUser.pass == true) {
        if (targetUser.upwd == data.upwd) {
            // 验证通过, 更新lastlog, 生成token
            const updateDoc = { $set: { 'lastlog': jwtutil.timeStamp() } };
            const updateOptions = { upsert: true };
            await thDB.updateOneData(targetCol, query, updateDoc, updateOptions)
                .catch(console.dir)
                .then((res) => {
                    if (res == 1) {
                        console.log("=== ~ res: updated lastlog")
                    } else {
                        console.log("=== ! update lastlog err");
                    };
                });
            const logData = {
                'role': false,
                'who': data.uemail,
                'operation': 'user login'
            }
            await syslog.addSyslog(logData)
            // 预处理给JWT的data
            data = { 'account': data.uemail, 'role': false };
            res.ifPass = true;
            res.token = jwtutil.generateToken(data);
            res.timeStamp = Math.floor(Date.now() / 1000);
            // console.log(res);
            return res;
        }
        else {
            console.log("=== ! error password");
            res.token = undefined;
            res.err = 'error password';
            return res;
        }
    } else {
        console.log("=== ! waiting for review");
        res.token = undefined;
        res.err = 'waiting for review';
        return res;
    }
}

module.exports = login;