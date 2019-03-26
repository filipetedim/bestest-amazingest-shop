// Package dependencies
const express = require('express');

// Controllers
const { getProducts, getProduct, createProduct, updateProduct } = require('../controllers/product');

// Middlewares
const { validateCreateProps, validateUpdateProps } = require('../middlewares/validations/product');

// Init
const router = express.Router();

// Endpoints
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', validateCreateProps, createProduct);
router.put('/:id', validateUpdateProps, updateProduct);

module.exports = router;
