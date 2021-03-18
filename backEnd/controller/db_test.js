// // 调用mongodb相关库
// const { MongoClient } = require("mongodb");
// const db_url = 'localhost:27017';
// const db_usr = encodeURIComponent("root");
// const db_pwd = encodeURIComponent("root");
// // const authMechanism = "DEFAULT&ssl=false;
// // /?authMechanism=${authMechanism}
// const db_uri =`mongodb://${db_usr}:${db_pwd}@${db_url}/epdc_sys_db?authSource=admin`;
// console.log(db_uri);

// const client = new MongoClient(db_uri);
// async function connect_to_db() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//     let test_db = client.db('epdc_sys_db').collection('test');
//     let res = await test_db.find({'u_acct': '954827899@qq.com'}, {'_id': 0, 'u_pwd':1}).toArray();
//     console.log(res);
//   } finally {
//     await client.close();
//   }
// }
// connect_to_db().catch(console.dir);



const users = require('./db_users');
// test for 登录查询
let test1 = {"uemail": "11abc@123.com", "upwd": "123123"};
let res1;
users.findUser(test1.uemail).catch(console.dir)
    .then((res)=>{
        if (res.length != 0){
            res1 = res[0];
            console.log(res1);
        } else {
            console.log("no result");
        }
    });


// test for 注册插入
// let test2 = {"uemail": "abc@123.com", "uname": "Alice",  "upwd": "123123", "postscript": "zxmnmbvadzpioyewqhkjdbznbvlkadmzxlv"};
// let res2;
// users.insertUser(test2).catch(console.dir)
//     .then((res)=>{ res2 = res.insertedCount;console.log(res2);});
