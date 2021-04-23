const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 读取配置文件
const config = require('./serverConf');
const frontServer = config.frontServer + ':' + config.frontPort;

const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

// 跨域
const cors = require('cors');

const app = express();

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