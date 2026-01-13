import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    lecturer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecturer",
    },
    semester: {
      type: String,
      trim: true,
    },
    year: {
      type: Number,
    },
    room: {
      type: String,
      trim: true,
    },
    schedule: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "Active",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClassModel = mongoose.model("Class", ClassSchema);
export default ClassModel;
