// Package dependencies
const express = require('express');

// Controllers
const { getExternalProducts } = require('../controllers/external');

// Init
const router = express.Router();

// Endpoints
router.get('/', getExternalProducts);

module.exports = router;
