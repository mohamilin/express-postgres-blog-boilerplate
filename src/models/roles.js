'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'roles',
    {
      name_role: DataTypes.STRING,
    },
    {}
  );

  Role.associate = (models) => {
    // here code relation
    Role.belongsToMany(models.users, {
      through: 'users_roles',
      as: 'users',
      foreignKey: 'roleId',
    });
  };
  return Role;
};
