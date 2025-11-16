import { motion } from "framer-motion";
import { BookOpen, Mail, Phone, User, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";




export default function EditLecturer({ lecturer, onClose }) {
    const { notifySuccess, notifyError } = UseNotify();
    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: lecturer.name || '',
        email: lecturer.email || '',
        department: lecturer.department || '',
        phone: lecturer.phone || '',
        status: lecturer.status || '',
        courses: lecturer.courses.map((course) => course._id) || [],
    });
    const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English', 'Economics', 'Business', 'Art', 'Music'];
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };
    const removeCourse = (course) => {
        setFormData({
            ...formData,
            courses: formData.courses.filter((c) => c !== course)
        });
    };
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
        const courseIDs = selectedOptions.map((option) => option.value);
        setFormData({
            ...formData,
            courses: courseIDs
        });
    };
    const handleDptChange = (selectedOption) => {
        setFormData({ ...formData, department: selectedOption.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.put(`/lecturers/${lecturer.LecID}`, formData);
            if (res.status === 200) {
                onClose();
                notifySuccess("Lecturer updated successfully");
            } else {
                notifyError("Failed to update lecturer");
            }
        } catch (error) {
            notifyError("An error occurred while updating lecturer");
            console.error("error updating lecturer", error);
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
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="bg-foreground rounded-2xl shadow-xl w-full max-w-sm p-4 md:max-w-4xl"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-xl">Edit Lecturer</h3>
                        <button className="hover:cursor-pointer" onClick={onClose}><X className="w-6 h-6" /></button>
                    </div>
                    <div className="flex gap-4 text-3xl">
                        <div className="font-bold">{lecturer.LecID} <span className="font-extrabold">-</span></div>
                        <div className="font-bold">{formData.name}</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex flex-col">
                            <div className="flex">
                                <User size={16} />
                                <label htmlFor="name" className="text-sm">Name:</label>
                            </div>
                            <input
                                id="name"
                                className="input-field ml-0 p-2"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <Mail size={16} />
                                <label htmlFor="email" className="text-sm">Email:</label>
                            </div>
                            <input
                                id="email"
                                className="input-field ml-0 p-2"
                                value={formData.email}
                                onChange={handleChange}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <Phone size={16} />
                                <label htmlFor="phone" className="text-sm">Phone:</label>
                            </div>
                            <input
                                id="phone"
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
                        <div className="flex flex-col">
                            <div className="flex">
                                <Users size={16} />
                                <label htmlFor="department" className="text-sm">Department:</label>
                            </div>
                            <input
                                id="department"
                                className="input-field ml-0 p-2"
                                value={formData.department}
                                onChange={handleChange}
                                type="text" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex">
                                <BookOpen size={16} />
                                <label htmlFor="courses" className="text-sm">Courses:</label>
                            </div>
                            <Select
                                isMulti
                                name="courses"
                                options={courses}
                                className="text-black"
                                placeholder="Select courses..."
                                onChange={handleCourseChange}
                            />
                        </div>
                        <div>
                            <Select
                                name="department"
                                options={departments.map((dept) => ({ value: dept, label: dept }))}
                                className="text-black"
                                placeholder="Select department..."
                                onChange={handleDptChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="font-bold text-2xl">Courses:</div>
                        {formData.courses.map((course, idx) => {
                            const courseLabel = courses.find((c) => c.value === course)?.label;
                            return (
                                <ul className="flex flex-row gap-2">
                                    <li key={idx}>{courseLabel}</li>
                                    <div className="hover:cursor-pointer"><X className="text-red-600" onClick={() => removeCourse(course)} /></div>
                                </ul>
                            )
                        })}
                    </div>
                    <div className="justify-end">
                        <button
                            className="action-accept"
                            onClick={handleSubmit}
                        >Save Changes</button>
                        <button
                            className="action-decline ml-4"
                            onClick={onClose}
                        >Cancel</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
