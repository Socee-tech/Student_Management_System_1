import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";

export default function AddCourse({ onClose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const [formData, setFormData] = useState({
        code: "",
        title: "",
        credits: "",
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/courses", formData);
            if (res) {
                notifySuccess("Course added successfully");
                setFormData({
                    code: "",
                    title: "",
                    credits: "",
                })
                onClose();
            } else {
                notifyError("Failed to add course");
            }
        } catch (error) {
            notifyError("Failed to add course");
            console.error("Error adding course:", error);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex justify-between">
                        <div className="font-bold text-2xl">Add Course</div>
                        <div className="hover:cursor-pointer" onClick={onClose}><X size={24} /></div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="code" className="text-sm">Code:</label>
                            </div>
                            <input
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="title" className="text-sm">Title:</label>
                            </div>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="credits" className="text-sm">Credits:</label>
                            </div>
                            <input
                                name="credits"
                                value={formData.credits}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text" />
                        </div>
                        <div className="flex flex-row">
                            <button
                                onClick={handleSubmit}
                                className="action-accept ml-auto mt-4 hover:cursor-pointer">Add Course</button>
                            <button className="action-decline ml-auto mt-4 hover:cursor-pointer" onClick={onClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}