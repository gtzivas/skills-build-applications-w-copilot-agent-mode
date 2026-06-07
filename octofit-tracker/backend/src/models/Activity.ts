import { HydratedDocument, Model, Schema, Types, model } from 'mongoose';

export interface Activity {
  userId: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

type ActivityDocument = HydratedDocument<Activity>;
type ActivityModel = Model<Activity>;

const activitySchema = new Schema<Activity, ActivityModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);

export const ActivityModelRef = model<Activity, ActivityModel>('Activity', activitySchema);
export type { ActivityDocument };
