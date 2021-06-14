// 图片资源controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');

// 获取系统背景图片路径
exports.getBkglist = async function (data) {
    let arr = { 'paths': [], counter: 0};
    // 预处理查询参数
    const targetCol = 'loginbkg';
    const query = {};
    const options = { projection: { 'path': 1 } };
    try {
        res = await thDB.findData(targetCol, query, options);
        if (res.length == 0) {
            console.log('=== ! res: no any background pics, plz contact admin');
        } else {
            res.forEach(v => {
                arr.paths.push(v.path);
            });
            arr.counter = res.length;
        }
        return arr;
    } catch (e) {
        throw e;
    }
}

// 获取题目图片资源

