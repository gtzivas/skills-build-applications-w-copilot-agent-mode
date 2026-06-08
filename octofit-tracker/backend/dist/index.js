"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', port: PORT, baseUrl, mongoUri: MONGODB_URI });
});
app.get('/api/users/', async (_req, res, next) => {
    try {
        const users = await models_1.User.find().lean();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/teams/', async (_req, res, next) => {
    try {
        const teams = await models_1.Team.find().populate('members').lean();
        res.json(teams);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/activities/', async (_req, res, next) => {
    try {
        const activities = await models_1.Activity.find().populate('userId').sort({ loggedAt: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/leaderboard/', async (_req, res, next) => {
    try {
        const leaderboard = await models_1.LeaderboardEntry.find().populate('userId').sort({ points: -1 }).lean();
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
app.get('/api/workouts/', async (_req, res, next) => {
    try {
        const workouts = await models_1.Workout.find().lean();
        res.json(workouts);
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
        app.listen(PORT, () => {
            console.log(`Backend listening on ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
