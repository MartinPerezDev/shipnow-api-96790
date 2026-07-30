import { createError, errorResponse } from "../utils/apiResponse.js";
import logger from "../config/logger.js";

export function errorHandler(error, req, res, next) {
  let handledError = error;

  logger.error("Error procesando request", {
    error: error.message || "Error sin mensaje",
    stack: error.stack,
    method: req.method,
    url: req.originalUrl,
    statusCode: error.statusCode || 500
  });

  //Si nos envian un id de mongodb invalido
  if(error.name === "CastError"){
    handledError = createError("VALIDATION_ERROR", "ID invalido");
  }

  return errorResponse(res, {
    statusCode: handledError.statusCode || 500,
    error: handledError.code || "INTERNAL_SERVER_ERROR",
    message: handledError.message || "Error interno del servidor"
  });
}
