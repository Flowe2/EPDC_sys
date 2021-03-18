// 用户信息相关

// 调用mongodb相关库
const { MongoClient } = require("mongodb");
const db_url = 'localhost:27017';
const db_usr = encodeURIComponent("root");
const db_pwd = encodeURIComponent("root");
const db_uri =`mongodb://${db_usr}:${db_pwd}@${db_url}`;
// console.log(db_uri);

// 增加 options 解决 node 20360 warning
const client = new MongoClient(db_uri, {useUnifiedTopology: true});

// 查询用户
// usage: findUser().catch(console.dir);
async function findUser (target_user_email) {
    let res;
    const query = { '_id': target_user_email };
    const options = {projection: {'_id':1, 'pwd': 1}};
    
    try {
        // 连接到数据库
        await client.connect();
        // 验证
        await client.db("admin").command({ ping: 1 });
        console.log("=== ~ connected successfully");
        const userlist = client.db('epdc_sys_db').collection('userlist');
        res = await userlist.find(query, options).toArray();
        return res;
    } finally{
        await client.close();
    }
};

exports.findUser = findUser;