const { Router } = require('express');
const { categoryController } = require('../../controllers/api');
const auth = require('../../middlewares/auth');
const router = Router();

/**
 * Kalau setiap roles dapat menjalankan routenya ckup berikan `auth()`
 * Namun, kalau role nya hanya dapat menjalankan task tertentu dapat diberikan dengan auth('namaTugas')
 * Untuk nama tugas dapat dilihat di src > config > roles.js
 */

/**
 * Hak akses :
 * CREATE categories : apapun rolenya, yang terpenting memiliki accessToken / auth()
 * UPDATE categories : apapun rolenya, yang terpenting memiliki accessToken / auth()
 *
 */
router.route('/').post(auth('managerUsers'), categoryController.addCategory).get(categoryController.getCategory);

router.route('/:id').get(categoryController.getCategoryById);

module.exports = router;
