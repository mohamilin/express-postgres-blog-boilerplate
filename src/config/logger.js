const winston = require('winston');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];

const logger = winston.createLogger({
  level: config === 'development' ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({
      level: 'debug',
      stderrLevels: ['error'],
      format: winston.format.combine(
        config === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level} : ${message}`)
      ),
      handleExceptions: true,
    }),
  ],
});


module.exports = logger;
