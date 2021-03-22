const users = require('./theMongoDB');

// 测试用户数据
// const usersList = [
//     { "uemail": "abc@123.com", "upwd": "123123" },
//     { "uemail": "aaa@111.com", "upwd": "111111" },
//     { "uemail": "bbb@222.com", "upwd": "222222" },
//     { "uemail": "ccc@333.com", "upwd": "333333" }
// ];

// 测试管理员数据
// const adminList = [
//     { "account": "abc@123.com", "apwd": "123123" },
//     { "account": "aaa@111.com", "apwd": "111111" },
//     { "account": "bbb@222.com", "apwd": "222222" },
//     { "account": "ccc@333.com", "apwd": "333333" }
// ];

// // test for 登录查询
// let test1 = { "uemail": "abc@123.com", "upwd": "123123" };
// let res1;

// users.findUser(test1.uemail)
//     .catch(console.dir)
//     .then((res) => {
//         if (res.length != 0) {
//             res1 = res[0];
//             console.log(res1);
//         } else {
//             console.log("no result");
//         }
//         users.closeDb();
//     });

// test for 注册插入
let test2 = {
    "uemail": "954827899@qq.com",
    "uname": "Flowe2",
    "upwd": "123456",
    "postscript": "注册插入测试"
};
let res2;
users.insertUser(test2)
    .catch(console.dir)
    .then((res) => {
        if (res != undefined) {
            res2 = res;
            console.log(res2);
            console.log(`${res.insertedCount} documents were inserted with the _id: ${res.insertedId}`);
        } else {
            res2 = "err";
            console.log(res2);
        }
        users.closeDb();
    });