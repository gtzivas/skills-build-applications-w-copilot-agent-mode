import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
export const TeamModelRef = model('Team', teamSchema);
