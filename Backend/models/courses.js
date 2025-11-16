import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    credits: Number,
  },
  {
    timestamps: true,
  }
);
const Course = mongoose.model("Course", CourseSchema);
export default Course;
