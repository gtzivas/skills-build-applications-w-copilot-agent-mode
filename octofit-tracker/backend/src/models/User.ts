import { HydratedDocument, Model, Schema, model } from 'mongoose';

interface UserProfile {
  displayName: string;
  bio?: string;
  avatarUrl?: string;
}

export interface User {
  username: string;
  email: string;
  passwordHash: string;
  profile: UserProfile;
}

type UserDocument = HydratedDocument<User>;

type UserModel = Model<User>;

const userSchema = new Schema<User, UserModel>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    profile: {
      displayName: { type: String, required: true, trim: true },
      bio: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
    },
  },
  { timestamps: true },
);

export const UserModelRef = model<User, UserModel>('User', userSchema);
export type { UserDocument };
