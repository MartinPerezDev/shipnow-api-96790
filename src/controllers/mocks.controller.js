import { generateMockUsers } from "../mocks/users.mock.js";
import { generateMockStores } from "../mocks/stores.mock.js";
import { generateMockOrders } from "../mocks/orders.mock.js";
import { ordersRepository } from "../repositories/orders.repository.js";
import { storesRepository } from "../repositories/stores.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import logger from "../config/logger.js";

import { USER_ROLES } from "../constants/userroles.js";

export const generateData = async (req, res) => {
  try {
    const { users = 10, stores = 5, orders = 20 } = req.body;

    const mockCustomers = await generateMockUsers(users, USER_ROLES.CUSTOMER);
    const mockOwners = await generateMockUsers(stores, USER_ROLES.STORE);

    const mockUsers = [...mockCustomers, ...mockOwners];

    const createdUsers = await usersRepository.insertManyUsers(mockUsers);

    //filtramos por usaurios owners
    const owners = createdUsers.filter(user => user.role === USER_ROLES.STORE);
    //filtramos por usuarios tipo tienda
    const customers = createdUsers.filter(user => user.role === USER_ROLES.CUSTOMER);

    //generar mocks de usuarios tiendas
    const mockStores = generateMockStores(owners);
    //insertar las tiendas en la coleccion de stores
    const createdStores = await storesRepository.insertManyStores(mockStores);

    //generar las mocks de ordenes
    const mockOrders = generateMockOrders(orders, customers, createdStores);
    //insertar las ordernes en la colection de orders
    const createdOrders = await ordersRepository.insertManyOrders(mockOrders);

    logger.info('Data generated successfully', {
      users: createdUsers.length,
      stores: createdStores.length,
      orders: createdOrders.length
    });

    res.status(201).json({
      status: 'success',
      payload: {
        users: createdUsers.length,
        stores: createdStores.length,
        orders: createdOrders.length
      }
    });

  } catch (error) {
    logger.error('Error generating data:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
