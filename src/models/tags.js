'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tags', {
    title_tag: DataTypes.STRING,
    createdAt: DataTypes.INTEGER
  })
  return Tag;
};