const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const { authenticate, authorizeAdmin } = require('../middlewares/adminMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

module.exports = router;
