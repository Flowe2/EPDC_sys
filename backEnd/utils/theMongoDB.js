// 用户信息相关

// 读取配置文件
const config = require('../serverConf');

// 调用mongodb相关库
const { MongoClient } = require('mongodb');
const db_url = config.dbServer + ":" + config.dbPort;
const db_usr = encodeURIComponent(config.dbUser);
const db_pwd = encodeURIComponent(config.dbPwd);
const db_uri = `mongodb://${db_usr}:${db_pwd}@${db_url}`;
// console.log(db_uri);

// 增加 options 解决 node 20360 warning
const client = new MongoClient(db_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

/* =============================== init connect =============================== */
exports.initDb = async function () {
    // 连接数据库
    await client.connect();
    // 验证
    await client.db('admin').command({ ping: 1 });
    console.log("=== ~ connected to DB successfully");
}

/* ========================== close connect when exit ========================= */
exports.closeDb = async function () {
    console.log("=== ! CLOSED connection with DB");
    await client.close();
}

/* =================================== find =================================== */
exports.findUser = async function (targetCol, query, options) {
    let res;
    try {
        const col = client.db('epdc_sys_db').collection(targetCol);
        res = await col.find(query, options).toArray();
        return res;
    } finally {
        console.log("=== ~ connection keeping");
    }
};

/* ================================== insert ================================== */
exports.insertUser = async function (targetCol, doc) {
    let res;
    try {
        const col = client.db('epdc_sys_db').collection(targetCol);
        res = await col.insertOne(doc);
        return res.insertedCount;
    } finally {
        console.log("=== ~ connection keeping");
    }
}

/* ================================== delete ================================== */
exports.deleteUser = async function (targetCol, query) {
    let res;
    try {
        const col = client.db('epdc_sys_db').collection(targetCol);
        res = await col.deleteOne(query)
        return res.deletedCount;
    } finally {
        console.log("=== ~ connection keeping");
    }
}

/* ================================== update ================================== */
exports.updateUser = async function (targetCol, query, updateDoc, options) {
    let res;
    try {
        const userlist = client.db('epdc_sys_db').collection(targetCol);
        res = await userlist.updateOne(query, updateDoc, options);
        return res.modifiedCount;
    } finally {
        console.log("=== ~ connection keeping");
    }
}