// Package dependencies
const express = require('express');

// Init
const router = express.Router();

// Routes
const External = require('./external');

// Middlewares
// TODO:

// Registrations
router.use('/external', External);
router.use((req, res) => res.status(404).json({ error: `${req.originalUrl} not found` }));

module.exports = router;
