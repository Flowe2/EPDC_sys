var config = {
    // Server 
    port: 3000,

    // MongoDB info
    dbServer: 'localhost',
    dbPort: '27017',
    dbUser: 'root',
    dbPwd: 'root',

    // public/private key
    publicKey: '/utils/rsa_public_key.pem',
    privateKey: '/utils/rsa_private_key.pem',

    // FrontEnd info
    frontServer: 'localhost',
    frontPort: '8080',

    // Background Pic
    tempPicFolder: '/public/images/upload',
    bkgPath: '/public/images/loginbkg',
    quSrc: '/public/images/qusrc',
};

module.exports = config;