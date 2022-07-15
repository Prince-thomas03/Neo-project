var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const hbs = require('express-handlebars');
const session=require('express-session')




var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

const db=require('./config/connection')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

///////setting user layout has default layout 
app.engine('hbs', hbs.engine({ extname: 'hbs', defaultLayout: 'user-layout', layoutsDir: __dirname + '/views/layouts/', partialsDir: __dirname + '/views/partials/' }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


///session settings

app.use(session({
  secret: "prince",
  saveUninitialized:true,
  cookie: { maxAge: 600000000 },
  resave: false 
}));


////db connection

db.connect((err)=>{
  if(err)
  console.log("databse not connected" +err);
  else
  console.log("databse connected succesfully");
})

/////////routes

app.use('/', userRouter);
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