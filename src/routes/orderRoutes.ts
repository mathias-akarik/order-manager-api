import { getAllOrders, getOrderById, updateOrderStatus } from '../controllers/orderController';
import { createOrder } from '../controllers/orderController';
import { Router } from 'express';

const router = Router();

// Add `/api` as the prefix for order routes
router.post('/order', createOrder);
router.put('/order/status', updateOrderStatus);
// Fetch all orders (excluding delivered ones)
router.get('/orders', getAllOrders);
// Get an order by its ID
router.get('/orders/:id', getOrderById);


export default router;
