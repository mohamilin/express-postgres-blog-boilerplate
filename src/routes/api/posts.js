const { Router } = require('express');
const { postControllers } = require('../../controllers/api');
const auth = require('../../middlewares/auth');

const router = Router();

/**
 * Kalau setiap roles dapat menjalankan routenya ckup berikan `auth()`
 * Namun, kalau role nya hanya dapat menjalankan task tertentu dapat diberikan dengan auth('namaTugas')
 * Untuk nama tugas dapat dilihat di src > config > roles.js
 */

/**
 * Hak akses :
 *
 *
 */
router.route('/').get(postControllers.getPosts).post(auth(), postControllers.addPosts);
// router.route('/:id').get(postControllers.getPostsById);
router.route('/:slug').get(postControllers.getPostsBySlug);

module.exports = router;
