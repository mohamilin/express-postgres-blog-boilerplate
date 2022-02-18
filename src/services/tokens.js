const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/settings');
const { tokenTypes } = require('../config/tokens');
const Model = require('../database/models');

const { tokens } = Model.sequelize.models;

/**
 *
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 *
 */

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await tokens.create({
    token,
    userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });

  return tokenDoc;
};

/**
 *
 */

const generateTokenAuth = async (user) => {
  const accessTokenExp = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExp, tokenTypes.ACCESS_TOKEN);

  const refreshTokenExp = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExp, tokenTypes.REFRESH_TOKEN);

  await saveToken(refreshToken, user.id, refreshTokenExp, tokenTypes.REFRESH_TOKEN);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExp.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExp.toDate(),
    },
  };
};

const verifyToken = async (token, type) => {
  const data = jwt.verify(token, config.jwt.secret);
  const dataToken = await tokens.findOne({
    where: {
      token,
      type,
      userId: data.sub,
      blacklisted: false,
    },
  });

  if (!dataToken) {
    throw new Error('Token Not Found');
  }
  return dataToken;
};

module.exports = {
  generateToken,
  saveToken,
  generateTokenAuth,
  verifyToken,
};
