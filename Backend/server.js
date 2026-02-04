import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import studentController from "./controllers/studentController.js";
import courseController from "./controllers/courseController.js";
import lecturerController from "./controllers/lecturerController.js";
import departmentController from "./controllers/departmentController.js";
import classController from "./controllers/classController.js";
import attendanceController from "./controllers/attendanceController.js";
import userController from "./controllers/userController.js";
import gradeController from "./controllers/gradeController.js";
import { studentsPerDepartment } from "./controllers/analyticsController.js";

dotenv.config();
connectDb();

const App = express();

App.use(cors());
App.use(express.json());

App.use("/api/students", studentController);
App.use("/api/courses", courseController);
App.use("/api/lecturers", lecturerController);
App.use("/api/departments", departmentController);
App.use("/api/classes", classController);
App.use("/api/attendance", attendanceController);
App.use("/api/analytics/students-per-department", studentsPerDepartment);
App.use("/api/grades", gradeController);
App.use("/api/user", userController);

App.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
App.listen(PORT, () => console.log(`Server running on port ${PORT}`));
