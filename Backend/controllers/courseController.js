import express from "express";
import Course from "../models/courses.js";

const Router = express.Router();

Router.post("/", async (req, res) => {
    try {
        const course = await Course.create(req.body);
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json(error.message);
    }
})
Router.get("/", async (req, res) => {
    try {
        const courses = await Course.find({});
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json(error.message);
    }
})
Router.get("/:code", async (req, res) => {
    try {
        const course = await Course.findOne({ code: req.params.code });
        if (!course) return res.status(404).json("Course not found");
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});
Router.put("/:code", async (req, res) => {
    try {
        const course = await Course.findOneAndUpdate(
            { code: req.params.code },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        if (!course) return res.status(404).json("Course not found");
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json(error.message);
    }
})
Router.delete("/:code", async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ code: req.params.code });
        if (!course) return res.status(404).json("Course not found");
        return res.status(200).json({ message: "Course deleted successfully", course });
    } catch (error) {
        return res.status(500).json(error.message);
    }
})

export default Router;