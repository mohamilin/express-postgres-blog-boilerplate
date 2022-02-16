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
    Post.belongsToMany(models.categories, { through: 'posts_categories', foreignKey: 'postId', as: 'categories' });
    Post.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
    Post.belongsToMany(models.tags, { through: 'posts_tags', foreignKey: 'postId', as: 'tags' });
  };
  return Post;
};
