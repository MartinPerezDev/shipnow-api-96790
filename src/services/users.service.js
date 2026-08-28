import { usersRepository } from "../repositories/users.repository.js";
import { USER_ROLES } from "../constants/userroles.js";
import { createError } from "../utils/apiResponse.js";
import { DOCUMENTS_TYPES } from "../constants/documentTypes.js";

export const usersService = {
  getUsers: async () => {
    return usersRepository.findAll();
  },

  getUserById: async (id) => {
    const user = await usersRepository.findById(id);
    if (!user) {
      throw createError("USER_NOT_FOUND");
    }

    return user;
  },

  createUser: async (userData) => {
    const { firstName, lastName, email, password, role } = userData;
    if (!firstName || !lastName || !email || !password) {
      throw createError("VALIDATION_ERROR");
    }

    if (role && !Object.values(USER_ROLES).includes(role)) {
      throw createError("INVALID_USER_ROLE");
    }

    return usersRepository.create(userData);
  },

  updateUser: async (id, updates) => {
    const user = await usersRepository.update(id, updates);
    if (!user) {
      throw createError("USER_NOT_FOUND");
    }

    return user;
  },

  deleteUser: async (id) => {
    const user = await usersRepository.delete(id);
    if (!user) {
      throw createError("USER_NOT_FOUND");
    }

    return user;
  },

  addDocument: async (id, file, type) => {
    if(!file){
      throw createError("FILE_REQUIRED");
    }

    if(!Object.values(DOCUMENTS_TYPES).includes(type)){
      throw createError("INVALID_DOCUMENT_TYPE")
    }

    const user = await usersRepository.findById(id);
    if(!user){
      throw createError("USER_NOT_FOUND")
    }

    const document = {
      originalName: file.originalname,
      fileName: file.filename,
      path: file.path,
      mimeType: file.mimetype,
      size: file.size,
      type
    }

    const documents = [...user.documents, document];

    return usersRepository.update(id, { documents })
  }
};