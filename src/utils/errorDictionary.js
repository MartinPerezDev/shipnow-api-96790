export const ERROR_DICTONARY = {
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Datos invalidos o incompletos"
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    message: "Usuario no encontrado"
  },

  INVALID_USER_ROLE: {
    statusCode: 400,
    message: "Rol invalido"
  },

  ROUTE_NOT_FOUND: {
    statusCode: 404,
    message: "Ruta no encontrada"
  },

  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Error interno del servidor"
  },

  FILE_REQUIRED: {
    statusCode: 400,
    message: "Debe adjuntar un archivo"
  },

  INVALID_DOCUMENT_TYPE: {
    statusCode: 400,
    message: "Tipo de documento invalido"
  },

  INVALID_FILE_TYPE: {
    statusCode: 400,
    message: "Tipo de archivo no permitido"
  },

  FILE_TOO_LARGE: {
    statusCode: 400,
    message: "El archivo supera el tamaño maximo permitido de 5MB"
  }
}