// Package dependencies
const Mongoose = require('mongoose');
const { validationResult } = require('express-validator/check');

// Models
const Bundle = require('../models/Bundle');

const Product = Mongoose.model('Product');

/**
 * Adds the product information to each bundle.
 */
const addProducts = async result => {
  if (Array.isArray(result)) {
    await Promise.all(
      result.map((bundle, i) =>
        Promise.all(
          bundle.products.map((productId, j) =>
            Product.findById(productId).then(product => {
              result[i].products[j] = product; // eslint-disable-line
            }),
          ),
        ),
      ),
    );

    return result;
  }

  await Promise.all(
    result.products.map((productId, i) =>
      Product.findById(productId).then(product => {
        result.products[i] = product; // eslint-disable-line
      }),
    ),
  );
  return result;
};

/**
 * Gets all bundles.
 */
const getBundles = (req, res) => {
  Bundle.find()
    .then(addProducts)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Gets a specific bundle.
 */
const getBundle = (req, res) => {
  const { id } = req.params;

  Bundle.findById(id)
    .then(addProducts)
    .then(result => res.status(result ? 200 : 404).json(result || {}))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Creates a bundle.
 */
const createBundle = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ validationErrors: validationResult(req).array() });
  }

  const { name, discountPercentage, products } = req.body;
  const newBundle = new Bundle({ name, discountPercentage, products });

  newBundle
    .save()
    .then(result => res.status(201).json(result))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Updates a bundle.
 */
const updateBundle = (req, res) => {
  if (!validationResult(req).isEmpty()) {
    return res.status(400).json({ validationErrors: validationResult(req).array() });
  }

  const { id } = req.params;
  const { name, discountPercentage, products } = req.body;

  Bundle.findByIdAndUpdate(id, { name, discountPercentage, products }, { new: true })
    .then(addProducts)
    .then(result => res.status(result ? 200 : 404).json(result || {}))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Deletes a bundle.
 */
const deleteBundle = (req, res) => {
  const { id } = req.params;

  Bundle.findByIdAndDelete(id)
    .then(result => res.status(result ? 200 : 404).json(result || {}))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

/**
 * Gets all bundles that contain a specific product id.
 */
const getBundlesWithProductId = (req, res) => {
  const { id } = req.params;

  Bundle.find({ products: id })
    .then(addProducts)
    .then(result => res.status(200).json(result))
    .catch(error => res.status(500).json({ message: 'Something went wrong', error }));
};

module.exports = {
  getBundles,
  getBundle,
  createBundle,
  updateBundle,
  deleteBundle,
  getBundlesWithProductId,
};
