import express from "express";
import Department from "../models/departments.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
  try {
    const department = await Department.create(req.body);
    return res.status(201).json(department);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/", async (rea, res) => {
  try {
    const departments = await Department.find({});
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/courses", async (req, res) => {
  try {
    const departments = await Department.find({}).populate(
      "courses",
      "title code -_id"
    );
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/hod", async (req, res) => {
  try {
    const departments = await Department.find({}).populate("hod", "name -_id");
    return res.status(200).json(departments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/count", async (rea, res) => {
  try {
    const count = await Department.countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/:deptID", async (req, res) => {
  try {
    const department = await Department.findOne({ code: req.params.deptID });
    return res.status(200).json(department);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.put("/:deptID", async (req, res) => {
  try {
    const department = await Department.findOneAndUpdate(
      { code: req.params.deptID },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(department);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.delete("/:deptID", async (req, res) => {
  try {
    const department = await Department.findOneAndDelete({
      code: req.params.deptID,
    });
    return res
      .status(200)
      .json({ message: "Department deleted successfully", department });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default Router;
