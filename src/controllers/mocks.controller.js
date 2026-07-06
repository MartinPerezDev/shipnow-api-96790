import { generateMockUsers } from "../mocks/user.mocks.js";
import { generateMockOrder } from "../mocks/orders.mocks.js";
import { insertManyUsers } from "../repositories/users.repository.js";
import { insertManyOrders } from "../repositories/orders.repository.js";
import { generateMockStores } from "../mocks/stores.mocks.js";
import { insertManyStores } from "../repositories/store.repository.js";

export const generateData = async (req, res) => {
    try {
        
        const MAX = 100;

        const { users = 0, orders = 0, stores = 0 } = req.body;


        if (typeof users !== "number" || typeof orders !== "number" || typeof stores !== "number") {
            return res.status(400).json({
                status: "error",
                message: "Invalid data"
            })

        }

        if (users > MAX || orders > MAX || stores > MAX) {
            return res.status(400).json({
                status: "error",
                message: "Maximun amount of users, orders or stores is 100"
            })
        }

        const mocksUsers = generateMockUsers(users);
        const generatedUsers = await insertManyUsers(mocksUsers);

        const mocksStores = generateMockStores(stores, generatedUsers);
        const generatedStores = await insertManyStores(mocksStores);
        const randomStore = generatedStores[Math.floor(Math.random() * generatedStores.length)];

        const mocksOrders = Array.from({ length: orders}, () => {
        const randomUser = generatedUsers[Math.floor(Math.random() * generatedUsers.length)];
        return generateMockOrder(randomUser._id, randomStore._id);
        });

        const generatedOrders = await insertManyOrders(mocksOrders);

        return res.status(201).json({
            status: "success",
            message: "Data generated successfully",
            payload: {
                users: generatedUsers.length,
                orders: generatedOrders.length,
                stores: generatedStores.length
            }
        });

    } catch (error) {
        
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }

}
