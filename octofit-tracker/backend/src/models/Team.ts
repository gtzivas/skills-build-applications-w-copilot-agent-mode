import { HydratedDocument, Model, Schema, Types, model } from 'mongoose';

export interface Team {
  name: string;
  description?: string;
  memberIds: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

type TeamDocument = HydratedDocument<Team>;
type TeamModel = Model<Team>;

const teamSchema = new Schema<Team, TeamModel>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const TeamModelRef = model<Team, TeamModel>('Team', teamSchema);
export type { TeamDocument };
