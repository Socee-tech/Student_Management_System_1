import { motion } from "framer-motion"
import { Book, Calendar, Mail, Phone, User, X } from "lucide-react"
import { useState } from "react"
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";




export const EditStudent = ({ student, onClose }) => {
    const [formData, setFormData] = useState({
        name: student.name,
        course: student.course,
        year: student.year,
        admDate: student.admDate,
        gender: student.gender,
        email: student.email,
        phone: student.phone,
    });
    const { notifySuccess, notifyError } = UseNotify();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.put(`/students/${encodeURIComponent(student.regNo)}`, formData);
            if (res) {
                notifySuccess("Student updated successfully");
                onClose();
            } else {
                notifyError("Failed to update student");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };
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
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="bg-foreground rounded-2xl shadow-lg w-full max-w-sm p-4 md:max-w-4xl"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Edit Student</h3>
                    <X onClick={onClose} size={22} className="w-6 h-6 cursor-pointer" />
                </div>
                <div className="flex text-xl mb-8 w-full items-center justify-center"><span className="text-lg font-bold mr-2">REG NO:</span>{student.regNo}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-2xl">
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <User size={16} />
                            <label htmlFor="name" className="text-sm">Name:</label>
                        </div>
                        <input
                            type="text"
                            id="name"
                            className="input-field ml-0 p-2"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <Book size={16} />
                            <label htmlFor="course" className="text-sm">Course:</label>
                        </div>
                        <input
                            type="text"
                            id="course"
                            className="input-field ml-0 p-2"
                            value={formData.course}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <User size={16} />
                            <label htmlFor="year" className="text-sm">Year:</label>
                        </div>
                        <input
                            type="number"
                            id="year"
                            className="input-field ml-0 p-2"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <User size={16} />
                            <label htmlFor="gender" className="text-sm">Gender:</label>
                        </div>
                        <input
                            type="text"
                            id="gender"
                            className="input-field ml-0 p-2"
                            value={formData.gender}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <Calendar size={16} />
                            <label htmlFor="date" className="text-sm">Date enrolled:</label>
                        </div>
                        <input
                            type="date"
                            id="admDate"
                            className="input-field ml-0 p-2 text-[1.2rem]"
                            value={formData.admDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <Mail size={16} />
                            <label htmlFor="email" className="text-sm">Email:</label>
                        </div>
                        <input
                            type="text"
                            id="email"
                            className="input-field ml-0 p-2"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-left">
                            <Phone size={16} />
                            <label htmlFor="phone" className="text-sm">Phone:</label>
                        </div>
                        <input
                            type="text"
                            id="phone"
                            className="input-field ml-0 p-2"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-row gap-4 p-2">
                        <button className="action-decline hover:cursor-pointer" onClick={onClose}>Cancel</button>
                        <button className="action-accept hover:cursor-pointer" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}