import winston from "winston"


const customLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    }
}

const logger = winston.createLogger({
    levels: customLevels.levels,

    level: process.env.NODE_ENV === "production" ? "info" : "debug",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),

    ),
    transports: [
        // En este caso almacenamos en un archivo la información que configuramos
        new winston.transports.File({
            filename: "ejemplo2.log"
        })
    ]
   
})

export default logger