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
        },

        Store: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            name: {
              type: "string",
              example: "Tienda Central"
            },
            address: {
              type: "string",
              example: "Av. Siempre Viva 123"
            },
            owner: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            isActive: {
              type: "boolean",
              example: true
            }
          }
        },

        StoresResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success"
            },
            message: {
              type: "string",
              example: "Lista de tiendas"
            },
            payload: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Store"
              }
            }
          }
        },

        StoreResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success"
            },
            message: {
              type: "string",
              example: "Obtener tienda por id"
            },
            payload: {
              $ref: "#/components/schemas/Store"
            }
          }
        },

        StoreInput: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Tienda Central"
            },
            address: {
              type: "string",
              example: "Av. Siempre Viva 123"
            },
            owner: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            isActive: {
              type: "boolean",
              example: true
            }
          },
          required: ["name", "address", "owner"]
        },

        OrderItem: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Caja mediana"
            },
            quantity: {
              type: "number",
              example: 2
            },
            price: {
              type: "number",
              example: 1500
            }
          }
        },

        Order: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            customer: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            store: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderItem"
              }
            },
            deliveryAddress: {
              type: "string",
              example: "Calle Falsa 456"
            },
            total: {
              type: "number",
              example: 3000
            },
            status: {
              type: "string",
              example: "created"
            },
            priority: {
              type: "string",
              example: "normal"
            }
          }
        },

        OrdersResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success"
            },
            message: {
              type: "string",
              example: "Lista de pedidos"
            },
            payload: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Order"
              }
            }
          }
        },

        OrderResponse: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "success"
            },
            message: {
              type: "string",
              example: "Obtener pedido por id"
            },
            payload: {
              $ref: "#/components/schemas/Order"
            }
          }
        },

        OrderInput: {
          type: "object",
          properties: {
            customer: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            store: {
              type: "string",
              example: "6a46646de068d46fc6bbda5a"
            },
            items: {
              type: "array",
              items: {
                $ref: "#/components/schemas/OrderItem"
              }
            },
            deliveryAddress: {
              type: "string",
              example: "Calle Falsa 456"
            },
            priority: {
              type: "string",
              example: "normal"
            }
          },
          required: ["customer", "store", "items", "deliveryAddress"]
        },

        OrderStatusInput: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "assigned"
            }
          },
          required: ["status"]
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
});
