import winston from "winston"

  const customLevels = {
    levels: {
      fatal: 0, //Maxima prioridad
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5 // Minima prioridad
    }
  }

const logger = winston.createLogger({

    levels: customLevels.levels,

    level: process.env.NODE_ENV === "production" ? "http" : "debug",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: './logs/test_con_winston.log'})
    ]

})

export default logger