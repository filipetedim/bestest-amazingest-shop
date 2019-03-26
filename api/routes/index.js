// Package dependencies
const express = require('express');

// Init
const router = express.Router();

// Routes
const External = require('./external');
const Product = require('./product');

// Middlewares
// TODO:

// Registrations
router.use('/external', External);
router.use('/products', Product);
router.use((req, res) => res.status(404).json({ message: `${req.originalUrl} not found` }));

module.exports = router;
