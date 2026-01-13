import express from "express";
import ClassModel from "../models/classes.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { code, title } = req.body;
    if (!code || !title) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const created = await ClassModel.create(req.body);
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/", async (req, res) => {
  try {
    const classes = await ClassModel.find({})
      .sort({ createdAt: -1 })
      .populate("department", "name code")
      .populate("course", "title code")
      .populate("lecturer", "name LecID");

    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/count", async (req, res) => {
  try {
    const count = await ClassModel.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/:code", async (req, res) => {
  try {
    const found = await ClassModel.findOne({
      code: req.params.code.toUpperCase(),
    })
      .populate("department", "name code")
      .populate("course", "title code")
      .populate("lecturer", "name LecID");

    if (!found) return res.status(404).json("Class not found");
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.put("/:code", async (req, res) => {
  try {
    const updated = await ClassModel.findOneAndUpdate(
      { code: req.params.code.toUpperCase() },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .populate("department", "name code")
      .populate("course", "title code")
      .populate("lecturer", "name LecID");

    if (!updated) return res.status(404).json("Class not found");
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.delete("/:code", async (req, res) => {
  try {
    const deleted = await ClassModel.findOneAndDelete({
      code: req.params.code.toUpperCase(),
    });

    if (!deleted) return res.status(404).json("Class not found");
    return res
      .status(200)
      .json({ message: "Class deleted successfully", deleted });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default Router;
