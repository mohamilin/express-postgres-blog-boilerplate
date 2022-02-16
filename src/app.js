const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const httpStatus = require('http-status');
const passport = require('passport');

// config
const { env } = require('./config/settings');
const jwtStrategy = require('./config/passport');

// middleware
const morgan = require('./middlewares/morgan');
const { errorConverter, errorException } = require('./middlewares/errorHandler');
const authRateLimiter = require('./middlewares/authRateLimiter');

// utils
const AppError = require('./utils/AppError');

// routes
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// jwt | passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (env === 'production') {
  app.use('/api/v1/auth', authRateLimiter);
}

app.use('/api/v1', apiRouter);

app.use(function (req, res, next) {
  if (req.originalUrl && req.originalUrl.split('/').pop() === 'favicon.ico') {
    return res.status(204).send();
  }
  return next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((req, res, next) => {
  next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

// boolean needed, convert error to AppError,
app.use(errorConverter);
// handle error
app.use(errorException);

module.exports = app;
