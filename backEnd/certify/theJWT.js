const fs = require('fs');
const jwt = require('jsonwebtoken');

// JWT 类
function JWT() {
    this.judge = function (data) {
        if (data.amail == undefined) {
            console.log("this is a user");
            data.role = false;
        }
        else {
            console.log("this is a admin");
            data.role = true;
        }
    }

    // 生成token
    this.generateToken = function (data) {
        let nowTime = Math.floor( Date.now() / 1000 );
        // 6h 后过期
        let payLoad = {
            "type": "JWT",
            "user": data.uemail,
            "role": data.role,
            "iat": nowTime,
        };
        // 秘钥
        let pri_key = fs.readFileSync(__dirname + '\\rsa_private_key.pem');
        // 调用jwt包
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
                res = { "err" : err.message, "pass": false };
            } else {
                console.log(payLoad);
                res = { "err" : null, "pass": true }
            }
        });
    return res;
    }
}

module.exports = JWT;