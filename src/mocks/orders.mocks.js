import { faker } from "@faker-js/faker";
import { ORDER_STATUS } from "../constansts/orderStatus.js";
import { DELIVERY_PRIORITY } from "../constansts/deliveryPriority.js";

export const generateMockOrder = (customerId, storeId) => {
    
    const items = [
        {
            name: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 10 }),
            price: faker.number.int({ min: 1000, max: 10000 }),

        }
    ]

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return {
        customer: customerId,
        store: storeId,
        items,
        deliveryAddress: faker.location.streetAddress(),
        total,
        status: ORDER_STATUS.CREATED,
        deliveryPriority: DELIVERY_PRIORITY.NORMAL,
    }

}

export const generateMockOrders = (qty, customerId) => {
    
    return Array.from({ length: qty }, () => generateMockOrder(customerId));

}

