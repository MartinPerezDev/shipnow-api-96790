# Módulo 2 - Mocking y Datos de Prueba

## Objetivo del módulo

En esta unidad incorporamos **Mocking** dentro del proyecto **ShipNow**.

El objetivo es generar información simulada pero consistente para poder probar el comportamiento de la API sin depender de datos cargados manualmente en MongoDB.

Trabajar con datos mock nos permite:

- Poblar rápidamente la base de datos.
- Simular escenarios reales.
- Validar endpoints existentes.
- Facilitar tareas de testing.
- Compartir un entorno de prueba similar entre todos los desarrolladores.
- Evitar la carga manual de información repetitiva.

---

# ¿Qué es Mocking?

Mocking consiste en generar datos falsos pero con una estructura compatible con los modelos reales del proyecto.

Por ejemplo:

Un usuario mock:

```json
{
  "firstName": "Martina",
  "lastName": "Gómez",
  "email": "martina@test.com",
  "role": "customer"
}
```

Un pedido mock:

```json
{
  "customer": "687ab...",
  "status": "created",
  "priority": "high"
}
```

Una tienda mock:

```json
{
  "name": "Store Demo",
  "owner": "687ac..."
}
```

Estos datos son ficticios.

No representan clientes reales.

Su objetivo es permitir probar funcionalidades, endpoints y relaciones entre entidades durante el desarrollo.

---

# Librerías incorporadas

Instalamos FakerJS para generar información aleatoria.

```bash
npm install @faker-js/faker
```

Instalamos bcryptjs para generar contraseñas compatibles con el sistema de autenticación.

```bash
npm install bcryptjs
```

---

# Endpoints incorporados

Durante este módulo agregamos un router específico para mocking.

Base URL:

```text
/api/mocks
```

Endpoints disponibles:

```http
GET /api/mocks/mockingusers
```

Genera usuarios falsos.

No guarda información en MongoDB.

---

```http
GET /api/mocks/mockingorders
```

Genera pedidos falsos.

No guarda información en MongoDB.

---

```http
POST /api/mocks/generateData
```

Genera usuarios, tiendas y pedidos falsos e inserta la información en MongoDB.

Ejemplo:

```json
{
  "users": 20,
  "stores": 5,
  "orders": 50
}
```

Respuesta:

```json
{
  "status": "success",
  "payload": {
    "users": 20,
    "stores": 12,
    "orders": 50
  }
}
```

---

# Integración en app.js

Se agregó la siguiente configuración:

```js
if(process.env.NODE_ENV !== 'production'){
   app.use('/api/mocks', mocksRouter)
}
```

## ¿Qué función cumple?

Evita exponer endpoints de prueba en producción.

De esta forma, el router de mocking solamente estará disponible durante el desarrollo.

Esto impide que un usuario externo pueda insertar información falsa dentro de la base de datos productiva.

---

# Router de Mocking

Archivo:

```text
src/routes/mocks.router.js
```

Se agregaron tres endpoints.

### GET /mockingusers

```js
router.get('/mockingusers', async (req, res) => {

   const users = await generateMockUser()

   res.status(200).json({
      status:'success',
      payload:users
   })

})
```

Genera usuarios falsos utilizando FakerJS.

No realiza inserciones en MongoDB.

Simplemente devuelve información simulada.

---

### GET /mockingorders

```js
router.get('/mockingorders',(req,res)=>{

   const orders = generateMockOrders(5)

   res.status(200).json({
      status:'success',
      payload:orders
   })

})
```

Genera pedidos falsos.

Los pedidos contienen:

- Cliente
- Tienda
- Productos
- Dirección
- Total
- Estado
- Prioridad

No modifica la base de datos.

---

### POST /generateData

```js
router.post('/generateData', generateData)
```

Delega toda la lógica al controlador.

El router únicamente recibe la petición y redirige la ejecución.

La generación de datos y la persistencia quedan encapsuladas dentro del controller.

---

# Carpeta mocks

Se creó una carpeta dedicada a la generación de información simulada.

```text
src/mocks/
```

Estructura:

```text
users.mock.js
stores.mock.js
orders.mock.js
```

Esta separación permite mantener organizada la lógica de generación de datos.

---

# users.mock.js

Responsable de generar usuarios falsos.

Se utiliza FakerJS para crear:

- nombres
- apellidos
- correos electrónicos

También se utiliza bcryptjs para generar una contraseña hasheada.

