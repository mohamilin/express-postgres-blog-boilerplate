module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comments',
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title_comment: DataTypes.STRING,
      short_desc: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
    {}
  );

  Comment.associate = function (models) {
    // here code relation
    Comment.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
    Comment.belongsTo(models.posts, { foreignKey: 'postId', as: 'posts' });
  };
  return Comment;
};
