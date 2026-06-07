import cors from 'cors';
import express from 'express';
import { connectToDatabase } from './config/db.js';
import { BASE_URL, PORT } from './config/env.js';
import './models/index.js';
import { apiRouter } from './routes/apiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

async function startServer(): Promise<void> {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error('MongoDB connection failed, API will continue without DB:', error);
  }

  app.listen(PORT, () => {
    // Keep startup logs explicit for local and Codespaces debugging.
    console.log(`Octofit backend running at ${BASE_URL}`);
  });
}

void startServer();
