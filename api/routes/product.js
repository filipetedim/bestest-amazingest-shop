// Package dependencies
const express = require('express');

// Controllers
const { getProducts } = require('../controllers/product');

// Init
const router = express.Router();

// Endpoints
router.get('/', getProducts);

module.exports = router;
