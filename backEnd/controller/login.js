// 用户登录验证controller

// 调用封装JWT工具
const JWT = require('../certify/theJWT');
const jwtutil = new JWT();

// 测试数据
const usersList = [
    {"uemail": "abc@123.com", "upwd": "123123"},
    {"uemail": "aaa@111.com", "upwd": "111111"},
    {"uemail": "bbb@222.com", "upwd": "222222"},
    {"uemail": "ccc@333.com", "upwd": "333333"}
];

// 测试用登录方法
function login(data) {
    console.log(data);
    let arr = [];
    for (let i=0; i<data.length; i++){
        if (usersList[i].uemail == data[0].uemail){
            if (usersList[i].upwd == data[0].upwd){
                arr[0] = { "ifPass": true};
                arr[1] = { "token" : makeToken()};
                console.log(arr);
                return arr;
            }
        }
    }
    arr[0] = { "ifPass": false};
    console.log(arr);
    return arr;
}

module.exports = login;