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

// const MongoStore = connectMongo(session);
app.use(cookieParser());
// app.use(session({
//   name: conf.session.name,
// 	secret: conf.session.secret,
// 	resave: true,
// 	saveUninitialized: false,
// 	cookie: conf.session.cookie,
// 	store: new MongoStore({
//   	url: conf.url
// 	})
// }))

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

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