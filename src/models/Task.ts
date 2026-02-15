import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  status: string;
  deadline?: Date;
  userId?: Types.ObjectId;
  subjectId?: Types.ObjectId;
}

const schema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      default: "pending"
    },
    deadline: Date,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject"
    }
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", schema);
