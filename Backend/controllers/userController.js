import express from "express";
import userModel from "../models/users.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { userName, passWord, role } = req.body;
    if (!userName || !passWord || !role)
      return res.status(400).json({ message: "Missing required fields" });

    const created = new userModel({ userName, passWord, role });
    const savedUser = await created.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.post("/login", async (req, res) => {
  const { userName, passWord } = req.body;
  try {
    const user = await userModel.findOne({ userName, passWord });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    if (user.passWord !== passWord) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});


export default Router;