const morgan = require('morgan');
const logger = require('../config/logger');
const { env } = require('../config/settings');

morgan.token('message', (req, res) => res.locals.errorMessage || '');

const getIpFormat = () => (env === 'production' ? ':remote-addr - ' : '');
const successResFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

module.exports = {
  successHandler: morgan(successResFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger.info(message.trim()) },
  }),

  errorHandler: morgan(errorResFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger.info(message.trim()) },
  }),
};
