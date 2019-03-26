// Package dependencies
const Axios = require('axios');

// Custom dependencies
const Config = require('../config');

/**
 * Gets the external products from the product API.
 */
const getExternalProducts = async (req, res) => {
  const { URL: url, USERNAME: username, PASSWORD: password } = Config.EXTERNAL_API;
  const axiosConfig = {
    auth: { username, password },
  };

  Axios.get(url, axiosConfig)
    .then(response => res.status(200).json({ products: response.data }))
    .catch(() => res.status(404).json({ error: 'Not found' }));
};

module.exports = {
  getExternalProducts,
};
