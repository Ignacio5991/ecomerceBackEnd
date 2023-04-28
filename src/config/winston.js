const winston = require('winston');

//Niveles de errores
const customLevels = {
  levels: {
    errorFatal: 0,
    errordeConexion: 1,
    error: 2,
  },
  colors: {
    errorFatal: 'red',
    errordeConexion: 'yellow',
    error: 'green',
  },
};

//Logger de produccion
const loggerProd = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'errorFatal',
      format: winston.format.combine(winston.format.colorize({ colors: customLevels.colors }), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: './src/errors.log',
      level: 'error',
      format: winston.format.simple(),
    }),
  ],
});

//Logger Dev
const loggerDev = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(winston.format.colorize({ colors: customLevels.colors }), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: './src/errors.log',
      level: 'warn',
      format: winston.format.simple(),
    }),
  ],
});

const mdwlLogger = (req, res, next) => {
  req.logger = process.env.NODE_ENV ? loggerProd : loggerDev;
  req.logger.http('${req.method}' - '${req.url}');
  next();
};

module.exports = mdwlLogger;
