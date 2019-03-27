// Package dependencies
const { body } = require('express-validator/check');

// Models
const Product = require('../../models/product');

const validateName = body('name')
  .not()
  .isEmpty()
  .withMessage('Name is required')
  .isString()
  .withMessage('Name should be a string');

const validateDiscountPercentage = body('discountPercentage')
  .not()
  .isEmpty()
  .withMessage('Discount percentage is required')
  .isNumeric()
  .withMessage('Discount percentage should be a number')
  .custom(value => value >= 0 && value <= 100)
  .withMessage('Discount percentage should be between 0 and 100 including');

const validateProducts = body('products')
  .not()
  .isEmpty()
  .withMessage('Products is required')
  .isArray()
  .withMessage('Products should be an array')
  .custom(array => array.length > 0)
  .withMessage('Products should have at least one product')
  .custom(async array => {
    await Promise.all(
      array.map(id =>
        Product.findById(id).then(product => {
          return product ? Promise.resolve() : Promise.reject('Product Id does not exist');
        }),
      ),
    );
  })
  .withMessage('Products should have valid IDs');

/**
 * Holds all validations for creating a bundle.
 */
const validateCreateProps = [validateName, validateDiscountPercentage, validateProducts];

/**
 * Holds all validations for updating a bundle.
 */
const validateUpdateProps = [validateName, validateDiscountPercentage, validateProducts];

module.exports = {
  validateCreateProps,
  validateUpdateProps,
};
