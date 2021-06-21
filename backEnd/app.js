const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 读取配置文件
const config = require('./serverConf');
const frontServer = config.frontServer + ':' + config.frontPort;
const tempPicFolder = path.join(__dirname, config.tempPicFolder);
const bkgPath = path.join(__dirname, config.bkgPath);
const quSrc = path.join(__dirname, config.quSrc);

// routers
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

// 跨域
const cors = require('cors');

const app = express();

// 打开或创建一个指定文件夹
let createFolder = function (folder) {
  try {
      fs.accessSync(folder); // 打开文件夹
      console.log("=== ~ background pic folder '" + folder + "' exists.");
  } catch (e) {
      fs.mkdirSync(folder); // 创建文件夹
      console.log("=== ~ background pic folder '" + folder + "' founded.");
  }
};
createFolder(tempPicFolder);
createFolder(bkgPath);
createFolder(quSrc);

app.use(cors({  
    origin:['http://'+frontServer],
    methods:['GET','POST'],
}));
//跨域问题 - cors 中间件
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://'+frontServer);
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// 解析请求里的json/form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 托管 public 静态目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;