import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import UseNotify from "../../../../snackBar/snackBar";
import API from "../../../API/axios";

export default function EditCourse({ course, onclose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const [formData, setFormData] = useState({
        code: course.code,
        title: course.title,
        credits: course.credits,
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put(`/courses/${course.code}`, formData);
            if (res && res.data) {
                notifySuccess("Course updated successfully");
                onclose();
            } else {
                notifyError("Failed to update course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            notifyError("Failed to update course");
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onclose}
        >
            <motion.div
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-row justify-between">
                        <div className="font-bold text-2xl">Edit Course</div>
                        <div className="hover:cursor-pointer" onClick={onclose}><X size={24} /></div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="code">Course Code:</label>
                            </div>
                            <input
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="title">Course title:</label>
                            </div>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="credits">Credits:</label>
                            </div>
                            <input
                                name="credits"
                                value={formData.credits}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-row">
                            <button className="action-accept ml-auto mt-4 hover:cursor-pointer" onClick={handleSave}>Save Changes</button>
                            <button className="action-decline ml-auto mt-4 hover:cursor-pointer" onClick={onclose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}