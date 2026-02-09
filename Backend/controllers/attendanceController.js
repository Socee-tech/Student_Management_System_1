import express from "express";
import AttendanceSession from "../models/attendanceSessions.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { class: classId, date } = req.body;
    if (!classId || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const created = await AttendanceSession.create(req.body);
    const populated = await AttendanceSession.findById(created._id).populate(
      "class",
      "code title"
    );

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server failed to create attendance session",
    });
  }
});

Router.get("/", async (req, res) => {
  try {
    const sessions = await AttendanceSession.find({})
      .sort({ date: -1 })
      .populate("class", "code title");

    return res.status(200).json(sessions);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server failed to fetch attendance sessions",
    });
  }
});

Router.get("/attendace", async (req, res) => {
  try {
    const sessions = await AttendanceSession.aggregate([
      {
        $group: {
          _id: "$date",
        },
      },
    ]);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server failed to fetch attendance sessions",
    });
  }
});

Router.get("/:id", async (req, res) => {
  try {
    const found = await AttendanceSession.findById(req.params.id).populate(
      "class",
      "code title"
    );
    if (!found) return res.status(404).json("Attendance session not found");
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server failed to fetch attendance session",
    });
  }
});

Router.put("/:id", async (req, res) => {
  try {
    const updated = await AttendanceSession.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).populate("class", "code title");

    if (!updated) return res.status(404).json("Attendance session not found");
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server failed to update attendance session",
    });
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AttendanceSession.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json("Attendance session not found");
    return res
      .status(200)
      .json({ message: "Attendance session deleted", deleted });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Server failed to delete attendance session",
    });
  }
});

export default Router;
