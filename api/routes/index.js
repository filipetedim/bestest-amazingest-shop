// Package dependencies
const express = require('express');

// Init
const router = express.Router();

// Routes
// TODO:

// Middlewares
// TODO:

// Registrations
// TODO:
router.use((req, res) =>
  res.status(404).json({ error: `${req.originalUrl} not found` }),
);

module.exports = router;
