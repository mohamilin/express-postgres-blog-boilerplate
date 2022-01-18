const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
const {development} = require('./config/config')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// connect to database
const sequelize = new Sequelize(development.database, development.username, development.password, {
  host: development.host,
  dialect: development.dialect
});

sequelize.sync()
  .then(() => {
  console.log({status: 'success', message: 'DB connection sucessful.'});
  }).catch(err => {
  console.log({status: 'failed', message: 'Unable to connect to the database', error:  err.message});
  })


const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
