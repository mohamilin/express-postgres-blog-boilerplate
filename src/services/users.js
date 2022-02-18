const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const Model = require('../database/models');
const AppError = require('../utils/AppError');

const { users, tokens } = Model.sequelize.models;
const { tokenTypes } = require('../config/tokens');
const { verifyToken, generateTokenAuth } = require('./tokens');

const salt = bcrypt.genSaltSync(10);

const checkAvailableEmail = async (email) => {
  const dataEmail = await users.findOne({ where: { email } });
  if (dataEmail) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email sudah digunakan');
  }
  if (!dataEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'Email tidak ada');
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
  return await users.findOne({ where: { email } });
};

const matchPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  const passwords = await bcrypt.compare(password, user.password);
  if (!password) {
    throw new AppError(httpStatus.NOT_FOUND, 'Password Salah');
  }
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

const getUserById = async (id) => {
  const user = await users.findOne({ where: { id } });
  return user;
};

const refreshTokens = async (refreshToken) => {
  try {
    const refToken = await verifyToken(refreshToken, tokenTypes.REFRESH_TOKEN);
    const user = await getUserById(refToken.userId);
    if (!user) {
      throw new Error();
    }
    await refToken.destroy();
    return generateTokenAuth(user);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const logout = async (refreshToken) => {
  const refToken = await tokens.findOne({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH_TOKEN,
      blacklisted: false,
    },
  });
  if (!refToken) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tidak ditemukan');
  }

  await tokens.destroy({
    where: {
      token: refreshToken,
      type: tokenTypes.REFRESH_TOKEN,
      blacklisted: false,
    },
  });
};
module.exports = {
  createUser,
  login,
  logout,
  refreshTokens,
};
