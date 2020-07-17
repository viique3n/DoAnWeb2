//#region local variable
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const CronJob = require('cron').CronJob;

const indexRouter = require('./api/routes/index');
const khachhangApiRouter = require('./api/routes/khachhang.route');
const adminApiRouter = require('./api/routes/admin.route');
const taikhoanRouter = require('./api/routes/taikhoan.route');
const chuyenKhoanRouter = require('./api/routes/chuyenkhoan.route');
const laiSuatRouter = require('./api/routes/laisuat.route');
const totpRouter = require('./api/routes/totp.route');
const sotietkiemRouter = require('./api/routes/sotietkiem.route');
const { capNhatSoTietKiem } = require('./services/sotienkiem.service');
const app = express();
//#endregion

//#region express setup

// app.use(
//   cors({
//     origin: 'http://localhost:3000/',
//     credentials: true,
//   })
// );
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

// const capNhatSoTietKiemJob = new CronJob('* * * * *', capNhatSoTietKiem); // Cron every minute
// const capNhatSoTietKiemJob = new CronJob('* * * * * *', capNhatSoTietKiem); // Cron every second
const capNhatSoTietKiemJob = new CronJob('0 1 * * *', capNhatSoTietKiem); // Cron at 01:00 am

capNhatSoTietKiemJob.start();
//#region api
app.use('/api/admin/', adminApiRouter);
app.use('/api/auth/', khachhangApiRouter);
app.use('/api/taikhoan/', taikhoanRouter);
app.use('/api/chuyenkhoan/', chuyenKhoanRouter);
app.use('/api/laisuat/', laiSuatRouter);
app.use('/api/totp/', totpRouter);
app.use('/api/sotietkiem/', sotietkiemRouter);
app.use('/', indexRouter);
//#endregion

//#region route
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
// "scripts": {
//   "start": "node ./bin/www",
//   "start:dev": "nodemon --inspect ./bin/www"
// },
