'use strict';

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    postId: DataTypes.INTEGER,
    title_comment: DataTypes.STRING,
    short_desc: DataTypes.STRING,
    content: DataTypes.TEXT,
    createdAt: DataTypes.INTEGER,
    image: DataTypes.STRING,
    updatedAt: DataTypes.INTEGER
  }, {})
  return Comment;
};