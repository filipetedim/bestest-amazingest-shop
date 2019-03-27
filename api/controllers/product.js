// Package dependencies
const { validationResult } = require('express-validator/check');

// Models
const Product = require('../models/product');

/**
 * Gets all products.
 */
const getProducts = (req, res) => {
  Product.find()
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Gets a specific product.
 */
const getProduct = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then(result => res.status(result ? 200 : 404).json(result || {}))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Creates a product.
 */
const createProduct = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ validationErrors: validationResult(req).array() });
  }

  const { _externalId, name, price } = req.body;
  const newProduct = new Product({ _externalId, name, price });

  newProduct
    .save()
    .then(result => res.status(201).json(result.toJSON()))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Updates a product.
 */
const updateProduct = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ validationErrors: validationResult(req).array() });
  }

  const { id } = req.params;
  const { name, price } = req.body;

  Product.findByIdAndUpdate(id, { name, price }, { new: true })
    .then(result => res.status(result ? 200 : 404).json(result || {}))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Deletes a product.
 */
const deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then(() => res.status(200).json({}))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
