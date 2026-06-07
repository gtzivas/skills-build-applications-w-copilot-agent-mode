import { HydratedDocument, Model, Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  targetMuscleGroups: string[];
}

type WorkoutDocument = HydratedDocument<Workout>;
type WorkoutModel = Model<Workout>;

const workoutSchema = new Schema<Workout, WorkoutModel>(
  {
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
  },
  { timestamps: true },
);

export const WorkoutModelRef = model<Workout, WorkoutModel>('Workout', workoutSchema);
export type { WorkoutDocument };
