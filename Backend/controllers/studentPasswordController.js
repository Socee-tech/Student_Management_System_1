import express from "express";
import StudentPassword from "../models/studentPasswords";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing required field: email" });
    }

    const student = await StudentPassword.create({ email, password });
    return res.status(201).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.get("/", async (req, res) => {
  try {
    const students = await StudentPassword.find({});
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const student = await StudentPassword.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

Router.put("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    const updatedStudent = await StudentPassword.findOneAndUpdate(
      { email },
      { password },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json(updatedStudent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
Router.delete("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const deletedStudent = await StudentPassword.findOneAndDelete({ email });
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default Router;
