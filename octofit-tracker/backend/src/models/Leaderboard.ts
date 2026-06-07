import { HydratedDocument, Model, Schema, Types, model } from 'mongoose';

interface LeaderboardEntry {
  userId: Types.ObjectId;
  score: number;
}

export interface Leaderboard {
  teamId: Types.ObjectId;
  entries: LeaderboardEntry[];
}

type LeaderboardDocument = HydratedDocument<Leaderboard>;
type LeaderboardModel = Model<Leaderboard>;

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const leaderboardSchema = new Schema<Leaderboard, LeaderboardModel>(
  {
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, unique: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
  },
  { timestamps: true },
);

export const LeaderboardModelRef = model<Leaderboard, LeaderboardModel>('Leaderboard', leaderboardSchema);
export type { LeaderboardDocument };
