import { storesRepository } from "../repositories/stores.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { createError } from "../utils/apiResponse.js";

export const storesService = {
  getStores: async () => {
    return storesRepository.findAll();
  },

  getStoreById: async (id) => {
    const store = await storesRepository.findById(id);
    if (!store) {
      throw createError("STORE_NOT_FOUND");
    }

    return store;
  },

  createStore: async (storeData) => {
    const { name, address, owner } = storeData;

    if (!name || !address || !owner) {
      throw createError("VALIDATION_ERROR");
    }

    const user = await usersRepository.findById(owner);
    if (!user) {
      throw createError("USER_NOT_FOUND");
    }

    if (user.role !== "store") {
      throw createError("INVALID_USER_ROLE");
    }

    return storesRepository.create(storeData);
  },

  updateStore: async (id, updates) => {
    const store = await storesRepository.update(id, updates);
    if (!store) {
      throw createError("STORE_NOT_FOUND");
    }

    return store;
  },

  deleteStore: async (id) => {
    const store = await storesRepository.delete(id);
    if (!store) {
      throw createError("STORE_NOT_FOUND");
    }

    return store;
  }
};