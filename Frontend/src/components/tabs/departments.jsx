import { useCallback, useEffect, useState } from "react";
import API from "../../API/axios";
import DotLoader from "../spinner";
import AddDepartment from "../modal data/departments/addDepartment";
import EditDepartment from "../modal data/departments/editDepartment";
import DeleteDepartment from "../modal data/departments/deleteDepartment";
import ViewDepartment from "../modal data/departments/viewDepartment";



export default function Departments() {
    const [fetch, setFetch] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState({ edit: '', delete: '', view: '', add: '' });
    const handleClose = () => setSelectedDepartment({ edit: '', delete: '', view: '', add: '' });
    const [departments, setDepartments] = useState([]);
    const [filter, setFilter] = useState({ code: '', title: '' });
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const applyFilters = useCallback(() => {
        let filtered = departments;
        if (filter.code) {
            filtered = filtered.filter(dept => dept.code.toLowerCase().includes(filter.code.toLowerCase()));
        }
        if (filter.title) {
            filtered = filtered.filter(dept => dept.name.toLowerCase().includes(filter.title.toLowerCase()));
        }
        setFilteredDepartments(filtered);
    }, [departments, filter]);
    useEffect(() => {
        applyFilters();
    }, [filter, departments, applyFilters]);
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.id]: e.target.value });
    }
    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const res = await API.get("/departments/hod");
            setDepartments(res.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDepartments();
    }, [fetch]);

    return (
        <div className="flex flex-col space-y-4 p-1">
            <div className="flex flex-row justify-between">
                <h2 className="text-xl font-bold">Departments</h2>
                <button
                    onClick={() => setSelectedDepartment({ ...selectedDepartment, add: true })}
                    className="my-button"
                >Add Department</button>
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
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-t-bg">
                            <th className="th-tr">#</th>
                            <th className="th-tr">Department Code</th>
                            <th className="th-tr">Department Title</th>
                            <th className="th-tr">H.O.D</th>
                            <th className="th-tr">Courses</th>
                            <th className="th-tr">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDepartments.map((department, index) => (
                            <tr key={index} className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="tb-td">{index + 1}</td>
                                <td className="tb-td">{department.code}</td>
                                <td className="tb-td">{department.name}</td>
                                <td className="tb-td">{department.hod.name ? department.hod.name : "No HOD assigned"}</td>
                                <td className="tb-td">{department.courses.length}</td>
                                <td className="tb-td">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedDepartment({ ...selectedDepartment, edit: department })}
                                            className="action-btn bg-green-600"
                                        >Edit</button>
                                        <button
                                            onClick={() => setSelectedDepartment({ ...selectedDepartment, delete: department })}
                                            className="action-btn bg-red-600"
                                        >Delete</button>
                                        <button
                                            onClick={() => setSelectedDepartment({ ...selectedDepartment, view: department })}
                                            className="action-btn bg-blue-600"
                                        >View</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && (<DotLoader />)}
                {selectedDepartment.add && (<AddDepartment closeModal={handleClose} refresh={setFetch} />)}
                {selectedDepartment.edit && (<EditDepartment closeModal={handleClose} department={selectedDepartment.edit} refresh={setFetch} />)}
                {selectedDepartment.delete && (<DeleteDepartment onClose={handleClose} department={selectedDepartment.delete} refresh={setFetch} />)}
                {selectedDepartment.view && (<ViewDepartment onClose={handleClose} department={selectedDepartment.view} />)}
            </div>
        </div>
    )
}