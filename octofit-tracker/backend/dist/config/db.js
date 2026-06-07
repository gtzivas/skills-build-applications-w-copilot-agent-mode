import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';
export async function connectToDatabase() {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected to octofit_db');
}
