const Model = require('../models');
const { categories } = Model.sequelize.models;

const addCategory = async (user, payload) => {
  const { id } = user;
  const { name_category, slug } = payload;
  const category = await categories.create({ userId: id, name_category, slug });
  return category;
};

const getCategory = async () => {
  const category = await categories.findAll();
  return category;
};

const getCategoryById = async (id) => {
  const category = await categories.findOne({where: {id: id}});
  return category;
};

const getCategoryBySlug = async (slug) => {
  const category = await categories.findOne({ where: { slug: slug } });
  return category;
};

module.exports = {
  addCategory,
  getCategory,
  getCategoryById,
  getCategoryBySlug,
};
