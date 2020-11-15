const winston = require('winston');
var appRoot = require('app-root-path');

const options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    },
    errorConf: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }
  };

  const logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.File(options.errorConf),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false,
  });

  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };

module.exports = logger;