module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('posts_categories', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  });

  PostCategory.associate = function (models) {
    // here code relation
  };
  return PostCategory;
};
