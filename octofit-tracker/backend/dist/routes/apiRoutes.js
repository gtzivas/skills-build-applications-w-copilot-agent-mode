import { Router } from 'express';
import { BASE_URL } from '../config/env.js';
export const apiRouter = Router();
apiRouter.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', baseUrl: BASE_URL });
});
apiRouter.get('/users', (_req, res) => {
    res.json({ message: 'Users endpoint ready' });
});
apiRouter.get('/teams', (_req, res) => {
    res.json({ message: 'Teams endpoint ready' });
});
apiRouter.get('/activities', (_req, res) => {
    res.json({ message: 'Activities endpoint ready' });
});
apiRouter.get('/leaderboard', (_req, res) => {
    res.json({ message: 'Leaderboard endpoint ready' });
});
apiRouter.get('/workouts', (_req, res) => {
    res.json({ message: 'Workouts endpoint ready' });
});
