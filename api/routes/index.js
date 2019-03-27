// Package dependencies
const express = require('express');

// Init
const router = express.Router();

// Routes
const External = require('./external');
const Product = require('./product');
const Bundle = require('./bundle');

// Registrations
router.use('/external', External);
router.use('/products', Product);
router.use('/bundles', Bundle);
router.use((req, res) => res.status(404).json({ message: `${req.originalUrl} not found` }));

module.exports = router;
