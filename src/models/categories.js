'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'categories',
    {
      userId: DataTypes.INTEGER,
      name_category: DataTypes.STRING,
      slug: DataTypes.STRING,
      createdAt: DataTypes.INTEGER,
      updatedAt: DataTypes.INTEGER,
    },
    {}
  );

  Category.associate = function (models) {
    // here code relation
  };
  return Category;
};
