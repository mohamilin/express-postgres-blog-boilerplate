const httpStatus = require('http-status');
const { categoryService } = require('.');
const Model = require('../models');
const AppError = require('../utils/AppError');
const { posts, categories, posts_categories } = Model.sequelize.models;

const getPosts = async () => {
    const post = await posts.findAll()
    return post
}

const addPosts = async (user, payload) => {
    const { id } = user
    const { categoryId, title, slug, short_desc, content } = payload
    await categoryService.getCategoryById(categoryId)
    const post = await posts.create({ categoryId, userId: id, title, slug, short_desc, content })
    await posts_categories.create({
        postId: post.id,
        categoryId: categoryId
    })
    return post
}

const getPostsById = async(id) => {
    const post = await posts.findOne({where: {id:id}})
    if(!post) {
        throw new AppError(httpStatus.NOT_FOUND, `id ${id} post tidak ditemukan`)
    }

    return post
}
module.exports = {
    getPosts,
    addPosts,
    getPostsById
}