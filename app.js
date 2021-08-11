import createError from 'http-errors';
import express from 'express';

import session from 'express-session';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectMongo from 'connect-mongo';
import logger from 'morgan';
import config from './config/config.js'
import chalk from 'chalk';
import favicon from 'serve-favicon';

import mongoose from 'mongoose';
// import config from '../config/config.js';
// import chalk from 'chalk';
import router from './routes/index.js';
import errors from './libs/exception'
  
global.errs = errors


var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// session设置
var MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(session({
  name: config.session.name,
	secret: config.session.secret,
	resave: false,
	saveUninitialized: false, //强制将未初始化的 session 存储, 默认值是true
	cookie: {
    "httpOnly": true,
    "secure": false,
    "maxAge": 1000*60*60*24*30  //过期时间一个月
  },
  rolling: true, //在每次请求时强行设置 cookie，重置 cookie 过期时间（默认：false)
	store: new MongoStore({
  	url: config.url,
    // touchAfter: 24 * 3600 // 设置在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
	})
}))

//中间件， 设置跨域访问和全局变量
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.locals.username = req.session.username;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

router(app);

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
  console.log(err)
  res.render('error');
});


mongoose.connect(config.url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open' ,() => {
	console.log(
    chalk.green('连接数据库成功')
  );
  app.listen(config.port, () => {
    console.log(
      chalk.green('成功监听端口：'+config.port)
    )
  });
})

db.on('error', function(error) {
    console.error(
      chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', function() {
    console.log(
      chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(config.url, {server:{auto_reconnect:true}});
});