import dotenv from 'dotenv';
dotenv.config();
const codespaceName = process.env.CODESPACE_NAME;
export const PORT = Number(process.env.PORT ?? 8000);
export const BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
export const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
