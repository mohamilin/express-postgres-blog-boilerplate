const Joi = require('joi');
const httpStatus = require('http-status');
const select = require('../utils/select');
const AppError = require('../utils/AppError');

const validates = (schmea) => (req, res, next) => {
  const validSchema = select(schmea, ['params', 'query', 'body']);
  const object = select(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((item) => item.message).join(', ');
    return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validates;
