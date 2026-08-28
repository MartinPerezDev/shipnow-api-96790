import { usersService } from "../services/users.service.js";
import { successResponse } from "../utils/apiResponse.js";
import fs from "fs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();
    // console.log("Usuarios obtenidos:", users);
    successResponse(res, { message: "Lista de usuarios", payload: users });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.uid);
    successResponse(res, { message: "Obtener usuario por id", payload: user });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await usersService.createUser(req.body);
    console.log("Usuario creado:", user);
    successResponse(res, { statusCode: 201, message: "Usuario creado", payload: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await usersService.updateUser(req.params.uid, req.body);
    successResponse(res, { message: "Usuario actualizado", payload: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await usersService.deleteUser(req.params.uid);
    successResponse(res, { message: "Usuario eliminado", payload: user });
  } catch (error) {
    next(error);
  }
};

export const uploadUserDocument = async(req, res, next) => {
  try {
    const { uid } = req.params;
    const { type } = req.body;
    const file = req.file;

    const user = await usersService.addDocument(uid, file, type)

    return successResponse(res, {
      message: "Archivo agregado correctamente",
      payload: user
    })
  } catch (error) {
    if(req.file){
      await fs.promises.unlink(req.file.path);
    }
    next(error);
  }
}