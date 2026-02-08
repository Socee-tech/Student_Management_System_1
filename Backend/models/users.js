import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "lecturer", "student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", UserSchema);
export default userModel;
