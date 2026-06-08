import express from 'express';
import mongoose from 'mongoose';

import { connectToDatabase, MONGODB_URI } from './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT, baseUrl, mongoUri: MONGODB_URI });
});

app.get('/api/users/', async (_req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

app.get('/api/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('members').lean();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

app.get('/api/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find().populate('userId').sort({ loggedAt: -1 }).lean();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

app.get('/api/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('userId').sort({ points: -1 }).lean();
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

app.get('/api/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().lean();
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

app.use((error: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
});

async function startServer() {
  try {
    await connectToDatabase();
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);

    app.listen(PORT, () => {
      console.log(`Backend listening on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();