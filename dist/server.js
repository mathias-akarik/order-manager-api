"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const morgan_1 = __importDefault(require("morgan")); // Import Morgan for logging
const menuRoutes_1 = __importDefault(require("./routes/menuRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = (0, express_1.default)();
// Enable CORS for all origins (you can restrict it to a specific origin later)
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://raftlabs-order-manager-assessment-ka838ig4s.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// Use morgan for logging every request to the console
app.use((0, morgan_1.default)('dev')); // Logs requests in a concise format
app.use(express_1.default.json()); // For parsing application/json
// Use /api prefix for menu and order routes
app.use('/api', menuRoutes_1.default); // Prefix with /api
app.use('/api', orderRoutes_1.default); // Prefix with /api
// Basic server check
app.get('/', (req, res) => {
    res.send('Order Management API');
});
// Export app for testing purposes
exports.default = app;
const PORT = process.env.PORT || 10000; // Render uses 10000 by default
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
