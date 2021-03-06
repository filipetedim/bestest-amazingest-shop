// Package dependencies
const Mongoose = require('mongoose');
const Express = require('express');
const Http = require('http');
const BodyParser = require('body-parser');
const Cors = require('cors');

// Custom dependencies
const Config = require('./config');

// Init
const app = Express();
const server = Http.Server(app);

// Mongoose settings
const connectionUrl =
  process.env.NODE_ENV === 'test'
    ? Config.getTestDatabaseConnectionUrl()
    : Config.getDatabaseConnectionUrl();
Mongoose.Promise = global.Promise;
Mongoose.set('useFindAndModify', false);
Mongoose.connect(connectionUrl, { useNewUrlParser: true }).catch(err => {
  throw Error(err);
});

// Middlewares
app.options('*', Cors());
app.use(Cors());
app.use(BodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(BodyParser.json({ limit: '50mb' }));

// Routes
app.use('/v1', require('./routes'));

// Run server
server.listen(
  process.env.PORT || Config.PORT,
  () => console.log(`Server started on port ${Config.PORT}`), // eslint-disable-line
);

module.exports = app;
