import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";
import Select from "react-select";
import API from "../../../API/axios";
import { useEffect, useState } from "react";
import UseNotify from "../../../../snackBar/snackBar";

export default function AddDepartment({ closeModal, refresh }) {
    const { notifySuccess, notifyError } = UseNotify();
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        hod: "",
        courses: [],
    })
    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleCourseChange = (selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            courses: selectedOptions.map(option => option.value)
        }));
    }
    const handleLecturerChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            hod: selectedOption ? selectedOption.value : ""
        }))
    }
    useEffect(() => {
        fetchCourses();
        fetchLecturers();
    }, []);
    const fetchCourses = async () => {
        try {
            const res = await API.get("/courses");
            const formated = res.data.map(c => ({
                value: c._id,
                label: c.title
            }));
            setCourses(formated);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    }
    const fetchLecturers = async () => {
        try {
            const res = await API.get("/lecturers");
            const formated = res.data.map(l => ({
                value: l._id,
                label: l.name
            }));
            setLecturers(formated);
        } catch (error) {
            console.error("Error fetching lecturers:", error);

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/departments", formData);
            if (res) {
                closeModal();
                notifySuccess("Department added successfully");
                refresh((prev) => !prev);
            } else {
                console.error("Failed to add department");
                notifyError("Failed to add department");
            }
        } catch (error) {
            console.error("Error adding department:", error);
            notifyError("Error adding department");
        }
    }
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-110"
        >
            <Motion.div
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold">Add Department</h2>
                        <X size={24} className="hover:cursor-pointer" onClick={closeModal} />
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <label htmlFor="name" className="text-sm">Name:</label>
                            </div>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field ml-0 p-2"
                                type="text" />
                        </div>
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
                        <div>
                            <Select
                                options={lecturers}
                                onChange={handleLecturerChange}
                                placeholder="Select H.O.D"
                                className="text-black"
                            />
                        </div>
                        <div>
                            <Select
                                options={courses}
                                isMulti
                                onChange={handleCourseChange}
                                placeholder="Select Courses"
                                className="text-black"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button className="action-decline p-2" onClick={closeModal}>Cancel</button>
                        <button className="action-accept" onClick={handleSubmit}>Add Department</button>
                    </div>
                </div>
            </Motion.div>
        </Motion.div>
    )
}