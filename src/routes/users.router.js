import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Obtener todos los usuarios
 *    description: Devuelve el listado completo de usuarios disponibles
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: Lista de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UsersResponse"
 */
router.get("/", getUsers);
/**
 * @swagger
 * /api/users/{uid}:
 *  get:
 *    summary: Obtener un usuario por ID
 *    description: Devuelve un usuario especifico a traves de su ID
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: ID del usuario
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    responses:
 *      200:
 *        description: Obtener usuario por id
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserResponse"
 *      404:
 *        description: Usuario no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.get("/:uid", getUserById);

router.post("/", createUser);
/**
 * @swagger
 * /api/users/{uid}:
 *  put:
 *    summary: Actualizar un usuario
 *    description: Actualiza un usuario por ID
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: ID del usuario
 *        schema:
 *          type: string
 *        example: 6a46646de068d46fc6bbda5a
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/UserInput"
 *    responses:
 *      200:
 *        description: Usuario actualizado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserResponse"
 *      404:
 *        description: Usuario no encontrado
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.put("/:uid", updateUser);

router.delete("/:uid", deleteUser);

export default router;
