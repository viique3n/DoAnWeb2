//#region local variable
var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const indexRouter = require('./api/routes/index');
const authApiRouter = require('./api/routes/auth.route');
const adminApiRouter = require('./api/routes/admin.route');
const authRouter = require('./api/routes/auth.route');
const taikhoanRouter = require('./api/routes/taikhoan.route');
var app = express();
//#endregion

//#region express setup

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//#endregion

//#region routes and middlewares
// auth middleware
//app.use(require('./middlewares/auth.middleware'));

//#region api
app.use('/api/admin/', adminApiRouter);
app.use('/api/auth/', authApiRouter);
app.use('/api/taikhoan/', taikhoanRouter);
app.use('/', indexRouter);
//#endregion

//#region route
app.use('/', authRouter);
//#endregion

//#endregion

//#region error handle
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//#endregion
module.exports = app;
