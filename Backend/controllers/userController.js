import express from "express";
import userModel from "../models/users.js";
import Lecturer from "../models/lecturers.js";
import Student from "../models/students.js";
import LecturerDetails from "../models/lecturerDetails.js";
import Grade from "../models/grades.js";
import StudentPassword from "../models/studentPasswords.js";
import LecturerPassword from "../models/lecturerPassword.js";
import Department from "../models/departments.js";

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
Router.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
const loginUser = async (req, res, role) => {
  const { email, passWord } = req.body;
  try {
    if (!email || !passWord) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (role == "student") {
      const student = await StudentPassword.findOne({ email });
      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }
      if (student.password !== passWord) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res
        .status(200)
        .json({ message: "Student logged in successfully", student });
    }
    if (role == "lecturer") {
      const lecturer = await LecturerPassword.findOne({ email });
      if (!lecturer) {
        return res.status(404).json({ message: "Lecturer profile not found" });
      }
      if (lecturer.password !== passWord) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res
        .status(200)
        .json({ message: "Lecturer logged in successfully", lecturer });
    }
    if (role == "admin") {
      const admin = await userModel.findOne({ email, role: "admin" });
      if (!admin) {
        return res.status(404).json({ message: "Admin profile not found" });
      }
      if (admin.passWord !== passWord) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res
        .status(200)
        .json({ message: "Admin logged in successfully", admin });
    }
    // const user = await userModel.findOne({ email, passWord });
    // if (!user) {
    //   return res.status(401).json({ message: "User not found" });
    // }
    // if (user.role !== role) {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    // if (role === "admin") {
    //   return res.status(200).json({ user });
    // }

    // if (role === "lecturer") {
    //   const lecturer = await Lecturer.findOne({ email: userName })
    //     .populate("department", "name")
    //     .populate("courses", "code title");

    //   if (!lecturer) {
    //     return res.status(404).json({ message: "Lecturer profile not found" });
    //   }

    //   const details = await LecturerDetails.findOne({
    //     lecturer: lecturer._id,
    //   })
    //     .populate({
    //       path: "schedule",
    //       select: "code title semester year room schedule status",
    //       populate: [
    //         { path: "course", select: "code title" },
    //         { path: "department", select: "name" },
    //         { path: "lecturer", select: "name LecID" },
    //       ],
    //     })
    //     .populate("courses", "code title");

    //   return res.status(200).json({
    //     user,
    //     profile: lecturer,
    //     details,
    //   });
    // }

    // if (role === "student") {
    //   const student = await Student.findOne({ email: userName }).populate(
    //     "department",
    //     "name"
    //   );
    //   if (!student) {
    //     return res.status(404).json({ message: "Student profile not found" });
    //   }

    //   const grades = await Grade.find({ student: student._id })
    //     .populate("course", "code title")
    //     .populate("lecturer", "name LecID")
    //     .populate("department", "name");

    //   return res.status(200).json({
    //     user,
    //     profile: student,
    //     grades,
    //   });
    // }

    // return res.status(400).json({ message: "Invalid role" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

Router.post("/login/admin", (req, res) => loginUser(req, res, "admin"));
Router.post("/login/lecturer", (req, res) => loginUser(req, res, "lecturer"));
Router.post("/login/student", (req, res) => loginUser(req, res, "student"));

Router.get("/portal/lecturer", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    const lecturer = await Lecturer.findOne({ email })
      .populate("department", "name")
      .populate("courses", "code title");

    if (!lecturer) {
      return res.status(404).json({ message: "Lecturer profile not found" });
    }

    const details = await LecturerDetails.findOne({
      lecturer: lecturer._id,
    })
      .populate({
        path: "schedule",
        select: "code title semester year room schedule status",
        populate: [
          { path: "course", select: "code title" },
          { path: "department", select: "name" },
          { path: "lecturer", select: "name LecID" },
        ],
      })
      .populate("courses", "code title");

    return res.status(200).json({
      profile: lecturer,
      details,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

Router.get("/portal/student", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }

    const student = await Student.findOne({ email }).populate(
      "department",
      "name"
    );
    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    const grades = await Grade.find({ student: student._id })
      .populate("course", "code title")
      .populate("lecturer", "name LecID")
      .populate("department", "name");

    const courses = await Department.findOne({
      name: student.department.name,
    })
      .select("courses")
      .populate("courses", "code title");

    return res.status(200).json({
      profile: student,
      grades,
      courses,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
Router.put("/:id", async (req, res) => {
  try {
    const updateUser = await userModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
Router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default Router;
