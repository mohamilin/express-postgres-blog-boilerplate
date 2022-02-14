const httpStatus = require('http-status');
const { postService } = require('../../services');
const catchError = require('../../utils/catchError')

const getPosts = catchError(async (req, res) => {
    const posts = await postService.getPosts();
    res.status(200).json({
        success: true,
        result : {
            posts
        }
    });
});

const addPosts = catchError(async(req, res) => {
    const user = req.user
    const posts = await postService.addPosts(user, req.body)
    res.status(httpStatus.CREATED).json({
        success: true,
        result : {
            posts
        }
    })
})

const getPostsById = catchError(async(req, res) => {
    const posts = await postService.getPostsById(req.params.id)
    res.status(200).json({
        success: true,
        result : {
            posts
        }
    })
})
module.exports = {
    getPosts,
    addPosts,
    getPostsById
}