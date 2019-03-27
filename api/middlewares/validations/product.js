// Package dependencies
const { body } = require('express-validator/check');

// Models
const Product = require('../../models/product');

const validateExternalID = body('_externalId')
  .not()
  .isEmpty()
  .withMessage('External ID is required')
  .isString()
  .withMessage('External ID should be a string')
  .custom(value =>
    Product.findByExternalId(value).then(product => {
      return product ? Promise.reject('External ID already exists') : Promise.resolve();
    }),
  )
  .withMessage('External ID must be unique');

const validateName = body('name')
  .not()
  .isEmpty()
  .withMessage('Name is required')
  .isString()
  .withMessage('Name should be a string');

const validatePrice = body('price')
  .not()
  .isEmpty()
  .withMessage('Price is required')
  .isNumeric()
  .withMessage('Price should be a number')
  .custom(value => value >= 0)
  .withMessage('Price should be 0 or above');

/**
 * Holds all validations for creating a product.
 */
const validateCreateProps = [validateExternalID, validateName, validatePrice];

/**
 * Holds all validations for updating a product.
 */
const validateUpdateProps = [validateName, validatePrice];

module.exports = {
  validateCreateProps,
  validateUpdateProps,
};
