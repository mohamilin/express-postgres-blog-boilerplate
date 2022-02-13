const httpStatus = require('http-status');
const Model = require('../models');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const { users } = Model.sequelize.models;

const salt = bcrypt.genSaltSync(10);

const checkAvailableEmail = async (email) => {
  const dataEmail = await users.findOne({ where: { email: email } });
  if (dataEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email sudah digunakan');
  }
};

const checkAvailableUsername = async (username) => {
  const dataUsername = await users.findOne({ where: { userName: username } });
  if (dataUsername) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Username sudah digunakan');
  }
};

const createUser = async (payload) => {
  const { fullName, userName, email, password, roleId } = payload;
  await checkAvailableEmail(email);
  await checkAvailableUsername(userName);
  const user = await users.create({ fullName, userName, email, password: bcrypt.hashSync(password, salt), roleId });
  return user;
};

const getUserByEmail = async (email) => {
  return await users.findOne({ where: { email: email } });
};

const matchPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  const passwords = await bcrypt.compare(password, user.password);
  return passwords;
};

const login = async (email, password) => {
  const user = await getUserByEmail(email);
  const checkPassword = await matchPassword(email, password);
  if (!user || !checkPassword) {
    throw new AppError(httpStatus.NOT_FOUND, 'Not Found');
  }
  return user;
};
module.exports = {
  createUser,
  login,
};
