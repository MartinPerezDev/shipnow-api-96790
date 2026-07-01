import { generateMockUser } from '../mocks/users.mock.js'
import { generateMockOrders } from '../mocks/orders.mock.js'
import { generateData } from '../controllers/mocks.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/mockingusers', async (req, res) => {

        const users = await generateMockUser()

        res.status(200).json({
            status: 'success',
            payload: users
        })

    }
)

router.get('/mockingorders',(req, res) => {

        const orders = generateMockOrders(5)

        res.status(200).json({
            status: 'success',
            payload: orders
        })

    }
)

router.post('/generateData', generateData)

export default router;