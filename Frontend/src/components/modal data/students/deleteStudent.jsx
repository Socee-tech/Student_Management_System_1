import { motion } from "framer-motion"
import { X } from "lucide-react"
import API from "../../../API/axios"
import UseNotify from "../../../../snackBar/snackBar"



export const DeleteStudent = ({ student, onClose }) => {
    const { notifySuccess, notifyError } = UseNotify();
    const handleDelete = () => {
        try {
            const res = API.delete(`/students/${encodeURIComponent(student.regNo)}`);
            if (res) {
                notifySuccess("Student deleted successfully");
                onClose();
            }
        } catch (error) {
            notifyError("Failed to delete student");
            console.error("Error deleting student:", error);
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
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-foreground rounded-2xl shadow-lg w-full max-w-sm p-4 md:max-w-4xl"
            >
                <div className="space-y-4 p-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Delete Student</h3>
                        <button className=" hover:cursor-pointer"><X size={22} onClick={onClose} className="w-6 h-6" /></button>
                    </div>
                    <p className="font-semibold">Are you sure you want to delete <span className="font-bold text-green-400">{student.name}</span>?</p>
                    <p className="font-bold text-red-500">This action cannot be undone</p>
                    <p>Student Details:</p>
                    <div className="text-left p-4">
                        <ul className="list-disc list-inside space-y-2">
                            <li><span className="font-bold">Name:</span> {student.name}</li>
                            <li><span className="font-bold">Email:</span> {student.email}</li>
                            <li><span className="font-bold">Phone:</span> {student.phone}</li>
                            <li><span className="font-bold">Reg No:</span> {student.regNo}</li>
                            <li><span className="font-bold">Gender:</span> {student.gender}</li>
                            <li><span className="font-bold">Course:</span> {student.course}</li>
                            <li><span className="font-bold">Year:</span> {student.year}</li>
                            <li><span className="font-bold">Date enrolled:</span> {student.admDate}</li>
                        </ul>
                    </div>
                    <div className="flex justify-end gap-8">
                        <button
                            className="action-decline"
                            onClick={onClose}
                        >Cancel</button>
                        <button
                            className="bg-red-500 action-accept"
                            onClick={handleDelete}
                        >Delete</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}