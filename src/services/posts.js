const { getCategoryById } = require('./categories');
const { addPostsTags } = require('./tags');
const Model = require('../database/models');

const { posts, users, categories, posts_categories, tags, comments } = Model.sequelize.models;

const getPosts = async () => {
  const post = await posts.findAll({
    include: [
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
    ],
  });
  return post;
};

const addPosts = async (user, payload) => {
  const { id } = user;
  const { categoryId, title, slug, short_desc, content } = payload;
  const post = await posts.create({ categoryId, userId: id, title, slug, short_desc, content });
  await posts_categories.create({
    postId: post.id,
    categoryId,
  });
  return post;
};

const getPostsById = async (id) => {
  const post = await posts.findOne({
    where: { id },
    include: [
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return post;
};

const getPostsBySlug = async (slug) => {
  const post = await posts.findOne({
    where: { slug:slug },
    include: [ "comments",
      {
        model: categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'userName'],
      },
      {
        model: tags,
        as: 'tags',
        through: {
          attributes: [],
        },
      },
    ],
  });
  return post;
};

module.exports = {
  getPosts,
  addPosts,
  getPostsById,
  getPostsBySlug
};
