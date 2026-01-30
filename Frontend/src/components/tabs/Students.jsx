import { useCallback, useEffect, useState } from "react"
import { EditStudent } from "../modal data/students/editStudent";
import { DeleteStudent } from "../modal data/students/deleteStudent";
import { ViewStudent } from "../modal data/students/viewStudent";
import AddStudent from "../modal data/students/addStudent";
import API from "../../API/axios";
import DotLoader from "../spinner";
import UseNotify from "../../../snackBar/snackBar";




export default function Students() {
    const { notifyError } = UseNotify();
    const [selectedStudent, setSelectedStudent] = useState({ edit: '', delete: '', view: '' });
    const [students1, setStudents1] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState({ name: '', regNo: '', department: '', year: '' });
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const handleClose = () => {
        setSelectedStudent({ edit: '', delete: '', view: '' });
    }
    const handleModalClose = () => { setModalOpen(false) };
    const selectStudent = ({ student, action }) => setSelectedStudent({ ...selectedStudent, [action]: student });
    const students = students1;
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.id]: e.target.value })
    };

    const applyFilters = useCallback(() => {
        let filtered = students;
        if (filter.name) {
            filtered = filtered.filter(student => student.name.toLowerCase().includes(filter.name.toLowerCase()));
        }
        if (filter.regNo) {
            filtered = filtered.filter(student => student.regNo.toLowerCase().includes(filter.regNo.toLowerCase()));
        }
        if (filter.department) {
            filtered = filtered.filter(student => (student.department || '').toLowerCase().includes(filter.department.toLowerCase()));
        }
        if (filter.year) {
            filtered = filtered.filter(student => student.year.toString().toLowerCase().includes(filter.year.toLowerCase()));
        }
        setFilteredStudents(filtered);
    }, [students, filter]);

    useEffect(() => {
        applyFilters();
    }, [filter, students, applyFilters]);

    const fetchStudents = async () => {
        try {
            setIsLoading(true);
            const res = await API.get("/students");
            if (res && res.data) {
                setStudents1(res.data);
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            notifyError("Failed to fetch students");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchStudents();
    }, [refresh]);
    var ID = 1;

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between overflow-auto md:flex-row gap-2 text-left w-full">
                <h2 className="text-xl font-bold">Student List</h2>
                <button
                    className="my-button"
                    onClick={() => setModalOpen(true)}
                >Add Student</button>
            </div>
            <div className="w-full space-y-2 overflow-x-auto flex flex-col md:flex-row gap-2 text-left">
                <div className="flex">
                    <label htmlFor="name" className="text-sm">Search by name:</label>
                    <input
                        id="name"
                        type="text"
                        value={filter.name}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="flex">
                    <label htmlFor="regNo" className="text-sm">Search by regNo:</label>
                    <input
                        id="regNo"
                        type="text"
                        value={filter.regNo}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="flex">
                    <label htmlFor="department" className="text-sm">Filter by department:</label>
                    <input
                        id="department"
                        type="text"
                        value={filter.department}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
                <div className="flex">
                    <label htmlFor="year" className="text-sm">Filter by year:</label>
                    <input
                        id="year"
                        type="number"
                        value={filter.year}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>

            </div>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead className="items-center">
                        <tr className="bg-t-bg">
                            <th className="p-2 text-left">#</th>
                            <th className="p-2 text-left">NAME</th>
                            <th className="p-2 text-left">REG NO</th>
                            <th className="p-2 text-left">DEPARTMENT</th>
                            <th className="p-2 text-left">YEAR</th>
                            <th className="p-2 text-left">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{ID++}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{student.name}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{student.regNo}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{student.department.name}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">{student.year}</td>
                                <td className="border-0 p-2 text-left border-b-2 border-b-primary">
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="action-btn bg-green-600"
                                            onClick={() => selectStudent({ student, action: 'edit' })}
                                        >Edit</button>
                                        <button
                                            type="button"
                                            className="action-btn bg-red-600"
                                            onClick={() => selectStudent({ student, action: 'delete' })}
                                        >Delete</button>
                                        <button
                                            type="button"
                                            className="action-btn bg-blue-600"
                                            onClick={() => selectStudent({ student, action: 'view' })}
                                        >View</button>

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {isLoading && <DotLoader />}
                {selectedStudent.edit && (<EditStudent student={selectedStudent.edit} refresh={setRefresh} onClose={handleClose} />)}
                {selectedStudent.delete && (<DeleteStudent student={selectedStudent.delete} refresh={setRefresh} onClose={handleClose} />)}
                {selectedStudent.view && (<ViewStudent student={selectedStudent.view} onClose={handleClose} />)}
                {modalOpen && (<AddStudent refresh={setRefresh} onClose={handleModalClose} />)}
            </div>
        </div>
    )
}