import mongoose, { Schema, type Document, type Model, Types } from "mongoose";

export interface IOvertimeLog extends Document {
  userId: Types.ObjectId;
  date: Date;
  hours: number;
  createdAt: Date;
}

const OvertimeLogSchema = new Schema<IOvertimeLog>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
  },
  { timestamps: true }
);

// Compound index for efficient monthly queries
OvertimeLogSchema.index({ userId: 1, date: -1 });

const OvertimeLog: Model<IOvertimeLog> =
  mongoose.models.OvertimeLog ||
  mongoose.model<IOvertimeLog>("OvertimeLog", OvertimeLogSchema);

export default OvertimeLog;
