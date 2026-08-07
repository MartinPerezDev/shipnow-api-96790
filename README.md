# Clase 4 - Logging y Monitoreo

## Objetivo de la clase

En esta unidad incorporamos **Logging** y **Monitoreo** dentro del proyecto **ShipNow**.

El objetivo es implementar un sistema profesional de registro de logs y monitoreo para poder:
- Rastrear errores y eventos en la aplicación
- Facilitar el debugging en producción
- Monitorear el estado y rendimiento de la API
- Mantener registros históricos de operaciones
- Detectar problemas proactivamente

---

# ¿Qué es Logging?

Logging consiste en registrar eventos y mensajes de la aplicación durante su ejecución para poder rastrear su comportamiento, diagnosticar problemas y monitorear su estado.

Por ejemplo:

Un log de error:

```text
[2024-08-07 18:30:45] error: Error al conectar con MongoDB
```

Un log de información:

```text
[2024-08-07 18:30:46] info: Servidor iniciado en puerto 8080
```

Un log de advertencia:

```text
[2024-08-07 18:30:47] warning: Tiempo de respuesta elevado en endpoint /api/orders
```

Estos registros permiten:

- Identificar cuándo ocurrió un problema
- Entender el contexto del error
- Rastrear el flujo de ejecución
- Analizar patrones de uso
- Mejorar el rendimiento

---

# Librería incorporada

Instalamos Winston para implementar un sistema profesional de logging.

```bash
npm install winston
```

Winston es una librería de logging multi-transporte asíncrona para Node.js que permite:
- Configurar múltiples niveles de log
- Enviar logs a diferentes destinos (consola, archivos, servicios externos)
- Formatear los logs según necesidades
- Manejar errores de forma robusta

---

# Configuración del Logger

Durante esta clase agregamos un sistema de logging profesional.

Archivo:

```text
src/config/logger.js
```

Configuración implementada:

```js
import winston from "winston"

const customLevels = {
  levels: {
    fatal: 0,    // Máxima prioridad
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5     // Mínima prioridad
  }
}

const logger = winston.createLogger({
  levels: customLevels.levels,
  level: process.env.NODE_ENV === "production" ? "http" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: './logs/test_con_winston.log'})
  ]
})
```

---

# Niveles de Log

El sistema implementa niveles personalizados de logging:

### fatal (0)
Errores críticos que impiden el funcionamiento de la aplicación.

### error (1)
Errores que no detienen la aplicación pero requieren atención.

### warning (2)
Advertencias sobre situaciones potencialmente problemáticas.

### info (3)
Información general sobre el funcionamiento de la aplicación.

### http (4)
Logs relacionados con peticiones HTTP.

### debug (5)
Información detallada para debugging (solo en desarrollo).

---

# Transportes de Log

El logger está configurado con dos transportes:

### Console
Envía los logs a la consola para visualización en tiempo real.

### File
Guarda los logs en un archivo para persistencia histórica.

Archivo de log:

```text
./logs/test_con_winston.log
```

Esto permite:
- Ver logs en tiempo real durante el desarrollo
- Mantener un registro histórico para análisis posterior
- Investigar problemas ocurridos en producción

---

# Configuración de Entorno

El nivel de log se configura según el entorno:

### Desarrollo (NODE_ENV !== production)
Nivel: `debug`

Muestra todos los logs incluyendo información detallada de debugging.

### Producción (NODE_ENV === production)
Nivel: `http`

Muestra logs desde nivel http hacia arriba, excluyendo debug.

Esto permite:
- Tener información detallada durante el desarrollo
- Reducir el volumen de logs en producción
- Mantener solo información relevante en ambientes productivos

---

# Formato de Logs

Los logs se formatean con timestamp para facilitar el rastreo temporal de eventos.

Formato:

```text
[timestamp] [level]: message
```

Ejemplo:

```text
[2024-08-07 18:30:45] error: Error al conectar con MongoDB
[2024-08-07 18:30:46] info: Servidor iniciado en puerto 8080
[2024-08-07 18:30:47] debug: Procesando petición GET /api/users
```

El timestamp permite:
- Identificar el momento exacto de cada evento
- Correlacionar logs con otros sistemas
- Realizar análisis temporales de problemas

