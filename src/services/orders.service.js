import { ordersRepository } from "../repositories/orders.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { storesRepository } from "../repositories/stores.repository.js";
import { ORDER_STATUS } from "../constants/orderstatus.js";
import { ORDER_PRIORITY } from "../constants/priority.js";

export const ordersService = {
  getOrders: async () => {
    return ordersRepository.findAll();
  },

  getOrderById: async (id) => {
    const order = await ordersRepository.findById(id);
    if (!order) {
      const error = new Error("Pedido no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return order;
  },

  createOrder: async (orderData) => {
    const { customer, store, items, deliveryAddress, priority } = orderData;

    if (!customer || !store || !items || !deliveryAddress) {
      const error = new Error("Faltan datos obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const userFound = await usersRepository.findById(customer);
    if (!userFound) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const storeFound = await storesRepository.findById(store)
    if (!storeFound) {
      const error = new Error("Tienda no encontrada");
      error.statusCode = 404;
      throw error;
    }

    const total = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

    const newOrder = {
      ...orderData,
      total,
      status: ORDER_STATUS.CREATED,
      priority: ORDER_PRIORITY.NORMAL
    };

    return ordersRepository.create(newOrder);
  },

  updateOrderStatus: async (id, status) => {
    //falta comprobar si el status contiene un valor valido

    const order = await ordersRepository.updateStatus(id, status);
    if (!order) {
      const error = new Error("Pedido no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return order;
  },

  deleteOrder: async (id) => {
    const order = await ordersRepository.delete(id);
    if (!order) {
      const error = new Error("Pedido no encontrado");
      error.statusCode = 404;
      throw error;
    }

    return order;
  }
};