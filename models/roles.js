'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    name_role: DataTypes.STRING

  })
  return Role;
};