'use strict';

module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define(
    'posts_tags',
    {
      postId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {}
  );

  PostTag.associate = function (models) {
    // here code relation
  };
  return PostTag;
};
