"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("@/api"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' })); // Permitir solo el frontend
app.use(express_1.default.json());
// API Routes
app.use('/api/v1', api_1.default);
// Health check endpoint
app.get('/', (req, res) => {
    res.send('Signal Watcher Backend is running!');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
