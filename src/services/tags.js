const Model = require('../database/models');

const { posts, tags, posts_tags } = Model.sequelize.models;

const addTags = async (payload) => {
  const { title_tag } = payload;
  const tag = await tags.create({ title_tag });
  return tag;
};

const addPostsTags = async (tag, post) => {
  await posts_tags.create({ postId: post.id, tagId: tag.id });
};

const getTags = async () => {
  const tag = await tags.findAll({
    include: [
      {
        model: posts,
        as: 'posts',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return tag;
};

const getTagById = async (id) => {
  const tag = await tags.findOne({ where: { id } });
  return tag;
};
module.exports = {
  addTags,
  addPostsTags,
  getTags,
  getTagById,
};
