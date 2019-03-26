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

module.exports = {
  getProducts,
};
