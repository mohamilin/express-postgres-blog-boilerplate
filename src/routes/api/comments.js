const { Router } = require('express');
const { commentControllers } = require('../../controllers/api');
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
router.route('/').post(auth(), commentControllers.addComment);

module.exports = router;
