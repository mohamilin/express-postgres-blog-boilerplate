'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'posts',
    {
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      short_desc: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {}
  );

  Post.associate = function (models) {
    // here code relation
  };
  return Post;
};
