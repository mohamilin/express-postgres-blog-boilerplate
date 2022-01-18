'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('users_roles', {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  })

  return UserRole;
};