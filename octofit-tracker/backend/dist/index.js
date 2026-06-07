"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', port: PORT, mongoUri: MONGODB_URI });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
        app.listen(PORT, () => {
            console.log(`Backend listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
