// 管理员登录验证controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const DButil = require('../utils/theMongoDB');
// 系统日志controller
const syslog = require('../controller/syslog');

// 管理员登录处理
async function adminlogin(data) {
    let res = { 'ifAPass': false, 'atoken': '' };
    let targetAdmin;
    // 预处理查询参数
    const targetCol = 'adminlist';
    const query = { '_id': data.account };
    const options = { projection: { '_id': 1, 'apwd': 1 } };
    // 查询用户
    try {
        targetAdmin = await DButil.findData(targetCol, query, options);
        if (targetAdmin.length != 0) {
            targetAdmin = targetAdmin[0];
            console.log("=== ~ res: admin exist");
        } else {
            console.log("=== ! no such a administrator");
            res.atoken = undefined;
            res.err = 'no such a administrator';
            return res;
        }
    } catch (e) {
        res = { err: e.message };
        return res;
    }
    if (targetAdmin.apwd == data.apwd) {
        // 验证通过, 更新lastlog, 生成token
        const updateDoc = { $set: { 'lastlog': jwtutil.timeStamp() } };
        const updateOptions = { upsert: true };
        await DButil.updateOneData(targetCol, query, updateDoc, updateOptions)
            .catch(console.dir)
            .then((res) => {
                if (res == 1) {
                    console.log("=== ~ res: updated lastlog")
                } else {
                    console.log("=== ! update lastlog err");
                };
            });
        const logData = {
            'role': true,
            'who': data.account,
            'operation': 'admin login'
        }
        await syslog.addSyslog(logData)
        // 预处理给JWT的data
        data = { 'account': data.account, 'role': true, 'expire': '1h' };
        res.ifAPass = true;
        res.atoken = jwtutil.generateToken(data);
        res.timeStamp = Math.floor(Date.now() / 1000);
        // console.log(res);
        return res;
    }
    else {
        console.log("=== ! error password");
        res.atoken = undefined;
        res.err = 'error password';
        return res;
    }
}

module.exports = adminlogin;