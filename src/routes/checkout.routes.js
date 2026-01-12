const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/checkout.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/checkout', authMiddleware, checkout);

module.exports = router;
