import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISubject extends Document {
  name: string;
  userId: Types.ObjectId;
}

const schema = new Schema<ISubject>(
  {
    name: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export const Subject = mongoose.model<ISubject>("Subject", schema);
