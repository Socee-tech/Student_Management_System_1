import mongoose from "mongoose";

const AttendanceSessionSchema = new mongoose.Schema(
  {
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    presentCount: {
      type: Number,
      default: 0,
    },
    absentCount: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

AttendanceSessionSchema.index({ class: 1, date: 1 }, { unique: true });

const AttendanceSession = mongoose.model(
  "AttendanceSession",
  AttendanceSessionSchema
);
export default AttendanceSession;
