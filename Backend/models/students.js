import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
  },
  year: Number,
  gender: String,
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  admDate: {
    type: String,
  },
});
const Student = mongoose.model("Student", StudentSchema);
export default Student;