---

# Uso del Logger

Para utilizar el logger en cualquier parte de la aplicación:

```js
import logger from './config/logger.js'

// Log de error
logger.error('Error al conectar con MongoDB')

// Log de información
logger.info('Servidor iniciado en puerto 8080')

// Log de advertencia
logger.warning('Tiempo de respuesta elevado')

// Log de debug
logger.debug('Procesando petición GET /api/users')

// Log fatal
logger.fatal('Error crítico en el sistema')

// Log HTTP
logger.http('GET /api/users 200')
```

El logger puede ser importado y utilizado en:
- Controladores
- Servicios
- Repositories
- Middleware
- Archivos de configuración

---

# Arquitectura implementada

```text
Application
  ↓

Logger (Winston)
  ↓

Console Transport
  ↓

File Transport
  ↓

./logs/test_con_winston.log
```

Esta arquitectura permite:
- Centralizar toda la lógica de logging
- Configurar múltiples destinos de logs
- Mantener consistencia en el formato de logs
- Facilitar el debugging y monitoreo
- Escalar a servicios externos de logging (Sentry, Loggly, etc.)

---

# Resumen de la clase

Durante la clase 4 incorporamos un sistema profesional de logging y monitoreo para ShipNow.

Se implementó:

✔ Winston como librería de logging

✔ niveles personalizados de log (fatal, error, warning, info, http, debug)

✔ configuración de transporte a consola

✔ configuración de transporte a archivo

✔ formato de logs con timestamp

✔ configuración dinámica según entorno (desarrollo/producción)

✔ carpeta dedicada para almacenar logs


Este mecanismo permite monitorear la aplicación, rastrear errores, facilitar el debugging y mantener registros históricos de operaciones.  

&nbsp;
##
##
&nbsp;  
&nbsp;  
&nbsp;
&nbsp; 
&nbsp;


## Funcionamiento base de la API

ShipNow API es una aplicación backend construida con Node.js, Express y MongoDB.

En su estado base, la API permite trabajar con tres entidades principales:

* Usuarios
* Comercios
* Pedidos

La idea del proyecto es simular una API simple de logística/envíos.

Un usuario puede representar a un cliente.
Un comercio representa el lugar desde donde sale el pedido.
Un pedido representa una solicitud de envío asociada a un usuario y a un comercio.

### Flujo principal

El flujo básico de la API es:

1. Crear un usuario.
2. Crear un comercio.
3. Crear un pedido usando el ID del usuario y el ID del comercio.
4. Consultar los pedidos.
5. Actualizar el estado de un pedido.

El pedido contiene una lista de items, una dirección de entrega, un total calculado y un estado.

### Entidades principales

### User

Representa a un usuario dentro del sistema.

Campos principales:

```json
{
  "firstName": "Martina",
  "lastName": "Gómez",
  "email": "martina@test.com",
  "password": "123456",
  "role": "customer"
}
```

Roles disponibles:

```txt
admin
customer
store
```

En esta versión base, el usuario se usa principalmente como cliente del pedido.

---

### Store

Representa un comercio.

Campos principales:

```json
{
  "name": "Kiosco Centro",
  "address": "Av. Siempre Viva 742",
  "owner": "ID_DEL_USUARIO"
}
```

El campo `owner` guarda el ID de un usuario asociado al comercio.

---

### Order

Representa un pedido o envío.

Campos principales:

```json
{
  "customer": "ID_DEL_USUARIO",
  "store": "ID_DEL_COMERCIO",
  "deliveryAddress": "Av. Siempre Viva 742",
  "items": [
    {
      "name": "Caja mediana",
      "quantity": 2,
      "price": 1500
    }
  ]
}
```

Cuando se crea un pedido, la API calcula el total automáticamente recorriendo los items.

Ejemplo:

```txt
2 unidades x $1500 = $3000
```

El pedido se crea inicialmente con estado:

```txt
created
```

Estados posibles del pedido:

```txt
created
assigned
picked_up
in_transit
delivered
cancelled
```

### Endpoints disponibles

### Health check

Permite verificar que la API está funcionando.

