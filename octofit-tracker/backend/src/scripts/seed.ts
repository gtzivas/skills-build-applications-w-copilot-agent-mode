import mongoose from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Maya Chen', email: 'maya.chen@example.com' },
    { name: 'Jordan Smith', email: 'jordan.smith@example.com' },
    { name: 'Priya Patel', email: 'priya.patel@example.com' },
    { name: 'Lucas Rivera', email: 'lucas.rivera@example.com' },
  ]);

  const userIds = users.map((user: { _id: mongoose.Types.ObjectId }) => user._id);

  const teams = await Team.create([
    { name: 'Trail Blazers', members: [userIds[0], userIds[1]] },
    { name: 'Core Crushers', members: [userIds[2], userIds[3]] },
  ]);

  await Promise.all([
    User.updateMany({ _id: { $in: [userIds[0], userIds[1]] } }, { teamId: teams[0]._id }),
    User.updateMany({ _id: { $in: [userIds[2], userIds[3]] } }, { teamId: teams[1]._id }),
  ]);

  await Activity.create([
    { userId: userIds[0], activityType: 'Running', durationMinutes: 42, loggedAt: new Date('2026-06-01T14:30:00Z') },
    { userId: userIds[1], activityType: 'Cycling', durationMinutes: 55, loggedAt: new Date('2026-06-02T12:15:00Z') },
    { userId: userIds[2], activityType: 'Strength Training', durationMinutes: 38, loggedAt: new Date('2026-06-03T18:00:00Z') },
    { userId: userIds[3], activityType: 'Yoga', durationMinutes: 30, loggedAt: new Date('2026-06-04T07:45:00Z') },
  ]);

  await LeaderboardEntry.create([
    { userId: userIds[0], points: 1240 },
    { userId: userIds[2], points: 1185 },
    { userId: userIds[1], points: 1090 },
    { userId: userIds[3], points: 980 },
  ]);

  await Workout.create([
    {
      title: 'Endurance Builder',
      description: 'A steady-state run with short tempo intervals for improving aerobic capacity.',
      targetActivityType: 'Running',
    },
    {
      title: 'Power Ride',
      description: 'A cycling session with hill repeats and recovery spins.',
      targetActivityType: 'Cycling',
    },
    {
      title: 'Full Body Strength',
      description: 'Compound lifts and core work for balanced strength development.',
      targetActivityType: 'Strength Training',
    },
    {
      title: 'Mobility Reset',
      description: 'A restorative flow focused on hips, hamstrings, shoulders, and breath control.',
      targetActivityType: 'Yoga',
    },
  ]);

  console.log(`Created ${users.length} users, ${teams.length} teams, 4 activities, 4 leaderboard entries, and 4 workouts.`);
}

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });