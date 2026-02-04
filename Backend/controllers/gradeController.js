import express from "express";
import Grade from "../models/grades.js";

const Router = express.Router();

/* ============================
   CREATE GRADE
============================ */
Router.post("/", async (req, res) => {
  try {
    const {
      student,
      course,
      department,
      lecturer,
      academicYear,
      semester,
      marks,
      remark,
    } = req.body;

    if (
      !student ||
      !course ||
      !department ||
      !lecturer ||
      !academicYear ||
      !semester ||
      marks === undefined
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newGrade = new Grade({
      student,
      course,
      department,
      lecturer,
      academicYear,
      semester,
      marks,
      remark,
    });

    const savedGrade = await newGrade.save();
    return res.status(201).json(savedGrade);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* ============================
   GET ALL GRADES
============================ */
Router.get("/", async (req, res) => {
  try {
    const grades = await Grade.find({})
      .populate("student", "name regNo")
      .populate("course", "title code")
      .populate("department", "name")
      .populate("lecturer", "name LecID");

    return res.status(200).json(grades);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* ============================
   COUNT GRADES
============================ */
Router.get("/count", async (req, res) => {
  try {
    const count = await Grade.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* ============================
   GET GRADES FOR A STUDENT
============================ */
Router.get("/student/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const grades = await Grade.find({ student: studentId })
      .populate("course", "title code")
      .populate("department", "name")
      .populate("lecturer", "name LecID");

    return res.status(200).json(grades);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* ============================
   UPDATE GRADE
============================ */
Router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { marks } = req.body;

    const updatedGrade = await Grade.findByIdAndUpdate(
      id,
      { marks: marks },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedGrade);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

/* ============================
   DELETE GRADE
============================ */
Router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGrade = await Grade.findByIdAndDelete(id);

    return res.status(200).json({
      deletedGrade,
      message: "Grade deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default Router;
