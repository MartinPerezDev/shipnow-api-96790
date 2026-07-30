import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shipnow API",
      version: "1.0.0",
      description: "Documentación de la API de Shipnow"
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Servidor local"
      }
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            firstName: {
              type: "string",
              example: "Daniela"
            },
            lastName: {
              type: "string",
              example: "Ponce"
            },
            email: {
              type: "string",
              example: "daniela@gmail.com"
            },
            role: {
              type: "string",
              example: "customer"
            },
            documents: {
              type: "array",
              example: []
            }
          }
        },

        UsersResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success"
            },
            message: {
              type: "string",
              example: "Lista de usuarios"
            },
            payload: {
              type: "array",
              items: {
                $ref: "#/components/schemas/User"
              }
            }
          }
        },

        UserResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success"
            },
            message: {
              type: "string",
              example: "Obtener usuario por id"
            },
            payload: {
              $ref: "#/components/schemas/User"
            }
          }
        },

        ErrorResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "error"
            },
            error: {
              type: "string",
              example: "USER_NOT_FOUND"
            },
            message: {
              type: "string",
              example: "Usuario no encontrado"
            }
          }
        },

        UserInput: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              example: "Daniela"
            },
            lastName: {
              type: "string",
              example: "Ponce"
            },
            email: {
              type: "string",
              example: "daniela@gmail.com"
            },
            password: {
              type: "string",
              example: "mypassword"
            },
            role: {
              type: "string",
              example: "customer"
            },
            documents: {
              type: "array",
              example: []
            }
          },
          required: ["firstName", "lastName", "email", "password"]
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
});