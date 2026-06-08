import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  loggedAt: { type: Date, default: Date.now },
});

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
  },
  { collection: 'leaderboard' },
);

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetActivityType: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const LeaderboardEntry =
  mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);