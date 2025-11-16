import { motion } from "framer-motion";
import { User, X } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";

export default function AddLecturer({ onClose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const [formData, setFormData] = useState({
        LecID: '',
        name: '',
        department: '',
        email: '',
        phone: '+254',
        status: 'active',
        courses: [],
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await API.get('/courses');
                const courseOptions = res.data.map((course) => ({
                    value: course._id,
                    label: course.title
                }));
                setCourses(courseOptions);
            } catch (error) {
                console.error("error fetching courses", error);
            }
        };
        fetchCourses();
    }, []);
    const handleCourseChange = (selectedOptions) => {
        setFormData({
            ...formData,
            courses: selectedOptions.map((option) => option.value)
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/lecturers', formData);
            if (res && res.data) {
                notifySuccess("Lecturer added successfully");
                onClose();
            } else {
                notifyError("Failed to add lecturer");
            }
        } catch (error) {
            notifyError("An error occurred while adding lecturer");
            console.error("error adding lecturer", error);
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onClose}
            className="fixed flex inset-0 bg-black/40 backdrop-blur-sm items-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl mx-auto"
            >
                <div className="flex flex-col p-4 space-y-2">
                    <div className="flex justify-between">
                        <div className="font-bold text-3xl">Add Lecturer</div>
                        <div className="hover:cursor-pointer" onClick={onClose}><X size={24} /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="LecID" className="text-sm">Lecturer ID:</label>
                            </div>
                            <input
                                name="LecID"
                                className="input-field ml-0 p-2"
                                value={formData.LecID}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="name" className="text-sm">Name:</label>
                            </div>
                            <input
                                name="name"
                                className="input-field ml-0 p-2"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="department" className="text-sm">Department:</label>
                            </div>
                            <input
                                name="department"
                                className="input-field ml-0 p-2"
                                value={formData.department}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="email" className="text-sm">Email:</label>
                            </div>
                            <input
                                name="email"
                                className="input-field ml-0 p-2"
                                value={formData.email}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="phone" className="text-sm">Phone:</label>
                            </div>
                            <input
                                name="phone"
                                className="input-field ml-0 p-2"
                                value={formData.phone}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="status" className="text-sm">Status:</label>
                            </div>
                            <select
                                name="status"
                                id="status"
                                className="input-field ml-0 p-2"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Active" className="select-bg">Active</option>
                                <option value="Inactive" className="select-bg">Inactive</option>
                            </select>
                        </div>
                        <div>
                            <Select
                                isMulti
                                name="courses"
                                options={courses}
                                className="text-black"
                                placeholder="Select courses..."
                                onChange={handleCourseChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button className="action-decline p-2" onClick={onClose}>Cancel</button>
                        <button className="action-accept" onClick={handleSubmit}>Add Lecturer</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}