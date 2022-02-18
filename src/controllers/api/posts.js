const httpStatus = require('http-status');
const { postService, tagService, categoryService } = require('../../services');
const AppError = require('../../utils/AppError');
const catchError = require('../../utils/catchError');

const getPosts = catchError(async (req, res) => {
  const posts = await postService.getPosts();
  res.status(200).json({
    success: true,
    result: {
      posts,
    },
  });
});

const addPosts = catchError(async (req, res) => {
  const { user } = req;
  const { tagId, categoryId } = req.body;
  const category = await categoryService.getCategoryById(categoryId);
  const tag = await tagService.getTagById(tagId);
  if (!tag || !category) {
    throw new AppError(httpStatus.NOT_FOUND, 'id tag tidak ditemukan');
  }
  const posts = await postService.addPosts(user, req.body);
  await tagService.addPostsTags(tag, posts);
  res.status(httpStatus.CREATED).json({
    success: true,
    result: {
      posts,
    },
  });
});

const getPostsById = catchError(async (req, res) => {
  const posts = await postService.getPostsById(req.params.id);
  if (!posts) {
    throw new AppError(httpStatus.NOT_FOUND, `id ${req.params.id} tidak ditemukan`);
  }
  res.status(200).json({
    success: true,
    result: {
      posts,
    },
  });
});

const getPostsBySlug = async (req, res) => {
    const { slug } = req.params;
    const posts = await postService.getPostsBySlug(slug);
    res.status(201).json({
      success: true,
      result: {
        posts,
      },
    });
}

module.exports = {
  getPosts,
  addPosts,
  getPostsById,
  getPostsBySlug,
};
