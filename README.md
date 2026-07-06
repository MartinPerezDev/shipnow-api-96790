# Endpoint `POST /api/mocks/generateData`

Este endpoint permite generar e insertar grandes cantidades de datos falsos en MongoDB utilizando Faker.

A diferencia de:

- `GET /api/mocks/mockingusers`
- `GET /api/mocks/mockingorders`

el endpoint:

```http
POST /api/mocks/generateData
```

sí persiste información en la base de datos.

Este endpoint fue completado luego de la clase para automatizar la creación de:

- Users
- Stores
- Orders

manteniendo las relaciones reales entre las entidades.

---

# Objetivo

Poder poblar rápidamente la base de datos para:

- desarrollo
- pruebas manuales
- testing
- simulación de escenarios reales

sin necesidad de crear documentos manualmente desde Postman.

---

# Arquitectura utilizada

La implementación respeta la arquitectura utilizada durante todo el proyecto.

```text
MongoDB
   ↓
Repository
   ↓
Controller
   ↓
Router
   ↓
Express
```

---

# Archivos involucrados

```text
src/

controllers/
└── mocks.controller.js

mocks/
├── users.mocks.js
├── stores.mocks.js
└── orders.mocks.js

repositories/
├── users.repository.js
├── store.repository.js
└── orders.repository.js

routes/
└── mocks.router.js
```

---

# Paso 1 - Crear repository de Stores

## Archivo

```text
src/repositories/store.repository.js
```

Este repository se encarga de insertar múltiples stores en MongoDB.

```javascript
import StoreModel from "../models/store.model.js";

export const insertManyStores = async (stores) => {

   return await StoreModel.insertMany(stores);

};
```

---

# Paso 2 - Crear generador de Stores

## Archivo

```text
src/mocks/stores.mocks.js
```

El endpoint `/generateData` requiere stores reales para poder asociarlos posteriormente a las órdenes.

```javascript
import { faker } from "@faker-js/faker";

export const generateMockStore = (ownerId) => {

   return {

      name: faker.company.name(),

      email: faker.internet.email(),

      address: faker.location.streetAddress(),

      owner: ownerId

   };

};
```

Generar múltiples stores:

```javascript
export const generateMockStores = (quantity, users) => {

   return Array.from(

      { length: quantity },

      () => {

         const randomUser = users[
            Math.floor(Math.random() * users.length)
         ];

         return generateMockStore(
            randomUser._id
         );

      }

   );

};
```

---

# Paso 3 - Adaptar orders.mocks.js

## Archivo

```text
src/mocks/orders.mocks.js
```

Las órdenes necesitan conocer:

- quién realizó el pedido
- qué store recibirá el pedido

Por ello el generador recibe:

```javascript
(customerId, storeId)
```

```javascript
import { faker } from "@faker-js/faker";

import { ORDER_STATUS } from "../constants/orderStatus.js";

import { DELIVERY_PRIORITY } from "../constants/deliveryPriority.js";


export const generateMockOrder = (customerId, storeId) => {

   const items = [

      {

         name: faker.commerce.productName(),

         quantity: faker.number.int({

            min:1,

            max:10

         }),

         price: faker.number.int({

            min:1000,

            max:10000

         })

      }

   ];

   const total = items.reduce(

      (acc,item) => acc + item.quantity * item.price,

      0

   );

   return {

      customer: customerId,

      store: storeId,

      items,

      deliveryAddress:

         faker.location.streetAddress(),

      total,

      status:

         ORDER_STATUS.CREATED,

      priority:

         DELIVERY_PRIORITY.NORMAL

   };

};
```

---

# Paso 4 - Implementar generateData()

## Archivo

```text
src/controllers/mocks.controller.js
```

Este controlador es el encargado de:

- validar datos
- generar usuarios
- insertar usuarios
- generar stores
- insertar stores
- generar órdenes
- insertar órdenes
- responder al cliente

---

Obtener cantidades:

```javascript
const {

   users = 0,

   stores = 0,

   orders = 0

} = req.body;
```

---

Generar usuarios:

```javascript
const mockUsers =

   generateMockUsers(users);


const generatedUsers =

   await insertManyUsers(

      mockUsers

   );
```

---

Generar stores:

