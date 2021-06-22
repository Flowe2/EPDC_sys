const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../serverConf');
const publicKey = path.join(__dirname, "\\..\\", config.publicKey);
const privateKey = path.join(__dirname, "\\..\\", config.privateKey);

// JWT 类
function JWT() {
    // 生成token
    this.generateToken = function (data) {
        let payLoad = {
            'type': 'JWT',
            'account': data.account,
            'role': data.role,
        };
        // 秘钥
        console.log("=== ~ payLoad ready");
        let pri_key = fs.readFileSync(privateKey);
        // 调用jwt包
        // expiresIn: 秒数-number形式 60*60即1小时, 天/小时数-带单位的string "2 days"/"7d"/"12h"即2天/7天/12小时, 毫秒数-不带单位string "120"即120ms
        let token = jwt.sign(payLoad, pri_key, { algorithm: 'RS256', expiresIn: data.expire });
        return token;
    };
    // 校验token
    this.verifyToken = function (token) {
        // 公钥
        let pub_key = fs.readFileSync(publicKey);
        let res;
        jwt.verify(token, pub_key, { algorithms: ['RS256'] }, (err, payLoad) => {
            if (err) {
                // 验证出错: token过期 / token不正确
                res = { 'err' : err.message, 'pass': false };
            } else {
                // console.log('payload analysis: ', payLoad);
                console.log("=== ~ payload parsing successfully");
                res = { 'payload' : payLoad, 'pass': true }
            }
        });
    return res;
    };
    this.timeStamp = function () {
        let nowDate = new Date();
        // yyyy-mm-dd hh:mm:ss
        let timeStamp = nowDate.getFullYear() + '-' + (nowDate.getMonth()+1) + '-' + nowDate.getDate() 
            + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds();
        return timeStamp;
    };
}

module.exports = JWT;