import mongoose from "mongoose";

const lecturerPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: "lecturer123",
  },
});

const LecturerPassword = mongoose.model(
  "LecturerPassword",
  lecturerPasswordSchema
);

export default LecturerPassword;
