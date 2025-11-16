import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import studentController from "./controllers/studentController.js";
import courseController from "./controllers/courseController.js";
import lecturerController from "./controllers/lecturerController.js";

dotenv.config();
connectDb();

const App = express();

App.use(cors());
App.use(express.json());

App.use("/api/students", studentController);
App.use("/api/courses", courseController);
App.use("/api/lecturers", lecturerController);

App.get("/", (req, res) => {
  res.send("API is running...");
});
