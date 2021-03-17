// 用户信息相关

// 调用mongodb相关库
const { MongoClient } = require("mongodb");
const db_url = 'localhost:27017';
const db_usr = encodeURIComponent("root");
const db_pwd = encodeURIComponent("root");
const db_uri =`mongodb://${db_usr}:${db_pwd}@${db_url}/epdc_sys_db?authSource=admin`;
console.log(db_uri);

// const client = new MongoClient(db_uri);
// async function connect_to_db() {
//     try {
//         // 连接到数据库
//         await client.connect();
//         // 验证
//         await client.db("admin").command({ ping: 1 });
//         console.log("Connected successfully to client");
//         let userlist = client.db('epdc_sys_db').collection('userlist');
//         let res = await userlist.find({ '_id': 'abc@123.com' }, { 'pwd': 0 }).toArray();
//         console.log(res);
//     } finally{
//         await client.close();
//     }
// }
// connect_to_db().catch(console.dir);


exports.findUser = function (target_user) {
    let res;
    // 连接到db
    MongoClient.connect((err, db) => {
        if (err) {
            console.log(err);
            console.log("数据库连接失败");
            res = "failed to connet"
        } else {
            let userlist = db.db('epdc_sys_db').collection('userlist');
            userlist.find({ '_id': target_user.uemail }, (error, data) => {
                if (error) {
                    console.log("error");
                    res = error;
                } else {
                    console.log("OK");
                    res = data.toArray();
                }
            });
        }
        db.close();
    });
    return res;
}