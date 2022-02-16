module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comments',
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title_comment: DataTypes.STRING,
      short_desc: DataTypes.STRING,
      content: DataTypes.TEXT,
      createdAt: DataTypes.INTEGER,
      image: DataTypes.STRING,
      updatedAt: DataTypes.INTEGER,
    },
    {}
  );

  Comment.associate = function (models) {
    // here code relation
  };
  return Comment;
};
