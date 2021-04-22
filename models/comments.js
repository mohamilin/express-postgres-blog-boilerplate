'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  comments.init({
    postId: DataTypes.INTEGER,
    title_comment: DataTypes.STRING,
    short_desc: DataTypes.STRING,
    content: DataTypes.TEXT,
    createdAt: DataTypes.INTEGER,
    image: DataTypes.STRING,
    updatedAt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};