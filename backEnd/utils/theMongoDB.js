// 用户信息相关

// 调用mongodb相关库
const { MongoClient } = require("mongodb");
const db_url = 'localhost:27017';
const db_usr = encodeURIComponent("root");
const db_pwd = encodeURIComponent("root");
const db_uri =`mongodb://${db_usr}:${db_pwd}@${db_url}`;
// console.log(db_uri);

// 增加 options 解决 node 20360 warning
const client = new MongoClient(db_uri,
    {   useNewUrlParser: true,
        useUnifiedTopology: true
    });

// 初始化连接
exports.initDb = async function () {
    // 连接数据库
    await client.connect();
    // 验证
    await client.db("admin").command({ ping: 1 });
    console.log("=== ~ connected to DB successfully");
}

// 退出断开数据库连接
exports.closeDb = async function () { 
    console.log("=== ! CLOSED connection with DB");
    await client.close();
}

// 查询用户 - 登录用
exports.findUser = async function (target_user_email) {
    let res;
    // 预处理查询语句 查询数据
    const query = { '_id': target_user_email };
    const options = {projection: {'_id':1, 'upwd': 1, 'pass': 1}};
    
    try {
        const userlist = client.db('epdc_sys_db').collection('userlist');
        res = await userlist.find(query, options).toArray();
        return res;
    } finally{
        console.log("=== ~ DONE. connection keeping");
    }
};

// 添加用户 - 注册用
exports.insertUser = async function (target_user){
    // 预处理查询语句 插入数据
    let res;
    const doc = {
        '_id' : target_user.uemail,
        'uname' : target_user.uname,
        'upwd' : target_user.upwd,
        'pass' : false,
        'postscript' : target_user.postscript,
        'signup' : '',
        'lastlog' : ''
    }
    
    try {
        const userlist = client.db('epdc_sys_db').collection('userlist');
        res = await userlist.insertOne(doc);
        return res;
    } finally {
        console.log("=== ~ connection keeping");
    }
}

// 查询管理员 - 登录用
exports.findAdmin = async function (target_admin_email) {
    let res;
    // 预处理查询语句 查询数据
    const query = { '_id': target_admin_email };
    const options = {projection: {'_id':1, 'apwd': 1}};
    
    try {
        const adminlist = client.db('epdc_sys_db').collection('adminlist');
        res = await adminlist.find(query, options).toArray();
        return res;
    } finally{
        console.log("=== ~ connection keeping");
    }
};