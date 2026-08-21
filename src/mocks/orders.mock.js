import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants/orderstatus.js";

export const generateMockOrder = (customerId, storeId) => {

    const items = [
        {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 5 }),
            price: faker.number.int({ min: 1000, max: 5000 })
        }
    ];

    const total = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

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

    // Si no recibimos customers, generamos IDs ficticios
    if (!customers) {
        customers = Array.from(
            { length: quantity },
            () => ({
                _id: new mongoose.Types.ObjectId()
            })
        );
    }

    // Si no recibimos stores, generamos IDs ficticios
    if (!stores) {
        stores = Array.from(
            { length: quantity },
            () => ({
                _id: new mongoose.Types.ObjectId()
            })
        );
    }

    const orders = [];

    for (let i = 0; i < quantity; i++) {

        const customer = faker.helpers.arrayElement(customers);
        const store = faker.helpers.arrayElement(stores);

        orders.push(
            generateMockOrder(
                customer._id,
                store._id
            )
        );
    }

    return orders;
};