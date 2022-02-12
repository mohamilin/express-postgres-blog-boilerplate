const Joi = require('joi');
const { password } = require('./customs');

const register = {
  body: Joi.object().keys({
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    roleId: Joi.number().required().valid(1, 2, 3),
  }),
};

module.exports = {
  register,
};
