import { Router } from "express";
import { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from "../controllers/orders.controller.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *  get:
 *    summary: Obtener todos los pedidos
 *    description: Devuelve el listado completo de pedidos disponibles
 *    tags:
 *      - Orders
 *    responses:
 *      200:
 *        description: Lista de pedidos
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/OrdersResponse"
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/{oid}:
 *  get:
 *    summary: Obtener un pedido por ID
 *    description: Devuelve un pedido especifico a traves de su ID
 *    tags:
 *      - Orders
 *    parameters:
 *      - in: path
 *        name: oid
 *        required: true
 *        description: ID del pedido
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    responses:
 *      200:
 *        description: Obtener pedido por id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/OrderResponse"
 *      404:
 *        description: Pedido no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/:oid", getOrderById);

/**
 * @swagger
 * /api/orders:
 *  post:
 *    summary: Crear un pedido
 *    description: Crea un pedido con los datos solicitados
 *    tags:
 *      - Orders
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/OrderInput"
 *    responses:
 *      201:
 *        description: Pedido agregado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/OrderResponse"
 *      400:
 *        description: Datos invalidos o pedido sin items
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 *      404:
 *        description: Usuario o tienda no encontrados
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/", createOrder);

/**
 * @swagger
 * /api/orders/{oid}/status:
 *  put:
 *    summary: Actualizar el estado de un pedido
 *    description: Actualiza el estado de un pedido por ID
 *    tags:
 *      - Orders
 *    parameters:
 *      - in: path
 *        name: oid
 *        required: true
 *        description: ID del pedido
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/OrderStatusInput"
 *    responses:
 *      200:
 *        description: Pedido actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/OrderResponse"
 *      400:
 *        description: Estado de orden invalido
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 *      404:
 *        description: Pedido no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.put("/:oid/status", updateOrderStatus);

/**
 * @swagger
 * /api/orders/{oid}:
 *  delete:
 *    summary: Eliminar un pedido
 *    description: Elimina un pedido por ID
 *    tags:
 *      - Orders
 *    parameters:
 *      - in: path
 *        name: oid
 *        required: true
 *        description: ID del pedido
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    responses:
 *      200:
 *        description: Pedido eliminado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/OrderResponse"
 *      404:
 *        description: Pedido no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.delete("/:oid", deleteOrder);

export default router;
