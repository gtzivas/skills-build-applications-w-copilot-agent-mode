import { Schema, model } from 'mongoose';
const leaderboardEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
}, { _id: false });
const leaderboardSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, unique: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
}, { timestamps: true });
export const LeaderboardModelRef = model('Leaderboard', leaderboardSchema);