```http
GET /health
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "API funcionando correctamente"
}
```

---

## Users

### Obtener usuarios

```http
GET /api/users
```

### Obtener usuario por ID

```http
GET /api/users/:uid
```

### Crear usuario

```http
POST /api/users
```

Body de ejemplo:

```json
{
  "firstName": "Martina",
  "lastName": "Gómez",
  "email": "martina@test.com",
  "password": "123456",
  "role": "customer"
}
```

### Actualizar usuario

```http
PUT /api/users/:uid
```

### Eliminar usuario

```http
DELETE /api/users/:uid
```

---

## Stores

### Obtener comercios

```http
GET /api/stores
```

### Obtener comercio por ID

```http
GET /api/stores/:sid
```

### Crear comercio

```http
POST /api/stores
```

Body de ejemplo:

```json
{
  "name": "Kiosco Centro",
  "address": "Av. Siempre Viva 742",
  "owner": "ID_DEL_USUARIO"
}
```

### Actualizar comercio

```http
PUT /api/stores/:sid
```

### Eliminar comercio

```http
DELETE /api/stores/:sid
```

---

## Orders

### Obtener pedidos

```http
GET /api/orders
```

### Obtener pedido por ID

```http
GET /api/orders/:oid
```

### Crear pedido

```http
POST /api/orders
```

Body de ejemplo:

```json
{
  "customer": "ID_DEL_USUARIO",
  "store": "ID_DEL_COMERCIO",
  "deliveryAddress": "Av. Siempre Viva 742",
  "items": [
    {
      "name": "Caja mediana",
      "quantity": 2,
      "price": 1500
    },
    {
      "name": "Sobre chico",
      "quantity": 1,
      "price": 800
    }
  ]
}
```

Respuesta esperada:

```json
{
  "status": "success",
  "payload": {
    "_id": "ID_DEL_PEDIDO",
    "customer": "ID_DEL_USUARIO",
    "store": "ID_DEL_COMERCIO",
    "items": [
      {
        "name": "Caja mediana",
        "quantity": 2,
        "price": 1500
      },
      {
        "name": "Sobre chico",
        "quantity": 1,
        "price": 800
      }
    ],
    "deliveryAddress": "Av. Siempre Viva 742",
    "total": 3800,
    "status": "created"
  }
}
```

### Actualizar estado del pedido

```http
PUT /api/orders/:oid/status
```

Body de ejemplo:

```json
{
  "status": "in_transit"
}
```

### Eliminar pedido

```http
DELETE /api/orders/:oid
```

---

## Formato general de respuestas

Las respuestas exitosas siguen una estructura simple:

```json
{
  "status": "success",
  "payload": {}
}
```

Las respuestas de error, en esta versión base, todavía se manejan de forma simple desde las rutas:

```json
{
  "status": "error",
  "message": "Usuario no encontrado"
}
```

Más adelante, el proyecto será refactorizado para incorporar una capa centralizada de manejo de errores.

## Estado actual del proyecto

Esta versión base de ShipNow funciona, pero todavía no representa una API completamente profesional.

Actualmente el proyecto tiene:

```txt
app.js
server.js
models
routes
controllers
services
repositories
config/db.js
config/env.js
```

Todavía no incorpora:

```txt
middleware global de errores
Swagger
tests automatizados
Multer
Docker
```

Durante el curso, la API será mejorada progresivamente para separar responsabilidades, mejorar la mantenibilidad y acercarse a una estructura más profesional.

Clase 1:
```txt 
-> Mejoramos la arquitectura añadiendo "controllers", "services" y "repositories" para separar responsabilidades.

-> Añadimos el archivo ./config/env.js para centralizar la configuración de variables de entorno.
```

Clase 2:
```txt
-> Incorporamos sistema de Mocking con FakerJS para generar datos de prueba.

-> Añadimos endpoints de mocking para poblar la base de datos rápidamente.
```

Clase 4:
```txt
-> Implementamos sistema profesional de Logging con Winston.

-> Añadimos monitoreo de la aplicación para rastrear errores y eventos.

-> Configuramos niveles de log (fatal, error, warning, info, http, debug).

-> Implementamos transporte de logs a archivos y consola.
```
