import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import EditCourse from "../modal data/courses/editCourse";
import DeleteCourse from "../modal data/courses/deleteCourse";
import AddCourse from "../modal data/courses/addCourse";
import API from "../../API/axios";
import UseNotify from "../../../snackBar/snackBar";



export default function Courses() {
    const { notifySuccess, notifyError } = UseNotify();
    const [courses1, setCourses1] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({ edit: '', delete: '' });
    const selectCourse = ({ course, action }) => setSelectedCourse({ ...selectedCourse, [action]: course });
    const handleClose = () => setSelectedCourse({ edit: '', delete: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => setModalOpen(false);
    const [filter, setFilter] = useState({ code: '', title: '' });
    const [filteredCourses, setFilteredCourses] = useState([]);
    const courses = courses1;

    const applyFilters = useCallback(() => {
        let filtered = courses;
        if (filter.code) {
            filtered = filtered.filter(course => course.code.toLowerCase().includes(filter.code.toLowerCase()));
        }
        if (filter.title) {
            filtered = filtered.filter(course => course.title.toLowerCase().includes(filter.title.toLowerCase()));
        }
        setFilteredCourses(filtered);
    }, [filter, courses]);
    useEffect(() => {
        applyFilters();
    }, [filter, applyFilters]);
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.id]: e.target.value });
    }
    useEffect(() => {
        fetchCourses();
    }, [modalOpen, selectedCourse.edit, selectedCourse.delete]);
    const fetchCourses = async () => {
        try {
            const res = await API.get("/courses");
            if (res && res.data) {
                setCourses1(res.data);;
            } else {
                notifyError("Failed to fetch courses");
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            notifyError("Failed to fetch courses");
        }
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
                <h3 className="text-xl font-bold">Courses</h3>
                <button
                    onClick={() => setModalOpen(true)}
                    className="my-button">Add Course</button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 text-left w-full">
                <div className="flex">
                    <label htmlFor="code" className="text-sm">Search by code:</label>
                    <input
                        id="code"
                        type="text"
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="flex">
                    <label htmlFor="title" className="text-sm">Search by title:</label>
                    <input
                        id="title"
                        type="text"
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-t-bg">
                            <th className="px-2 py-2 text-left">#</th>
                            <th className="px-2 py-2 text-left">Course Code</th>
                            <th className="px-2 py-2 text-left">Course Title</th>
                            <th className="px-2 py-2 text-left">Credits</th>
                            <th className="px-2 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses.map((course, index) => (
                            <tr key={index} className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{index + 1}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{course.code}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{course.title}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{course.credits}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => selectCourse({ course, action: 'edit' })}
                                            className="action-btn bg-green-600">Edit</button>
                                        <button
                                            onClick={() => selectCourse({ course, action: 'delete' })}
                                            className="action-btn bg-red-600">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedCourse.edit && (<EditCourse course={selectedCourse.edit} onclose={handleClose} />)}
                {selectedCourse.delete && (<DeleteCourse course={selectedCourse.delete} onCLose={handleClose} />)}
                {modalOpen && (<AddCourse onClose={handleModalClose} />)}
            </div>
        </div>
    )
}