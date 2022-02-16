'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'categories',
    {
      userId: DataTypes.INTEGER,
      name_category: DataTypes.STRING,
      slug: DataTypes.STRING,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
    {}
  );

  Category.associate = function (models) {
    // here code relation
    Category.belongsToMany(models.posts, { through: 'posts_categories', foreignKey: 'categoryId', as: 'posts' });
    Category.belongsTo(models.users, {foreignKey: 'userId', as: 'users'})
  };
  return Category;
};
