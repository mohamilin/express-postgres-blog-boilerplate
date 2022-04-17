#!/usr/bin/env node

/**
 * Module dependencies.
 */

const Sequelize = require('sequelize');
const app = require('./app');
const debug = require('debug')('express-postgres-blog:server');
const http = require('http');
const logger = require('./config/logger');

const env = process.env.NODE_ENV;

// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/./config/config.js`)[env];

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

// connect to database postgres
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .sync()
  .then(() => {
    logger.info(`DB connection sucessful.`);
  })
  .catch((err) => {
    logger.error(`Unable to connect to the database', error: ${err.message}.`);
  });

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind}  requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind}  is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  logger.info(`Listening to port ${port}`);
}
