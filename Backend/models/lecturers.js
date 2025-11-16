import mongoose from "mongoose";

const LecturerSchema = new mongoose.Schema({
  LecID: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  department: String,
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  status: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});
const Lecturer = mongoose.model('Lecturer', LecturerSchema);
export default Lecturer;