import { ordersService } from "../services/orders.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const getOrders = async (req, res, next) => {
  try {
    const orders = await ordersService.getOrders();

    return successResponse(res, {
      message: "Lista de pedidos",
      payload: orders
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderById(req.params.oid);

    return successResponse(res, {
      message: "Obtener pedido por id",
      payload: order
    });
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const order = await ordersService.createOrder(req.body);

    return successResponse(res, {
      statusCode: 201,
      message: "Pedido agregado correctamente",
      payload: order
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await ordersService.updateOrderStatus(req.params.oid, req.body.status);

    return successResponse(res, {
      message: "Pedido actualizado",
      payload: order
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await ordersService.deleteOrder(req.params.oid);

    return successResponse(res, {
      message: "Pedido eliminado",
      payload: order
    });
  } catch (error) {
    next(error);
  }
};