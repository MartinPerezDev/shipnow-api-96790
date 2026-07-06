import { Router } from "express";
import { generateMockUsers} from "../mocks/user.mocks.js";
import { generateMockOrders } from "../mocks/orders.mocks.js";
import { generateData } from "../controllers/mocks.controller.js";

const router = Router();

router.get("/mockingusers", (req, res) => {
  
    const users = generateMockUsers(10);

    res.json({
        status: "success",
        payload: users
    })

});

router.get("/mockingorders", (req, res) => {
    
    const orders = generateMockOrders(5, "68f4b2d3e4f5a6b7c8d9e0f1");

    res.json({
        status: "success",
        payload: orders
    })
})

router.post("/generateData", generateData)

export default router;