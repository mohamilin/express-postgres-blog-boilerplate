const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { jwt } = require('./settings');
const { tokenTypes } = require('./tokens');
const Model = require('../models');
const { users } = Model.sequelize.models;

const jwtOptions = {
  secretOrKey: jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS_TOKEN) {
      throw new Error('Invalid type token');
    }
    const user = await users.findByPk(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = jwtStrategy;
