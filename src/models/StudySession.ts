import mongoose, { Schema, Document, Types } from "mongoose";

export interface IStudySession extends Document {
  userId: Types.ObjectId;
  subjectId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

const schema = new Schema<IStudySession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },
    startTime: { type: Date, required: true },
    endTime: Date,
    duration: Number
  },
  { timestamps: true }
);

export const StudySession = mongoose.model<IStudySession>(
  "StudySession",
  schema
);
