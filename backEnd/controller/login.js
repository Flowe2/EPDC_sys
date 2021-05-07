// 用户登录验证controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 用户登录处理
async function login(data) {
    let arr = { "ifPass": false, "token": '' };
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
            arr.token = undefined;
            arr.err = 'need to sign up';
            return arr;
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
            // 预处理给JWT的data
            data = { 'account': data.uemail, 'role': false };
            arr.ifPass = true;
            arr.token = jwtutil.generateToken(data);
            arr.timeStamp = Math.floor(Date.now() / 1000);
            // console.log(arr);
            return arr;
        }
        else {
            console.log("=== ! error password");
            arr.token = undefined;
            arr.err = 'error password';
            return arr;
        }
    } else {
        console.log("=== ! waiting for review");
        arr.token = undefined;
        arr.err = 'waiting for review';
        return arr;
    }
}

module.exports = login;