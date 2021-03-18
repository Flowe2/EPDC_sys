// 用户登录验证controller

// 调用封装JWT工具
const JWT = require('../certify/theJWT');
const jwtutil = new JWT();
const userlist = require('./db_users');


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
    try{
        targetUser = await userlist.findUser(data.uemail);
        targetUser = targetUser[0];
    }catch(e){
        throw e;
    }
    if(targetUser._id == data.uemail){
        if(targetUser.pwd == data.upwd){
            // 验证通过, 生成token
            token = jwtutil.generateToken(data);
            arr.ifPass = true;
            arr.token = token;
            // console.log(arr);
            return arr;
        }
        else{
            console.log("=== ! error password ! ===");
            return arr;
        }
    }else{
        console.log("=== ! error user email ! ===");
        return arr;
    }
        
}

module.exports = login;