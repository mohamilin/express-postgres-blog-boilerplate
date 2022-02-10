'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'posts',
    {
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      short_desc: DataTypes.STRING,
      content: DataTypes.TEXT,
      createdAt: DataTypes.INTEGER,
      image: DataTypes.STRING,
      updatedAt: DataTypes.INTEGER,
    },
    {}
  );

  Post.associate = function (models) {
    // here code relation
  };
  return Post;
};
