// 管理员账号维护controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 账户维护 - 查询处理
exports.checkedUserlist = async function (data) {
    // console.log("=== ~ " + data);
    let userlist;
    let verifyRes = jwtutil.verifyToken(data.atoken);
    if ( verifyRes.pass == true ) {
        console.log('=== ~ token verify pass');
    } else {
        console.log('=== ! token verify failed, err: ', verifyRes.err);
    }
    try {
        userlist = await thDB.findCheckedUser();
        userlist.forEach(element => {
            let temp = element._id;
            element._id = undefined;
            element.uemail = temp;
        });
        return userlist;
    } catch (e) {
        throw (e);
    }
}

// 账户维护 - 修改账户

// 账户维护 - 删除账户