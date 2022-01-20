const winston = require('winston');
const setting = require('./settings');

const logger = winston.createLogger({
  level: setting.env === 'development' ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      level: 'info',
      stderrLevels: ['error'],
      format: winston.format.combine(
        setting.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level} : ${message}`)
      ),
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;
