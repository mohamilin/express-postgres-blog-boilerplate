const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { env } = require('./config/settings');

const morgan = require('./middlewares/morgan');
const { errorConverter, errorException } = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');
const httpStatus = require('http-status');

const apiRouter = require('./routes/api');

const app = express();

if (env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// enable cors
app.use(cors());
app.options('*', cors());

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((req, res, next) => {
  next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to AppError, if needed
app.use(errorConverter);
// handle error
app.use(errorException);

module.exports = app;
