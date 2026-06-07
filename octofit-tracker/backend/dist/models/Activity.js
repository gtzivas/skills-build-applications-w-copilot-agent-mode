import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
export const ActivityModelRef = model('Activity', activitySchema);
