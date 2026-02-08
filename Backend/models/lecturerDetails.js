import mongoose from "mongoose";
import { LecturerStatsSchema } from "./lecturerStats.js";

const LecturerDetailsSchema = new mongoose.Schema(
  {
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
      required: true,
      unique: true,
    },

    stats: {
      type: LecturerStatsSchema,
      default: () => ({}),
    },

    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    announcements: [
      {
        title: String,
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const lecturerDetailsModel = mongoose.model(
  "LecturerDetails",
  LecturerDetailsSchema
);
export default lecturerDetailsModel;
