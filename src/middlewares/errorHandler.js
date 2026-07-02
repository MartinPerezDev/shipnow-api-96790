import { createError, errorResponse } from "../utils/apiResponse.js";

export function errorHandler(error, req, res, next) {
  let handledError = error;

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