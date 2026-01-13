import { useCallback, useEffect, useState } from "react"
import EditLecturer from "../modal data/lecturers/editLecturer";
import DeleteLec from "../modal data/lecturers/deleteLec";
import ViewLec from "../modal data/lecturers/viewLec";
import AddLecturer from "../modal data/lecturers/addLecturer";
import API from "../../API/axios";
import DotLoader from "../spinner";
import UseNotify from "../../../snackBar/snackBar";




export const Lecturers = () => {
    const { notifyError } = UseNotify();
    const [refresh, setRefresh] = useState(false);
    const [filter, setFilter] = useState({ id: '', name: '', department: '', email: '', phone: '' });
    const [filteredLecs, setFilteredLecs] = useState([]);
    const [selectedLec, setSelectedLec] = useState({ edit: '', delete: '', view: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Lecturers, setLecturers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleClose1 = () => setIsModalOpen(false);
    const selectLec = ({ lec, action }) => setSelectedLec({ ...selectedLec, [action]: lec });
    const handleClose = () => {
        setSelectedLec({ edit: '', delete: '', view: '' });
    }
    const applyFilters = useCallback(() => {
        let filtered = Lecturers;
        if (filter.name) {
            filtered = filtered.filter(lec => lec.name.toLowerCase().includes(filter.name.toLowerCase()));
        }
        if (filter.department) {
            filtered = filtered.filter(lec => lec.department.toLowerCase().includes(filter.department.toLowerCase()));
        }
        if (filter.email) {
            filtered = filtered.filter(lec => lec.email.toLowerCase().includes(filter.email.toLowerCase()));
        }
        if (filter.phone) {
            filtered = filtered.filter(lec => lec.phone.includes(filter.phone))
        }
        if (filter.id) {
            filtered = filtered.filter(lec => lec.LecID.toLowerCase().includes(filter.id.toLowerCase()));
        }
        setFilteredLecs(filtered);
    }, [Lecturers, filter]);
    useEffect(() => {
        applyFilters();
    }, [filter, Lecturers, applyFilters]);
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.id]: e.target.value });
    }
    const fetchLecturers = async () => {
        try {
            setIsLoading(true);
            const res = await API.get("/lecturers/dpt");
            setLecturers(res.data);
        } catch (error) {
            console.error("Error fetching lecturers:", error);
            notifyError("Failed to fetch students");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchLecturers();
    }, [refresh]);
    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Lecturers</h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="my-button">Add Lecturer</button>
            </div>
            <div className="w-full overflow-auto flex flex-col md:flex-row gap-2 text-left">
                <div className="flex gap-2">
                    <label htmlFor="id" className="text-sm">Search by ID:</label>
                    <input
                        id="id"
                        type="text"
                        className="input-field"
                        value={filter.id}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="name" className="text-sm">Search by name:</label>
                    <input
                        id="name"
                        type="text"
                        className="input-field"
                        value={filter.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="department" className="text-sm">Filter by department:</label>
                    <input
                        id="department"
                        type="text"
                        className="input-field"
                        value={filter.department}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="email" className="text-sm">Search by email:</label>
                    <input
                        id="email"
                        type="text"
                        className="input-field"
                        value={filter.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2">
                    <label htmlFor="phone" className="text-sm">Search by phone:</label>
                    <input
                        id="phone"
                        type="text"
                        className="input-field"
                        value={filter.phone}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-t-bg">
                            <th className="p-2 text-left">LECTURER ID</th>
                            <th className="p-2 text-left">NAME</th>
                            <th className="p-2 text-left">DEPARTMENT</th>
                            <th className="p-2 text-left">EMAIL</th>
                            <th className="p-2 text-left">PHONE</th>
                            <th className="p-2 text-left">STATUS</th>
                            <th className="p-2 text-left">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLecs.map((lec) => (
                            <tr key={lec.LecID} className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{lec.LecID}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{lec.name}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{lec.department.name ? lec.department.name : "No department assigned"}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{lec.email}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{lec.phone}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{lec.status}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => selectLec({ lec, action: 'edit' })}
                                            className="action-btn bg-green-600"
                                        >Edit</button>
                                        <button
                                            onClick={() => selectLec({ lec, action: 'delete' })}
                                            className="action-btn bg-red-600"
                                        >Delete</button>
                                        <button
                                            onClick={() => selectLec({ lec, action: 'view' })}
                                            className="action-btn bg-blue-600"
                                        >View</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isLoading && <DotLoader />}
            {selectedLec.edit && (<EditLecturer lecturer={selectedLec.edit} refresh={setRefresh} onClose={handleClose} />)}
            {selectedLec.delete && (<DeleteLec lecturer={selectedLec.delete} refresh={setRefresh} onClose={handleClose} />)}
            {selectedLec.view && (<ViewLec lecturer={selectedLec.view} onClose={handleClose} />)}
            {isModalOpen && (<AddLecturer refresh={setRefresh} onClose={handleClose1} />)}
        </div>
    )
}