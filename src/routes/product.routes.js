const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth.middleware');
const admin = require('../middlewares/admin.middleware');

/* PUBLIC */
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

/* ADMIN ONLY */
router.post('/', auth, admin, productController.create);
router.put('/:id', auth, admin, productController.update);
router.delete('/:id', auth, admin, productController.remove);

module.exports = router;
