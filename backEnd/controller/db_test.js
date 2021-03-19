const users = require('./db_users');

// test for 登录查询
let test1 = { "uemail": "11abc@123.com", "upwd": "123123" };
let res1;
users.findUser(test1.uemail)
    .catch(console.dir)
    .then((res) => {
        if (res.length != 0) {
            res1 = res[0];
            console.log(res1);
        } else {
            console.log("no result");
        }
    });


// // test for 注册插入
// let test2 = {
//     "uemail": "954827899@qq.com",
//     "uname": "Flowe2",
//     "upwd": "123456",
//     "postscript": "注册插入测试"
// };
// let res2;
// users.insertUser(test2)
//     .catch(console.dir)
//     .then((res) => {
//         if (res != undefined) {
//             res2 = res;
//             console.log(res2);
//             console.log(`${res.insertedCount} documents were inserted with the _id: ${res.insertedId}`);
//         } else {
//             res2 = "err";
//             console.log(res2);
//         }
//     });