```js
const password = await bcrypt.hash("coder123",10)
```

De esta forma, los usuarios generados se comportan igual que los usuarios reales del sistema.

Ejemplo generado:

```json
{
  "firstName": "Lucas",
  "lastName": "Fernandez",
  "email": "lucas@test.com",
  "password": "$2b$10$...",
  "role": "customer"
}
```

Los roles se seleccionan aleatoriamente utilizando:

```js
faker.helpers.arrayElement(availableRoles)
```

Roles posibles:

```js
CUSTOMER
STORE
```

La función:

```js
generateMockUsers(quantity)
```

permite generar múltiples usuarios de manera automática.

---

# stores.mock.js

Responsable de generar tiendas falsas.

Cada tienda se encuentra asociada a un propietario.

```js
return {

   name: faker.company.name(),

   address: faker.location.streetAddress(),

   owner: ownerId,

   isActive: faker.datatype.boolean()

}
```

Cada Store creada queda vinculada con un usuario existente.

Esto permite respetar las relaciones entre entidades.

---

# orders.mock.js

Responsable de generar pedidos falsos.

Cada pedido contiene:

- customer
- store
- items
- deliveryAddress
- total
- status
- priority

Los productos se generan utilizando FakerJS.

```js
name: faker.commerce.productName()
```

La cantidad y precio son aleatorios.

```js
quantity: faker.number.int()

price: faker.number.int()
```

El total se calcula automáticamente.

```js
const total = items.reduce(
   (acc,item)=>acc + item.price * item.quantity,
   0
)
```

El estado del pedido se selecciona aleatoriamente utilizando las constantes del proyecto.

```js
faker.helpers.arrayElement(
   Object.values(ORDER_STATUS)
)
```

Estados posibles:

```text
created
assigned
picked_up
in_transit
delivered
cancelled
```

La prioridad también se genera aleatoriamente.

```js
low
normal
high
```

---

# Controller de Mocking

Archivo:

```text
src/controllers/mocks.controller.js
```

Este controlador contiene la lógica principal del endpoint:

```http
POST /api/mocks/generateData
```

Proceso completo:

### 1. Leer cantidades recibidas

```js
const {
   users = 10,
   stores = 5,
   orders = 20
} = req.body
```

---

### 2. Generar usuarios

```js
const mockUsers =
await generateMockUsers(users)
```

---

### 3. Insertar usuarios

```js
const createdUsers =
await ordersRepository.insertManyUsers(
   mockUsers
)
```

---

### 4. Obtener propietarios

```js
const owners =
createdUsers.filter(
   user => user.role === USER_ROLES.STORE
)
```

---

### 5. Obtener clientes

```js
const customers =
createdUsers.filter(
   user => user.role === USER_ROLES.CUSTOMER
)
```

---

### 6. Generar tiendas

```js
const mockStores =
generateMockStores(
   owners
)
```

---

### 7. Insertar tiendas

```js
const createdStores =
await ordersRepository.insertManyStores(
   mockStores
)
```

---

### 8. Generar pedidos

```js
const mockOrders =
generateMockOrders(
   orders,
   customers,
   createdStores
)
```

---

### 9. Insertar pedidos

```js
const createdOrders =
await ordersRepository.insertManyOrders(
   mockOrders
)
```

---

### 10. Responder al cliente

```js
res.status(201).json({

   status:'success',

   payload:{

      users:createdUsers.length,

      stores:createdStores.length,

      orders:createdOrders.length

   }

})
```

---

# Arquitectura implementada

```text
Routes
  ↓

Controllers
  ↓

Mocks
  ↓

Repositories
  ↓

MongoDB
```

Esta organización mantiene una arquitectura desacoplada, escalable y preparada para testing.

El router no interactúa directamente con modelos de Mongoose.

Toda la persistencia se realiza mediante repositories.

---

# Resumen del módulo

Durante la clase 2 incorporamos un sistema completo de mocking para ShipNow.

Se implementó:

✔ FakerJS

✔ generación automática de usuarios

✔ generación automática de tiendas

✔ generación automática de pedidos

✔ endpoints de visualización

✔ endpoint de carga masiva

✔ persistencia mediante repositories

✔ protección de endpoints en producción


Este mecanismo permite acelerar el desarrollo, poblar rápidamente la base de datos y preparar el proyecto para futuras etapas de testing automatizado.  

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
logger profesional
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
