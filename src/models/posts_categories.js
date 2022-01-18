'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('posts_categories', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  })
  return PostCategory;
};