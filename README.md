# Backend - Clase 5

Proyecto backend desarrollado con Node.js, Express y MongoDB. Este proyecto corresponde a la Clase 5 del curso de Backend II, enfocado en la **Documentación de API con Swagger**.

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Generación y verificación de tokens JWT
- **cookie-parser** - Middleware para parsear cookies
- **swagger-ui-express** - Interfaz de usuario para Swagger
- **swagger-jsdoc** - Generación de documentación Swagger desde JSDoc
- **dotenv** - Gestión de variables de entorno
- **nodemon** - Herramienta de desarrollo para reiniciar automáticamente el servidor

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias:

```bash
npm install
```

## Configuración

1. Copiar el archivo de ejemplo de variables de entorno:

```bash
cp .env.example .env
```

2. Configurar las variables de entorno en el archivo `.env`:

```
PORT=8080
MONGO_URL=tu_url_de_mongodb
JWT_SECRET=tu_secreto_para_jwt
JWT_EXPIRES_IN=1d
```

## Uso

### Modo Desarrollo

Para iniciar el servidor en modo desarrollo con reinicio automático:

```bash
npm run dev
```

El servidor se iniciará en el puerto configurado en `.env`.

## Estructura del Proyecto

```
.
├── src/
│   ├── config/         # Configuraciones (conexión a BD)
│   ├── controllers/    # Lógica de negocio de las rutas
│   ├── middlewares/    # Middlewares personalizados
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Definición de rutas de la API
│   └── utils/          # Utilidades y funciones auxiliares
├── .env                # Variables de entorno (no versionado)
├── .env.example        # Ejemplo de variables de entorno
├── .gitignore          # Archivos ignorados por Git
├── app.js              # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
└── README.md           # Documentación del proyecto
```

## Documentación con Swagger

El proyecto implementa documentación automática de la API utilizando **Swagger** (OpenAPI Specification). La documentación se genera mediante:

- **swagger-jsdoc**: Permite generar la especificación Swagger a partir de comentarios JSDoc en el código
- **swagger-ui-express**: Proporciona una interfaz de usuario interactiva para visualizar y probar la documentación

### Acceso a la Documentación

Una vez iniciado el servidor, puedes acceder a la documentación interactiva de la API en:

```
http://localhost:8080/api-docs
```

Esta interfaz te permite:
- Visualizar todos los endpoints disponibles en la API
- Ver los parámetros requeridos y opcionales para cada endpoint
- Probar los endpoints directamente desde el navegador con la interfaz de Swagger UI
- Consultar los esquemas de los modelos de datos
- Ver ejemplos de request/response para cada operación

### Implementación Técnica

La documentación se expone mediante el siguiente endpoint en `app.js`:

```javascript
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))
```

Este endpoint sirve la interfaz de Swagger UI que renderiza la especificación Swagger generada automáticamente desde los comentarios JSDoc en los controladores y rutas.

## Endpoints Disponibles

### Sesiones

- `POST /api/sessions/register` - Registrar un nuevo usuario
- `POST /api/sessions/login` - Iniciar sesión
- `POST /api/sessions/logout` - Cerrar sesión
- `GET /api/sessions/current` - Obtener el usuario actual

## Características

- **Documentación con Swagger**: Implementación de documentación automática de la API usando swagger-jsdoc y swagger-ui-express
- **Autenticación con JWT**: Implementación de tokens JSON Web Token para autenticación
- **Gestión de cookies**: Uso de cookies para almacenar el token de sesión
- **Encriptación de contraseñas**: Uso de bcryptjs para hashear contraseñas de forma segura
- **Arquitectura modular**: Separación de responsabilidades en controladores, modelos y rutas

## Notas

- Las rutas para usuarios, eventos y tickets están comentadas en `app.js` y pueden ser activadas según se necesite
- El proyecto utiliza módulos ES (`type: "module"` en package.json)
- La conexión a MongoDB se establece automáticamente al iniciar el servidor
- El token JWT se almacena en una cookie HTTP-only para mayor seguridad