```javascript
const mockStores =

   generateMockStores(

      stores,

      generatedUsers

   );


const generatedStores =

   await insertManyStores(

      mockStores

   );
```

---

Generar órdenes relacionadas:

```javascript
const mockOrders = Array.from(

   { length: orders },

   () => {

      const randomUser =

         generatedUsers[

            Math.floor(

               Math.random()

               *

               generatedUsers.length

            )

         ];


      const randomStore =

         generatedStores[

            Math.floor(

               Math.random()

               *

               generatedStores.length

            )

         ];


      return generateMockOrder(

         randomUser._id,

         randomStore._id

      );

   }

);
```

---

Insertar órdenes:

```javascript
const generatedOrders =

   await insertManyOrders(

      mockOrders

   );
```

---

Responder al cliente:

```javascript
return res.status(201).json({

   status:"success",

   message:

      "Data generated successfully",

   users: generatedUsers,

   orders: generatedOrders

});
```

---

# Paso 5 - Registrar endpoint

## Archivo

```text
src/routes/mocks.router.js
```

```javascript
router.post(

   "/generateData",

   generateData

);
```

---

# Paso 6 - Probar desde Postman

Método:

```http
POST
```

URL:

```text
http://localhost:8080/api/mocks/generateData
```

Body:

```json
{
   "users":20,
   "stores":5,
   "orders":50
}
```

---

Respuesta esperada:

```json
{
   "status":"success",

   "message":"Data generated successfully",

   "users":[...],

   "orders":[...]
}
```

Además de la respuesta en Postman, los documentos quedan almacenados en MongoDB.

---

# Constantes utilizadas

## USER_ROLES

```javascript
export const USER_ROLES = {

   ADMIN:'admin',

   CUSTOMER:'customer',

   DRIVER:'driver',

   STORE:'store'

};
```

Para esta implementación solamente se generan usuarios con rol:

```javascript
USER_ROLES.CUSTOMER
```

---

## ORDER_STATUS

```javascript
export const ORDER_STATUS = {

   CREATED:'created',

   ASSIGNED:'assigned',

   DELIVERED:'delivered',

   CANCELLED:'cancelled'

};
```

En esta versión del mock todas las órdenes se crean inicialmente con:

```javascript
ORDER_STATUS.CREATED
```

---

## DELIVERY_PRIORITY

```javascript
export const DELIVERY_PRIORITY = {

   LOW:'low',

   NORMAL:'normal',

   HIGH:'high'

};
```

Por simplicidad se utiliza:

```javascript
DELIVERY_PRIORITY.NORMAL
```

aunque podría seleccionarse aleatoriamente en futuras mejoras.

---

# Errores comunes

### Order validation failed

```text
total is required

customer is required

store is required

deliveryAddress is required
```

Este error suele aparecer cuando el generador de órdenes no recibe correctamente:

```javascript
customerId
```

o

```javascript
storeId
```

La función correcta es:

```javascript
generateMockOrder(

   randomUser._id,

   randomStore._id

);
```

---

### Cannot read properties of undefined (reading '_id')

Este error aparece cuando:

```javascript
generatedUsers
```

o

```javascript
generatedStores
```

están vacíos.

Es recomendable verificar:

```javascript
console.log(generatedUsers.length);

console.log(generatedStores.length);
```

antes de generar las órdenes.

---

### Store validation failed

```text
owner is required
```

El modelo Store requiere:

```javascript
owner
```

por lo tanto el mock debe incluir:

```javascript
owner: ownerId
```

---

# Resultado final

El endpoint `/generateData` quedó funcionando correctamente.

Actualmente permite:

✅ Generar usuarios

✅ Generar stores

✅ Generar pedidos

✅ Relacionar Orders con Users

✅ Relacionar Orders con Stores

✅ Insertar todo en MongoDB

✅ Poblar rápidamente la base de datos

✅ Preparar el proyecto para futuras pruebas y testing

<br><br>

---

<br><br>


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
config/db.js
```

Todavía no incorpora:

```txt
controllers
services
repositories
middleware global de errores
logger profesional
Swagger
tests automatizados
Multer
Docker
```

Durante el curso, la API será mejorada progresivamente para separar responsabilidades, mejorar la mantenibilidad y acercarse a una estructura más profesional.
