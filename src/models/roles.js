'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'roles',
    {
      name_role: DataTypes.STRING,
    },
    {}
  );

  Role.associate = function (models) {
    // here code relation
  };
  return Role;
};
