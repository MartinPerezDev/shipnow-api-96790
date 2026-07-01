import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockStores } from "../mocks/stores.mock.js";
import { generateMockOrders } from "../mocks/orders.mock.js";
import { ordersRepository } from "../repositories/orders.repository.js";

import { USER_ROLES } from "../constants/userroles.js";

export const generateData = async (req, res) => {
  try {
    const { users = 10, stores = 5, orders = 20 } = req.body;

    const mockUsers = await generateMockUsers(users);
    const createdUsers = await ordersRepository.insertManyUsers(mockUsers);

    const owners = createdUsers.filter(user => user.role === USER_ROLES.STORE);
    const customers = createdUsers.filter(user => user.role === USER_ROLES.CUSTOMER);

    const mockStores = generateMockStores(owners);
    const createdStores = await ordersRepository.insertManyStores(mockStores);

    const mockOrders = generateMockOrders(orders, customers, createdStores);
    const createdOrders = await ordersRepository.insertManyOrders(mockOrders);

    res.status(201).json({
      status: 'success',
      payload: {
        users: createdUsers.length,
        stores: createdStores.length,
        orders: createdOrders.length
      }
    });

  } catch (error) {
    console.error('Error generating data:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
