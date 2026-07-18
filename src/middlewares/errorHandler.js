import { errorResponse } from "../utils/apiResponse.js";

export function errorHandler(error, req, res, next){
  return errorResponse(res, {
    statusCode: error.statusCode || 500,
    error: error.code,
    message: error.message
  });
}