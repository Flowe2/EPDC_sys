// 用户注册controller

// 数据库操作工具
const thDB = require('../utils/theMongoDB');

exports.realtimeCheck = async function () {
    
}


// 用户注册处理
exports.signup = async function (data) {
    // console.log("=== ~ " + data);
    let arr = { "ifPass": false, "token": '' };
    let targetUser;
    // 查询用户
}