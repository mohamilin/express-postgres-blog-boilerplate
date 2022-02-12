const pgError = require('pg-error');
const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { env } = require('../config/settings');

const errorConverter = (err, req, res, next) => {
  const error = err;
  if (!(error instanceof AppError)) {
    const statusCode =
      error.statusCode || error instanceof pgError ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorException = (err, req, res, next) => {
  const { statusCode, message } = err;
  if (env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...(env === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorException,
};
