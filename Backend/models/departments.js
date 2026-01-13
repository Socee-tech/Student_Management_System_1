import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  hod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecturer",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const Department = mongoose.model("Department", DepartmentSchema);
export default Department;
