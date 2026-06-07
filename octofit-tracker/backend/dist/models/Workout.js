import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
        required: true,
    },
    tags: { type: [String], default: [] },
    targetMuscleGroups: { type: [String], default: [] },
}, { timestamps: true });
export const WorkoutModelRef = model('Workout', workoutSchema);
