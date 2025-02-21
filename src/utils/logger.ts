import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...rest}) => {
  const restString = Object.keys(rest).length ? JSON.stringify(rest) : '';

  return `${timestamp} ${level}: ${stack || message} ${restString}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',

  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [

    new winston.transports.Console({
      format: combine(
        colorize(),
        logFormat
      )
    }),

    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};

export { logger, stream }; 