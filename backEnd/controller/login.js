// 用户登录验证controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 
const users = require('../utils/theMongoDB');

// 测试数据
// const usersList = [
//     { "uemail": "abc@123.com", "upwd": "123123" },
//     { "uemail": "aaa@111.com", "upwd": "111111" },
//     { "uemail": "bbb@222.com", "upwd": "222222" },
//     { "uemail": "ccc@333.com", "upwd": "333333" }
// ];

// 用户登录接口
async function login(data) {
    // console.log("=== ~ " + data);
    let arr = { "ifPass": false, "token": '' };
    let token = '';
    let targetUser;
    // 查询用户
    try {
        targetUser = await users.findUser(data.uemail);
        if (targetUser.length != 0) {
            targetUser = targetUser[0];
            console.log('=== ~ res: ' + targetUser);
        } else {
            console.log("=== ! need to sign up");
            arr.token = undefined;
            arr.err = "need to sign up";
            return arr;
        }
    } catch (e) {
        throw e;
    }
    if (targetUser.pass == true) {
        if (targetUser.upwd == data.upwd) {
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
    } else {
        console.log("=== ! waiting for review");
        arr.token = undefined;
        arr.err = "waiting for review";
        return arr;
    }
}

module.exports = login;