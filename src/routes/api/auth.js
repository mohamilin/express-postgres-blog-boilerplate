const express = require('express');
const { userControllers } = require('../../controllers/api');
const validates = require('../../middlewares/validates');
const { userValidation } = require('../../validations');

const router = express.Router();

router.post('/register', validates(userValidation.register), userControllers.register);
router.post('/login', userControllers.login);

module.exports = router;
