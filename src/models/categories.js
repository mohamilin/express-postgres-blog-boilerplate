'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('categories', {
    name_category: DataTypes.STRING,
    slug: DataTypes.STRING,
    createdAt: DataTypes.INTEGER,
    updatedAt: DataTypes.INTEGER
  },{})
  return Category;
};