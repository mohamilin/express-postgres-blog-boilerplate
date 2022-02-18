const Model = require('../database/models');
const { comments } = Model.sequelize.models;

const addComment = async (user, payload) => {
  const { postId, title_comment, short_desc, content } = payload;
  const comment = await comments.create({ userId: user.id, postId, title_comment, short_desc, content });
  return comment;
};

module.exports = {
  addComment,
};
