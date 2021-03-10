// 用户登录验证controller
// 测试数据
const usersList = [
    {"uemail": "abc@123.com", "upwd": "123123"},
    {"uemail": "aaa@111.com", "upwd": "111111"},
    {"uemail": "bbb@222.com", "upwd": "222222"},
    {"uemail": "ccc@333.com", "upwd": "333333"}
];

// 测试用token生成
function makeToken() {
    return Date.now().toString();
}

// 测试用登录方法
function login(arr) {
    const user = JSON.parse(arr[0]);

    for (let i=0; i<usersList.length; i++){
        if (usersList[i].uemail == user.uemail){
            if (usersList[i].upwd == user.upwd){
                arr[0] = true;
                arr[1] = makeToken();
                return arr;
            }
        }
    }
    arr[0] = false;
    return arr;
}

module.exports = login;