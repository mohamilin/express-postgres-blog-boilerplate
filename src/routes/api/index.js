const express = require('express');
const authRoutes = require('./auth');
const categoryRoutes = require('./categories');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Web API' });
});

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
