// Package dependencies
const express = require('express');

// Controllers
const {
  getBundles,
  getBundle,
  createBundle,
  updateBundle,
  deleteBundle,
  getBundlesWithProductId,
} = require('../controllers/bundle');

// Middlewares
const { validateCreateProps, validateUpdateProps } = require('../middlewares/validations/bundle');

// Init
const router = express.Router();

// Endpoints
router.get('/', getBundles);
router.get('/product/:id', getBundlesWithProductId);
router.get('/:id', getBundle);
router.post('/', validateCreateProps, createBundle);
router.put('/:id', validateUpdateProps, updateBundle);
router.delete('/:id', deleteBundle);

module.exports = router;
