// 图片资源controller

// 调用封装JWT工具
const JWT = require('../utils/theJWT');
const jwtutil = new JWT();
// 数据库操作工具
const thDB = require('../utils/theMongoDB');
const { ObjectID } = require('mongodb');
// 文件及路径操作
const fs = require('fs');
const path = require('path');

// 仅获取系统背景图片路径列表
exports.getBkglist = async function () {
    let res = { 'paths': [], 'counter': 0 };
    // 预处理查询参数
    const targetCol = 'loginbkg';
    const query = {};
    const options = { projection: { '_id': 0, 'path': 1 } };
    try {
        queryRes = await thDB.findData(targetCol, query, options);
        if (queryRes.length == 0) {
            console.log('=== ! res: no any background pics, plz contact admin');
        } else {
            queryRes.forEach(v => {
                res.paths.push(v.path);
            });
            res.counter = queryRes.length;
        }
        return res;
    } catch (e) {
        throw e;
    }
}

// 获取系统背景图片详情
exports.getBkglistDetail = async function () {
    let res = { 'pics': [], 'counter': 0 };
    // 预处理查询参数
    const targetCol = 'loginbkg';
    const query = {};
    const options = { projection: { '_id': 1, 'name': 1, 'path': 1 } };
    try {
        let queryRes = await thDB.findData(targetCol, query, options);
        if (queryRes.length == 0) {
            console.log('=== ! res: no any background pics, plz contact admin');
        } else {
            res.pics = queryRes
            res.counter = queryRes.length;
        }
        return res;
    } catch (e) {
        throw e;
    }
}

// 新增背景资源
exports.addOneBkgPic = async function (file) {
    let res = { ifSuccess: false, err: '' };
    // 预处理查询参数
    const targetCol = 'loginbkg';
    const insertDoc = { 'name': file.name, "type": file.type, "path": file.path };
    try {
        let queryRes = await thDB.insertOneData(targetCol, insertDoc);
        if (queryRes == 1) {
            console.log("=== ~ res: insert backgroud pic " + file.name + " seccess");
            // 移动文件
            let oldPath = file.tempPath;
            let newPath = path.join(__dirname, "/../public" + file.path);
            fs.rename(oldPath, newPath, (e) => {
                if (e) {
                    res.err = e.message
                } else {
                    console.log("=== ~ move system background pic: " + file.name + " success");
                }
            })
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            console.log("=== ! err");
            res.err = '遇到一些意外';
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}

// 删除指定图片资源
exports.delOneBkgPic = async function (col, deltarget) {
    let res = { ifSuccess: false, err: '' };
    // 预处理查询参数
    const targetCol = col;
    const query = { _id: ObjectID(deltarget) };
    // 删除数据库对应数据, 并返回删除的文档
    try {
        let queryRes = await thDB.deleteWithReturn(targetCol, query);
        if (queryRes) {
            // 根据删除结果已出
            let picPath = queryRes.path;
            let dirPath = __dirname.split("\\");
            dirPath.splice(-1, 1, 'public')
            dirPath = dirPath.join("\\");
            picPath = path.join(dirPath, picPath);
            fs.unlink(picPath, (e) => {
                if (e) {
                    res.err = e.message
                } else {
                    console.log("=== ~ delete system background pic: " + queryRes.name + " success");
                }
            });
            res.ifSuccess = true;
            res.err = undefined;
        } else {
            res.err = 'No match';
        }
        return res;
    } catch (e) {
        res.err = e.message;
        return res;
    }
}

// 获取题目图片资源

