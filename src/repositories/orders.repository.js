import OrderModel from "../models/order.model.js";


export const insertManyOrders = async (orders) => {
    
    return await OrderModel.insertMany(orders);
}
