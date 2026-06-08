"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    teamId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Team' },
});
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
});
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    loggedAt: { type: Date, default: Date.now },
});
const leaderboardSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, default: 0 },
}, { collection: 'leaderboard' });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetActivityType: { type: String, required: true },
});
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.models.Team || mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.models.Activity || mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.models.LeaderboardEntry || mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.models.Workout || mongoose_1.default.model('Workout', workoutSchema);
