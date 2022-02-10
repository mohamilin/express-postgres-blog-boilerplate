'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tags',
    {
      title_tag: DataTypes.STRING,
      createdAt: DataTypes.INTEGER,
    },
    {}
  );

  Tag.associate = function (models) {
    // here code relation
  };
  return Tag;
};
