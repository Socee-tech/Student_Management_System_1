import express from "express";
import Student from "../models/students.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const { name, regNo, course, year, gender, email, phone, admDate } =
      req.body;

    if (
      !name ||
      !regNo ||
      !course ||
      !year ||
      !gender ||
      !email ||
      !phone ||
      !admDate
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // create new student
    const newStudent = new Student({
      name,
      regNo,
      course,
      year,
      gender,
      email,
      phone,
      admDate,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    return res.status(500).json(error.message);
  }
  res.status(500).json({ error: "Server error", details: error.message });
});

Router.get("/", async (req, res) => {
  try {
    if (req.body) {
      try {
        const { regNo } = req.body;
        const student = await Student.findOne({ regNo });
        return res.status(200).json(student);
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }
    const students = await Student.find({});
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/:regNo", async (req, res) => {
  try {
    const { regNo } = req.body;
    const student = await Student.findOne({ regNo });
    return res.status(200).json(student);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.put("/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;
    const updateData = req.body;
    const updatedStudent = await Student.findOneAndUpdate(
      { regNo },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json(updatedStudent);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.delete("/:regNo", async (req, res) => {
  try {
    const { regNo } = req.params;
    const deletedStudent = await Student.findOneAndDelete({ regNo });
    return res
      .status(200)
      .json({ deletedStudent, message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default Router;
