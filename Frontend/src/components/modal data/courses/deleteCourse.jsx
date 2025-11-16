import { motion } from "framer-motion";
import { X } from "lucide-react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";





export default function DeleteCourse({ course, onCLose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const handleDelete = async () => {
        try {
            const res = await API.delete(`/courses/${course.code}`);
            if (res && res.data) {
                notifySuccess("Course deleted successfully");
                onCLose();
            } else {
                notifyError("Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            notifyError("Failed to delete course");
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onCLose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-foreground rounded-2xl shadow-lg w-full max-w-sm p-4 md:max-w-4xl"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xl">Delete Course</h3>
                        <button className="hover:cursor-pointer" onClick={onCLose}><X size={24} /></button>
                    </div>
                    <div className="flex gap-4 text-3xl">
                        <div className="font-bold">{course.code} <span className="font-extrabold">-</span></div>
                        <div className="font-bold">{course.title}</div>
                    </div>
                    <div className="text-lg">
                        Are you sure you want to delete this course? This action cannot be undone.
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={onCLose}
                            className="action-decline px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="action-accept px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}