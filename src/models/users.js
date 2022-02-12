'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  User.associate = (models) => {
    // here code relation
    User.belongsToMany(models.roles, {
      through: 'users_roles',
      as: 'roles',
      foreignKey: 'userId',
    });

    User.hasMany(models.tokens, { as: 'tokens' });
  };
  return User;
};
