const theDB = require('./theMongoDB');

// 测试用户数据
// const usersList = [
//     { "uemail": "abc@123.com", "upwd": "123123" },
//     { "uemail": "aaa@111.com", "upwd": "111111" },
//     { "uemail": "bbb@222.com", "upwd": "222222" },
//     { "uemail": "ccc@333.com", "upwd": "333333" }
// ];

// 测试管理员数据
// const adminList = [
//     { "account": "admin", "apwd": "666666" },
//     { "account": "flowe2", "apwd": "666666" }
// ];


// ==========================================================
// test #1 for 用户登录查询    [OK]
// let test1 = { "uemail": "abc@123.com", "upwd": "123123" };
// let res1;
// theDB.initDb().then(()=>{
//     theDB.findUser(test1.uemail)
//         .catch(console.dir)
//         .then((res) => {
//             if (res.length != 0) {
//                 res1 = res[0];
//                 console.log(res1);
//             } else {
//                 console.log("no result");
//             }
//             theDB.closeDb();
//         });
// });


// ==========================================================
// test #2 for 注册插入    [OK]
// let test2 = {
//     "uemail": "954827899@qq.com",
//     "uname": "Flowe2",
//     "upwd": "123456",
//     "postscript": "注册插入测试"
// };
// let res2;
// theDB.initDb().then(()=>{
//     theDB.insertUser(test2)
//         .catch(console.dir)
//         .then((res) => {
//             if (res != undefined) {
//                 res2 = res;
//                 console.log(res2);
//                 console.log(`${res.insertedCount} documents were inserted with the _id: ${res.insertedId}`);
//             } else {
//                 res2 = "err";
//                 console.log(res2);
//             }
//             theDB.closeDb();
//         });
// });


// ==========================================================
// test #3 for 管理员登陆查询  [OK]
// let test3 = { "account": "admin", "apwd": "666666" };
// let res3;
// theDB.initDb().then(()=>{
//     theDB.findAdmin(test3.account)
//     .catch(console.dir)
//     .then((res) => {
//         if (res.length != 0) {
//             res3 = res[0];
//             console.log(res3);
//         } else {
//             console.log("no result");
//         }
//         theDB.closeDb();
//     });
// });


// ==========================================================
// test #4 for 账号维护查询    [OK]
// let res4;
// theDB.initDb().then(()=>{
//     theDB.findCheckedUser()
//         .catch(console.dir)
//         .then((res) => {
//             if (res.length != 0) {
//                 res4 = res;
//                 console.log(res4);
//             } else {
//                 console.log("no result");
//             }
//             theDB.closeDb();
//         });
// });

// ==========================================================
// test #5 for 注册管理查询    [OK]
let res5;
theDB.initDb().then(()=>{
    theDB.findCheckingUser()
        .catch(console.dir)
        .then((res) => {
            if (res.length != 0) {
                res5 = res;
                console.log(res5);
            } else {
                console.log("no result");
            }
            theDB.closeDb();
        });
});