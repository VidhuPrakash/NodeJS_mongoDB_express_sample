var createError = require('http-errors');
var express = require('express');
// var MongoClient= require("mongodb");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs =require('express-handlebars');
var mongoose = require('mongoose');
const session = require('express-session');



// var db=require("./config/connection")

// var db=require('./config/db_connection')

// db.connect((err)=>{
  //   if(err){ console.log("connection error"+err);}
  //   else {console.log("DB connection succesfull");}
  // })
  mongoose.connect('mongodb://127.0.0.1:27017/TaskSample'); 
  
  
  
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var homeRouter = require('./routes/home');
  var admRouter = require("./routes/admin");
  var logoutRouter = require("./routes/logout")
  var adminPanelRouter = require("./routes/admin-panel")
  // const connectDb = require('./config/db_connection');
  
  // connectDb();
var app = express();



// view engine setup
app.set('views', path.join((__dirname, 'views')));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs', defaultLayout:'layout',layoutDir: __dirname + '/views/layout',partialsDir:__dirname+'/views/partial'}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret:'secrete_key',
  resave:false,
  saveUninitialized:true
}));


//routs
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/home', homeRouter);
app.use('/admin', admRouter);
app.use('/logout', logoutRouter);
app.use('/admin_panel',adminPanelRouter);

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

