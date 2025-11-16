import { motion } from "framer-motion";
import { BookA, Calendar1Icon, Mail, PersonStanding, PhoneCall, Timer, User, X } from "lucide-react";
import { useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
export default function AddStudent({ onClose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const [formData, setFormData] = useState({
        name: "",
        regNo: "",
        course: "",
        year: "",
        gender: "",
        email: "",
        phone: "",
        admDate: "",
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmitt = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/students", formData);
            if (res) {
                notifySuccess("Student added successfully");
                setFormData({
                    name: "",
                    regNo: "",
                    course: "",
                    year: "",
                    gender: "",
                    email: "",
                    phone: "",
                    admDate: "",
                })
                onClose();
            } else {
                notifyError("Failed to add student");
            }

        } catch (error) {
            notifyError("Failed to add student");
            console.error("Error adding student:", error);
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
                <div className="space-y-4 p-5">
                    <div className="flex justify-between">
                        <div className="font-extrabold">Add New Student</div>
                        <div className="hover:cursor-pointer" onClick={onClose}><X size={24} /></div>
                    </div>
                    <div className="font-semibold">Enter student details below</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <User size={16} />
                                <label htmlFor="name">Name:</label>
                            </div>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <User size={16} />
                                <label htmlFor="name">RegNo:</label>
                            </div>
                            <input
                                name="regNo"
                                value={formData.regNo}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <BookA size={16} />
                                <label htmlFor="name">Course:</label>
                            </div>
                            <input
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div><div className="flex flex-col">
                            <div className="flex flex-row">
                                <Timer size={16} />
                                <label htmlFor="name">Year:</label>
                            </div>
                            <input
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <PersonStanding size={16} />
                                <label htmlFor="name">Gender:</label>
                            </div>
                            <input
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <Mail size={16} />
                                <label htmlFor="name">Email:</label>
                            </div>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <PhoneCall size={16} />
                                <label htmlFor="name">Phone:</label>
                            </div>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <Calendar1Icon size={16} />
                                <label htmlFor="name">Admission date:</label>
                            </div>
                            <input
                                name="admDate"
                                value={formData.admDate}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="date"
                            />
                        </div>
                    </div>
                    <div className="space-x-4">
                        <button className="p-2 bg-gray-400 rounded-2xl text-black font-bold text-lg hover:cursor-pointer">cancel</button>
                        <button
                            onClick={handleSubmitt}
                            className="p-2 bg-green-400 rounded-2xl text-black font-bold text-lg hover:cursor-pointer">submitt</button>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    )
}