import { Router } from "express";
import { getStores, getStoreById, createStore, updateStore, deleteStore } from "../controllers/stores.controller.js";


const router = Router();

/**
 * @swagger
 * /api/stores:
 *  get:
 *    summary: Obtener todas las tiendas
 *    description: Devuelve el listado completo de tiendas disponibles
 *    tags:
 *      - Stores
 *    responses:
 *      200:
 *        description: Lista de tiendas
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StoresResponse"
 */
router.get("/", getStores);

/**
 * @swagger
 * /api/stores/{sid}:
 *  get:
 *    summary: Obtener una tienda por ID
 *    description: Devuelve una tienda especifica a traves de su ID
 *    tags:
 *      - Stores
 *    parameters:
 *      - in: path
 *        name: sid
 *        required: true
 *        description: ID de la tienda
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    responses:
 *      200:
 *        description: Obtener tienda por id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StoreResponse"
 *      404:
 *        description: Tienda no encontrada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/:sid", getStoreById);

/**
 * @swagger
 * /api/stores:
 *  post:
 *    summary: Crear una tienda
 *    description: Crea una tienda con los datos solicitados
 *    tags:
 *      - Stores
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/StoreInput"
 *    responses:
 *      201:
 *        description: Tienda agregada correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StoreResponse"
 *      400:
 *        description: Datos invalidos o rol invalido
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 *      404:
 *        description: Usuario no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/", createStore);

/**
 * @swagger
 * /api/stores/{sid}:
 *  put:
 *    summary: Actualizar una tienda
 *    description: Actualiza una tienda por ID
 *    tags:
 *      - Stores
 *    parameters:
 *      - in: path
 *        name: sid
 *        required: true
 *        description: ID de la tienda
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/StoreInput"
 *    responses:
 *      200:
 *        description: Tienda actualizada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StoreResponse"
 *      404:
 *        description: Tienda no encontrada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.put("/:sid", updateStore);

/**
 * @swagger
 * /api/stores/{sid}:
 *  delete:
 *    summary: Eliminar una tienda
 *    description: Elimina una tienda por ID
 *    tags:
 *      - Stores
 *    parameters:
 *      - in: path
 *        name: sid
 *        required: true
 *        description: ID de la tienda
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    responses:
 *      200:
 *        description: Tienda eliminada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/StoreResponse"
 *      404:
 *        description: Tienda no encontrada
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.delete("/:sid", deleteStore);

export default router;
