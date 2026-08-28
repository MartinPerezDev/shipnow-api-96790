import { Router } from "express";
import UserModel from "../models/user.model.js";
import { getUsers, getUserById, createUser, updateUser, deleteUser, uploadUserDocument } from "../controllers/users.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/", getUsers);

router.get("/:uid", getUserById);

router.post("/", createUser);

router.put("/:uid", updateUser);

router.delete("/:uid", deleteUser);
/**
 * @swagger
 * /api/users/{uid}/documents:
 *  post:
 *    summary: Cargar un documento de usuario
 *    description: Recibe un archivo PDF y lo asocia al usuario indicado.
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: uid
 *        required: true
 *        description: ID del usuario al que se asociará el documento.
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - document
 *              - type
 *            properties:
 *              document:
 *                type: string
 *                format: binary
 *                description: Archivo PDF de hasta 5 MB.
 *              type:
 *                type: string
 *                example: user_document
 *                description: Tipo funcional del documento.
 *    responses:
 *      201:
 *        description: Documento agregado correctamente.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserResponse"
 *      400:
 *        description: Archivo faltante, tipo de archivo inválido, tamaño excedido o tipo de documento inválido.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 *      404:
 *        description: Usuario no encontrado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/ErrorResponse"
 */
router.post("/:uid/documents", upload.single("document"), uploadUserDocument);

export default router;
