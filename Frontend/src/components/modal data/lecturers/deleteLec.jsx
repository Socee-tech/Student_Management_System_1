import { motion } from "framer-motion";
import { House, Mail, Phone, User, X } from "lucide-react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";




export default function DeleteLec({ lecturer, onClose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const handleDelete = async () => {
        try {
            const res = await API.delete(`/lecturers/${lecturer.LecID}`);
            if (res.status === 200) {
                onClose();
                notifySuccess("Lecturer deleted successfully");
            } else {
                notifyError("Failed to delete lecturer");
            }
        } catch (error) {
            console.error("Error deleting lecturer:", error);
            notifyError("An error occurred while deleting lecturer");
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl"
            >
                <div className="flex flex-col items-center justify-center gap-4 p-4">
                    <div className="flex w-full justify-between">
                        <h3 className="font-bold text-3xl">Delete Lecturer</h3>
                        <X onClick={onClose} className="w-6 h-6 hover:cursor-pointer" />
                    </div>
                    <h2 className="text-xl font-semibold">Lecturer ID: {lecturer.LecID}</h2>
                    <p>Are you sure you want to delete lecturer: <span className="text-green-500">{lecturer.name}</span> ?</p>
                    <span className="text-red-500 text-2xl">This action cannot be undone look carefully</span>
                    <div className="text-xl font-semibold">Lecturer Details:</div>
                    <div className="w-full grid gap-3 grid-cols-1 md:grid-cols-2 mt-4">
                        <div className="flex border p-2 rounded-2xl md:border-r-0">
                            <User size={16} />
                            <span className="text-lg font-bold mr-2">Name:</span>
                            {lecturer.name}
                        </div>
                        <div className="flex border md:border-l-0 p-2 rounded-2xl">
                            <House size={16} />
                            <span className="text-lg font-bold mr-2">Department:</span>
                            {lecturer.department}
                        </div>
                        <div className="flex border p-2 rounded-2xl md:border-r-0">
                            <Mail size={16} />
                            <span className="text-lg font-bold mr-2">Email:</span>
                            {lecturer.email}
                        </div>
                        <div className="flex border md:border-l-0 p-2 rounded-2xl">
                            <Phone size={16} />
                            <span className="text-lg font-bold mr-2">Phone:</span>
                            {lecturer.phone}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="action-btn bg-gray-300 text-black">Cancel</button>
                        <button
                            onClick={handleDelete}
                            className="action-btn bg-red-500">Delete</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )

}