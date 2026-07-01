import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants/orderstatus.js";

export const generateMockOrder = (customerId, storeId) => {

   const items = [{
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      price: faker.number.int({ min: 1000, max: 5000 })
   }];

   const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

   return {
      customer: customerId,
      store: storeId,
      items,
      deliveryAddress: faker.location.streetAddress(),
      total,
      status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
      priority: faker.helpers.arrayElement(["low", "normal", "high"])
   };

};

export const generateMockOrders = (quantity, customers, stores) => {

   const orders = [];

   for(let i=0; i<quantity; i++){

      const customerId = new mongoose.Types.ObjectId();
      const storeId = new mongoose.Types.ObjectId();

      orders.push(
         generateMockOrder(
            customerId,
            storeId
         )
      );

   }

   return orders;

};

