import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date | null;
  hourlyRate: number;
  monthlyGoal: number;
  currency: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    emailVerified: { type: Date, default: null },
    hourlyRate: { type: Number, default: 0 },
    monthlyGoal: { type: Number, default: 60 },
    currency: { type: String, default: "NT$" },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
