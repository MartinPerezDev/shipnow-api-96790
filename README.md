# ShipNow API

API REST para gestionar usuarios, tiendas y pedidos de una plataforma simple de logistica de envios.

Esta version documenta las actualizaciones aplicadas en la clase 3: normalizacion de respuestas y manejo centralizado de errores.

## Objetivo de la clase 3

Antes de esta actualizacion, cada controller armaba sus respuestas manualmente. Eso generaba repeticion y hacia que muchos errores esperados terminaran respondiendo como `500 Internal Server Error`.

El objetivo fue ordenar ese flujo para que:

- Las respuestas exitosas tengan siempre la misma estructura.
- Los errores se creen de forma consistente.
- Los controllers deleguen los errores con `next(error)`.
- Express tenga un middleware global para responder errores.
- Las rutas inexistentes tambien usen el mismo formato de error.

## Archivos incorporados

```txt
src/utils/apiResponse.js
src/utils/errorDictionary.js
src/middlewares/errorHandler.js
src/middlewares/notFoundHandler.js
```

## Respuestas normalizadas

Se creo `src/utils/apiResponse.js` para centralizar la forma de responder.

### Respuesta exitosa

```json
{
  "status": "success",
  "message": "Usuario creado correctamente",
  "payload": {}
}
```

Los controllers usan:

```js
successResponse(res, {
  statusCode: 201,
  message: "Usuario agregado correctamente",
  payload: user
});
```

### Respuesta de error

```json
{
  "status": "error",
  "error": "USER_NOT_FOUND",
  "message": "Usuario no encontrado"
}
```

Los errores se responden desde el middleware global, no desde cada controller.

## Diccionario de errores

Se creo `src/utils/errorDictionary.js` para centralizar los errores conocidos de la API.

Ejemplos:

```js
USER_NOT_FOUND: {
  statusCode: 404,
  message: "Usuario no encontrado"
}
```

```js
ORDER_ITEMS_REQUIRED: {
  statusCode: 400,
  message: "El pedido debe incluir al menos un item"
}
```

Esto permite que los services lancen errores usando codigos claros:

```js
throw createError("USER_NOT_FOUND");
```

## Creacion de errores

Tambien se agrego `createError` dentro de `src/utils/apiResponse.js`.

Su responsabilidad es:

- Buscar el error en el diccionario.
- Crear un `Error`.
- Agregarle `statusCode`.
- Agregarle un `code`.

Ejemplo de uso:

```js
if (!user) {
  throw createError("USER_NOT_FOUND");
}
```

De esta forma evitamos repetir:

```js
const error = new Error("Usuario no encontrado");
error.statusCode = 404;
throw error;
```

## Controllers actualizados

Los controllers ahora usan `successResponse` para respuestas correctas y `next(error)` para delegar errores.

Ejemplo:

```js
export const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.uid);

    return successResponse(res, {
      message: "Obtener usuario por id",
      payload: user
    });
  } catch (error) {
    next(error);
  }
};
```

Con este cambio, el controller deja de decidir como se responde un error. Solo lo envia al middleware correspondiente.

## Middleware global de errores

Se creo `src/middlewares/errorHandler.js`.

Este middleware recibe cualquier error que llegue por `next(error)` y responde con el formato definido por `errorResponse`.

Tambien contempla IDs invalidos de MongoDB:

```js
if (error.name === "CastError") {
  handledError = createError("VALIDATION_ERROR", "ID invalido");
}
```

Esto evita que un ObjectId mal formado devuelva una respuesta interna de Mongoose.

## Middleware de rutas inexistentes

Se creo `src/middlewares/notFoundHandler.js`.

Su funcion es transformar cualquier ruta no encontrada en un error controlado:

```js
next(createError("ROUTE_NOT_FOUND"));
```

Respuesta esperada:

```json
{
  "status": "error",
  "error": "ROUTE_NOT_FOUND",
  "message": "Ruta no encontrada"
}
```

## Registro en app.js

Los middlewares de error se registran al final de `src/app.js`.

```js
app.use("/api/users", usersRouter);
app.use("/api/stores", storesRouter);
app.use("/api/orders", ordersRouter);

if (!envConfig.isProd) {
  app.use("/api/mocks", mocksRouter);
}

app.use(notFoundHandler);
app.use(errorHandler);
```

El orden es importante:

1. Primero se registran las rutas reales.
2. Luego se captura cualquier ruta inexistente.
3. Al final se responde cualquier error centralizado.

## Validacion agregada en Orders

En `orders.service.js` se agrego una validacion antes de calcular el total del pedido.

Antes, si `items` no era un array, el `reduce` podia romper con un error interno.

Ahora se valida:

```js
if (!Array.isArray(items) || items.length === 0) {
  throw createError("ORDER_ITEMS_REQUIRED");
}
```

Esto transforma un error tecnico en una respuesta clara para el cliente:

```json
{
  "status": "error",
  "error": "ORDER_ITEMS_REQUIRED",
  "message": "El pedido debe incluir al menos un item"
}
```

## Variables de entorno

Se agrego `isProd` dentro de `envConfig` para evitar consultar `process.env.NODE_ENV` directamente desde `app.js`.

```js
isProd: process.env.NODE_ENV === "production"
```

Esto mantiene la configuracion centralizada en `src/config/env.js`.

## Resumen

En esta clase se mejoro la estructura general de la API sin agregar librerias externas.

Se implemento:

- Helper para respuestas exitosas.
- Helper para respuestas de error.
- Diccionario centralizado de errores.
- Funcion `createError`.
- Middleware global de errores.
- Middleware para rutas inexistentes.
- Refactor de controllers para usar `next(error)`.
- Validacion de `items` en pedidos.
- Uso de `envConfig.isProd` en `app.js`.

La API queda mas consistente, mas facil de mantener y preparada para seguir creciendo con nuevas validaciones.
