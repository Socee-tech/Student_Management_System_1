import mongoose from "mongoose";

const studentPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    default: "password123",
  },
});

const StudentPassword = mongoose.model(
  "StudentPassword",
  studentPasswordSchema
);

export default StudentPassword;
