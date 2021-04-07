const fs = require('fs');
const jwt = require('jsonwebtoken');

// JWT 类
function JWT() {
    // 生成token
    this.generateToken = function (data) {
        let payLoad = {
            'type': 'JWT',
            'user': data.account,
            'role': data.role,
        };
        // 秘钥
        console.log("=== ~ payLoad ready");
        let pri_key = fs.readFileSync(__dirname + '\\rsa_private_key.pem');
        // 调用jwt包
        // 1h 后过期
        let token = jwt.sign(payLoad, pri_key, { algorithm: 'RS256', expiresIn: '1h' });
        return token;
    };
    // 校验token
    this.verifyToken = function (token) {
        // 公钥
        let pub_key = fs.readFileSync(__dirname + '\\rsa_public_key.pem');
        let res;
        jwt.verify(token, pub_key, { algorithms: ['RS256'] }, (err, payLoad) => {
            if (err) {
                // 验证出错: token过期 / token不正确
                res = { 'err' : err.message, 'pass': false };
            } else {
                // console.log('payload analysis: ', payLoad);
                console.log("=== ~ payload parsing successfully");
                res = { 'err' : null, 'pass': true }
            }
        });
    return res;
    };
    this.timeStamp = function () {
        let nowDate = new Date();
        // yyyy-mm-dd hh:mm:ss
        let timeStamp = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate() 
            + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getSeconds();
        return timeStamp;
    };
}

module.exports = JWT;