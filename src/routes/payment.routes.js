const express = require('express');
const router = express.Router();
const { createSnapTransaction } = require('../controllers/payment.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/payments/snap', auth, createSnapTransaction);

module.exports = router;
