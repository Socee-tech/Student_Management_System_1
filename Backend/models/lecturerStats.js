import mongoose from "mongoose";

const LecturerStatsSchema = new mongoose.Schema(
  {
    activeCourses: {
      type: Number,
      default: 0,
    },
    students: {
      type: Number,
      default: 0,
    },
    classesToday: {
      type: Number,
      default: 0,
    },
    attendancePercentage: {
      type: Number, // store as 94, not "94%"
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);
const lecturerStatsModel = mongoose.model("LecturerStats", LecturerStatsSchema);
export { LecturerStatsSchema };
export default lecturerStatsModel;
