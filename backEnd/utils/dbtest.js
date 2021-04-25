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
// let res5;
// theDB.initDb().then(()=>{
//     theDB.findCheckingUser()
//         .catch(console.dir)
//         .then((res) => {
//             if (res.length != 0) {
//                 res5 = res;
//                 console.log(res5);
//             } else {
//                 console.log("no result");
//             }
//             theDB.closeDb();
//         });
// });

// ==========================================================
// test #6 for 修改密码    [OK]
// let res6;
// theDB.initDb().then(()=>{
//     theDB.modifyUPwd("test@c88.com", "123456")
//         .catch(console.dir)
//         .then((res) => {
//             if (res == 1) {
//                 console.log("modified success.");
//             } else {
//                 console.log("no result");
//             }
//             theDB.closeDb();
//         });
// });

// ==========================================================
// test #7 for 注册管理查询    [OK]
// theDB.initDb().then(() => {
//     theDB.deleteUser("delete@test.com")
//         .catch(console.dir)
//         .then((res) => {
//             if (res == 1) {
//                 console.log("delete success.");
//             } else {
//                 console.log("no result");
//             }
//             theDB.closeDb();
//         });
// });

/*  =============================== 重构, 上方测试demo已失效 =============================== */

// 用户登录查询    [OK]
// const userlist = 'userlist';
// const query1 = { '_id': "abc@123.com" };
// const options1 = { projection: { '_id': 1, 'upwd': 1, 'pass': 1 } };
// let res1;
// theDB.initDb().then(()=>{
//     theDB.findUser(userlist, query1, options1)
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


// 用户注册查询    [OK]
// const userlist = 'userlist';
// const insertDoc = {
//     "_id": "123123123@qq.com",
//     "uname": "123123",
//     "upwd": "123456",
//     "postscript": "注册插入测试",
//     "signup": "2021-04-07 12:01:10",
//     "lastlog": ""
// };
// theDB.initDb().then(()=>{
//     theDB.insertUser(userlist, insertDoc)
//         .catch(console.dir)
//         .then((res) => {
//             if (res == 1) {
//                 console.log(res);
//                 // console.log(`${res.insertedCount} documents were inserted with the _id: ${res.insertedId}`);
//             } else {
//                 console.log("err");
//             }
//             theDB.closeDb();
//         });
// });


// 删除用户测试    [OK]
// const targetCol = 'userlist';
// const query = { _id: "123123123@qq.com" };
// theDB.initDb().then(() => {
//     theDB.deleteUser(targetCol, query)
//         .catch(console.dir)
//         .then((res) => {
//             if (res == 1) {
//                 console.log("delete success.");
//             } else {
//                 console.log("no result");
//             }
//             theDB.closeDb();
//         });
// });

// 单选测试数据
const test = [
        {
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",
            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
        {
          
          subject: "操作系统原理",
          type: "sc",
          keywords: ["系统", "交互性"],
          question: "为了提高系统的交互性，人们设计了(__)",
          payload: {
            src: "",

            options: [
              "批处理系统",
              "分时系统",
              "实时系统",
              "分布式系统",
            ],
            answer: ["B"],
          },
          additionTime: "2020-04-20",
          lastUseTime: "2020-ss-me",
        },
      ];