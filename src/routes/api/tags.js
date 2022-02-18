const { Router } = require('express');
const { tagControllers } = require('../../controllers/api');
const auth = require('../../middlewares/auth');

const router = Router();

router.route('/').get(tagControllers.getTags).post(auth(), tagControllers.addTags);

module.exports = router;
