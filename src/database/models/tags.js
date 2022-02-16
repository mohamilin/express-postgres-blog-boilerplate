module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tags',
    {
      title_tag: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    { timestamps: true }
  );

  Tag.associate = function (models) {
    // here code relation
    Tag.belongsToMany(models.posts, { through: 'posts_tags', foreignKey: 'tagId', as: 'posts' });
  };
  return Tag;
};
