"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/orderRoutes
const orderController_1 = require("../controllers/orderController");
const orderController_2 = require("../controllers/orderController");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Add `/api` as the prefix for order routes
router.post('/order', orderController_2.createOrder);
router.put('/order/status', orderController_1.updateOrderStatus);
// Fetch all orders (excluding delivered ones)
router.get('/orders', orderController_1.getAllOrders);
// Get an order by its ID
router.get('/orders/:id', orderController_1.getOrderById);
exports.default = router;
