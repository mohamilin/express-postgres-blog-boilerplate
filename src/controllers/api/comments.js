const httpStatus = require('http-status');
const catchError = require('../../utils/catchError');
const AppError = require('../../utils/AppError');
const { commentService, postService } = require('../../services');

const addComment = catchError(async (req, res) => {
 try {
    const user = req.user;
    const { postId } = req.body;
    const posts = await postService.getPostsById(postId);
    if (!posts) {
      throw new AppError(httpStatus.NOT_FOUND, 'id tidak ditemukan');
    }
    const comments = await commentService.addComment(user, req.body);
    res.status(httpStatus.CREATED).json({
      success: true,
      result: {
        comments,
      },
    });
 } catch (error) {
     console.log(error);
 }
});


module.exports = {
  addComment,
};
