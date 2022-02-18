const Model = require('../database/models');

const { categories, posts, users } = Model.sequelize.models;

const addCategory = async (user, payload) => {
  const { id } = user;
  const { name_category, slug } = payload;
  const category = await categories.create({ userId: id, name_category, slug });
  return category;
};

const getCategory = async () => {
  const category = await categories.findAll({
    include: [
      {
        model: posts,
        as: 'posts',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'fullName'],
      },
    ],
  });
  return category;
};

const getCategoryById = async (id) => {
  const category = await categories.findOne({
    where: {
      id,
    },
    include: [
      {
        model: posts,
        as: 'posts',
        through: {
          attributes: [],
        },
      },
      {
        model: users,
        as: 'users',
        attributes: ['id', 'fullName'],
      },
    ],
  });
  return category;
};

const getCategoryBySlug = async (slug) => {
  const category = await categories.findOne({ where: { slug } });
  return category;
};

module.exports = {
  addCategory,
  getCategory,
  getCategoryById,
  getCategoryBySlug,
};
