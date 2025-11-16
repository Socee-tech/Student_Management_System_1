import express from "express";
import Lecturer from "../models/lecturers.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const lecturer = await Lecturer.create(req.body);
    return res.status(201).json(lecturer);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
Router.get("/", async (req, res) => {
  try {
    const lecturers = await Lecturer.find({}).populate("courses", "title");
    return res.status(200).json(lecturers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
Router.get("/:LecID", async (req, res) => {
  try {
    const lecturer = await Lecturer.findOne({
      LecID: req.params.LecID,
    }).populate("courses", "title -_id");
    if (!lecturer) return res.status(404).json("Lecturer not found");
    return res.status(200).json(lecturer);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
Router.put("/:LecID", async (req, res) => {
  try {
    const lecturer = await Lecturer.findOneAndUpdate(
      { LecID: req.params.LecID },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    return res
      .status(200)
      .json({ lecturer, message: "Lecturer updated successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
Router.delete("/:LecID", async (req, res) => {
  try {
    const lecturer = await Lecturer.findOneAndDelete({
      LecID: req.params.LecID,
    });
    if (!lecturer) return res.status(404).json("Lecturer not found");
    return res
      .status(200)
      .json({ message: "Lecturer deleted successfully", lecturer });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default Router;
