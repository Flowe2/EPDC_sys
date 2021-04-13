// 管理员登录验证controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 管理员登录处理
async function adminlogin(data) {
    let arr = { 'ifAPass': false, 'atoken': '' };
    let targetAdmin;
    // 预处理查询参数
    const targetCol = 'adminlist';
    const query = { '_id': data.account };
    const options = { projection: { '_id': 1, 'apwd': 1 } };
    // 查询用户
    try {
        targetAdmin = await thDB.findUser(targetCol, query, options);
        if (targetAdmin.length != 0) {
            targetAdmin = targetAdmin[0];
            console.log("=== ~ res: admin exist");
        } else {
            console.log("=== ! no such a administrator");
            arr.atoken = undefined;
            arr.err = 'no such a administrator';
            return arr;
        }
    } catch (e) {
        throw e;
    }
    if (targetAdmin.apwd == data.apwd) {
        // 验证通过, 更新lastlog, 生成token
        const updateDoc = { $set: { 'lastlog': jwtutil.timeStamp() } };
        const updateOptions = { upsert: true };
        await thDB.updateUser(targetCol, query, updateDoc, updateOptions)
            .catch(console.dir)
            .then((res) => {
                if (res == 1) {
                    console.log("=== ~ res: updated lastlog")
                } else {
                    console.log("=== ! update lastlog err");
                };
            });
        // 预处理给JWT的data
        data = { 'account': data.account, 'role': true };
        arr.ifAPass = true;
        arr.atoken = jwtutil.generateToken(data);
        arr.timeStamp = Math.floor(Date.now() / 1000);
        // console.log(arr);
        return arr;
    }
    else {
        console.log("=== ! error password");
        arr.atoken = undefined;
        arr.err = 'error password';
        return arr;
    }
}

module.exports = adminlogin;