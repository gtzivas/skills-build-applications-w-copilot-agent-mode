import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    profile: {
        displayName: { type: String, required: true, trim: true },
        bio: { type: String, default: '' },
        avatarUrl: { type: String, default: '' },
    },
}, { timestamps: true });
export const UserModelRef = model('User', userSchema);
