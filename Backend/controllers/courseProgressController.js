import express from "express";
import CourseProgress from "../models/courseProgress.js";
import Lecturer from "../models/lecturers.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  console.log("req to add crs prgss received");
  const { Department, Course, Lecturer, Progress, Description } = req.body;
  if (!Department || !Course || !Lecturer || Progress === undefined) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const crsProg = await CourseProgress.create({
      Department,
      Course,
      Lecturer,
      Progress,
      Description,
    });
    res.status(201).json(crsProg);
  } catch (error) {
    res.status(500).json({ message: "Error creating course progress", error });
  }
});

Router.get("/", async (req, res) => {
  try {
    const progress = await CourseProgress.find({});
    res.status(200).json(progress);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching course progress", error });
  }
});

Router.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const lecturer = await Lecturer.findOne({ email }, { _id: 1 });
  if (!lecturer) {
    return res.status(404).json({ message: "Lecturer not found" });
  }
  try {
    const progress = CourseProgress.find({ Lecturer: lecturer._id });
    res.status(200).json(progress);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching course progress for lecturer", error });
  }
});

Router.put("/:email", async (req, res) => {
  const email = req.params.email;
  const { Department, Course, Progress, Description } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const lecturer = await Lecturer.findOne({ email }, { _id: 1 });
  if (!lecturer) {
    return res.status(404).json({ message: "Lecturer not found" });
  }
  try {
    const updated = await CourseProgress.findOneAndUpdate(
      { Lecturer: lecturer._id, Course },
      { Department, Progress, Description },
      { new: true }
    );
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Course progress not found for lecturer and course" });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating course progress", error });
  }
});

Router.delete("/:email", async (req, res) => {
  const email = req.params.email;
  const { Course } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const lecturer = await Lecturer.findOne({ email }, { _id: 1 });
  if (!lecturer) {
    return res.status(404).json({ message: "Lecturer not found" });
  }
  try {
    const deleted = await CourseProgress.findOneAndDelete({
      Lecturer: lecturer._id,
      Course,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Course progress not found for lecturer and course" });
    }
    return res
      .status(200)
      .json({ message: "Course progress deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting course progress", error });
  }
});

export default Router;
