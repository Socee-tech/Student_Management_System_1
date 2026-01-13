import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: String,
    passWord: String,
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
