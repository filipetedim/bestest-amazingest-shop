// Package dependencies
const Path = require('path');

// Custom dependencies
const Config = require('./config.json');
const Database = require('./database.json');

/**
 * Creates the url to connect to atlas.
 * @returns {String} - database url
 */
const getDatabaseConnectionUrl = () =>
  `mongodb+srv://${Database.USERNAME}:${Database.PASSWORD}@${Database.URL}`;

module.exports = {
  PORT: Config.PORT,
  TOKEN_SECRET: Config.TOKEN_SECRET,
  TOKEN_EXPIRATION: Config.TOKEN_EXPIRATION,
  ROOT_PATH: Path.resolve(__dirname, '..'),
  getDatabaseConnectionUrl,
};
