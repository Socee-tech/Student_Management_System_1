import express from "express";
import LecturerPassword from "../models/lecturerPassword";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing required field: email" });
    }
    const lecturer = await LecturerPassword.create({ email, password });
    return res.status(201).json(lecturer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    const lecturers = await LecturerPassword.find({});
    return res.status(200).json(lecturers);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const lecturer = await LecturerPassword.findOne({ email });
    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    return res.status(200).json(lecturer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    const updatedLecturer = await LecturerPassword.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    if (!updatedLecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    return res.status(200).json(updatedLecturer);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deletedLecturer = await LecturerPassword.findOneAndDelete({ email });
    if (!deletedLecturer) {
      return res.status(404).json({ message: "Lecturer not found" });
    }
    return res.status(200).json({ message: "Lecturer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default Router;
