import { ordersRepository } from "../repositories/orders.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { storesRepository } from "../repositories/stores.repository.js";
import { ORDER_STATUS } from "../constants/orderstatus.js";
import { ORDER_PRIORITY } from "../constants/priority.js";
import { createError } from "../utils/apiResponse.js";

export const ordersService = {
  getOrders: async () => {
    return ordersRepository.findAll();
  },

  getOrderById: async (id) => {
    const order = await ordersRepository.findById(id);
    if (!order) {
      throw createError("ORDER_NOT_FOUND");
    }

    return order;
  },

  createOrder: async (orderData) => {
    const { customer, store, items, deliveryAddress, priority } = orderData;

    if (!customer || !store || !items || !deliveryAddress) {
      throw createError("VALIDATION_ERROR");
    }

    const userFound = await usersRepository.findById(customer);
    if (!userFound) {
      throw createError("USER_NOT_FOUND");
    }

    const storeFound = await storesRepository.findById(store)
    if (!storeFound) {
      throw createError("STORE_NOT_FOUND");
    }

    if (!Array.isArray(items) || items.length === 0) {
      throw createError("ORDER_ITEMS_REQUIRED");
    }

    const total = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

    const newOrder = {
      ...orderData,
      total,
      status: ORDER_STATUS.CREATED,
      priority: Object.values(ORDER_PRIORITY).includes(priority) ? priority : ORDER_PRIORITY.NORMAL
    };

    return ordersRepository.create(newOrder);
  },

  updateOrderStatus: async (id, status) => {
    if (!Object.values(ORDER_STATUS).includes(status)) {
      throw createError("INVALID_ORDER_STATUS");
    }

    const order = await ordersRepository.updateStatus(id, status);
    if (!order) {
      throw createError("ORDER_NOT_FOUND");
    }

    return order;
  },

  deleteOrder: async (id) => {
    const order = await ordersRepository.delete(id);
    if (!order) {
      throw createError("ORDER_NOT_FOUND");
    }

    return order;
  }
};