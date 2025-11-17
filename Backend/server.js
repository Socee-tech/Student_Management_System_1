import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import studentController from "./controllers/studentController.js";
import courseController from "./controllers/courseController.js";
import lecturerController from "./controllers/lecturerController.js";
import serverless from "serverless-http";

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

// Start a local server for development (nodemon / local testing)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  App.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export a serverless handler for Vercel / other serverless platforms
export default serverless(App);
