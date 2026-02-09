"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = (0, express_1.default)();
// CORS configuration
const corsOptions = {
    origin: [
        'https://order-manager-assessment.vercel.app',
        'http://localhost:3000',
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// API routes
app.use('/api', menuRoutes_1.default);
app.use('/api', orderRoutes_1.default);
// Health check
app.get('/', (_, res) => {
    res.send('Order Management API');
});
exports.default = app;
