export const ERROR_DICTIONARY = {
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Datos invalidos o incompletos"
  },

  USER_NOT_FOUND: {
    statusCode: 404,
    message: "Usuario no encontrado"
  },

  STORE_NOT_FOUND: {
    statusCode: 404,
    message: "Tienda no encontrada"
  },

  ORDER_NOT_FOUND: {
    statusCode: 404,
    message: "Pedido no encontrado"
  },

  INVALID_USER_ROLE: {
    statusCode: 400,
    message: "Rol invalido"
  },

  INVALID_ORDER_STATUS: {
    statusCode: 400,
    message: "Estado de orden invalido"
  },
  
  ORDER_ITEMS_REQUIRED: {
    statusCode: 400,
    message: "El pedido debe incluir al menos un item"
  },

  USER_ALREADY_EXISTS: {
    statusCode: 409,
    message: "Ya existe un usuario con ese email"
  },

  ROUTE_NOT_FOUND: {
    statusCode: 404,
    message: "Ruta no encontrada"
  },

  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "Error interno del servidor"
  }
};