// Package dependencies
const express = require('express');

// Controllers
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product');

// Middlewares
const { validateCreateProps, validateUpdateProps } = require('../middlewares/validations/product');

// Init
const router = express.Router();

// Endpoints
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', validateCreateProps, createProduct);
router.put('/:id', validateUpdateProps, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
