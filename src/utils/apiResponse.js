import { ERROR_DICTONARY } from "./errorDictionary.js";

export function successResponse(res, { statusCode = 200, message, payload }){
  return res.status(statusCode).json({
    status: "success",
    message,
    payload
  });
}

export function errorResponse(res, { statusCode = 500, error, message = "Error interno en el servidor" }){
  return res.status(statusCode).json({
    status: "error",
    error,
    message
  })
}

export function createError(code, customMessage = null){
  const errorDefinition = ERROR_DICTONARY[code] || ERROR_DICTONARY.INTERNAL_SERVER_ERROR;

  const error = new Error( customMessage || errorDefinition.message );
  error.statusCode = errorDefinition.statusCode;
  error.code = ERROR_DICTONARY[code] ? code : "INTERNAL_SERVER_ERROR";

  return error;
}

/*

{
  status: "success",
  message: "",
  payload
}

{
  status: "error",
  error,
  message: ""
}

*/