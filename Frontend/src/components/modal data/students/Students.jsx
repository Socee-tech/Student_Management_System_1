import { Filter, Hash } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";


export const StudentList = ({ onCountChage }) => {
    const [filter, setFilter] = useState({regNo: '', course: ''});
    const [filteredStudents, setFilteredStudents] = useState([]);
    const students = useMemo(() => [
        { id: 1, name: 'John Doe', regNo: 'REG123', course: 'Computer Science' },
        { id: 2, name: 'Jane Smith', regNo: 'REG456', course: 'Mathematics' },
        { id: 3, name: 'Alice Johnson', regNo: 'REG789', course: 'Physics' },
    ], []);
    const applyFilters = useCallback(() => {
        let filtered = students;
        if(filter.regNo) {
            filtered = filtered.filter( student => student.regNo.toLowerCase().includes(filter.regNo.toLowerCase()));
        }
        if(filter.course) {
            filtered = filtered.filter( student => student.course.toLowerCase().includes(filter.course.toLowerCase()));
        }
        setFilteredStudents(filtered);
    }, [students, filter]);
    useEffect(() => {
        onCountChage(students.length);
    }, [filteredStudents.length, onCountChage]);

    useEffect(() => {
        applyFilters();
    }, [filter, students, applyFilters]);

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.id]: e.target.value})
    }

    return (
        <div className="space-y-4 flex flex-col items-center justify-center bg-foreground p-4 rounded-2xl text-[1rem] md:text-[1.5rem] transition-all">
            <div className="relative flex flex-col overflow-auto md:flex-row gap-2 text-left w-full">
                <label htmlFor="filter" className="flex ml-0"> <Filter /> Filter By Reg No:</label>
                <input
                    type="text"
                    id="regNo"
                    value={filter.regNo}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-4xl p-2 flex-1"
                />
                <label htmlFor="filter" className="flex ml-0"> <Filter /> Filter By course:</label>
                <input
                    type="text"
                    id="course"
                    value={filter.course}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-4xl p-2 flex-1"
                />
            </div>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full border-b-primary">
                    <thead className="hover:bg-table-hover border-b-4">
                        <tr>
                            <th className="p-2 text-left"><Hash /></th>
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Reg No</th>
                            <th className="p-2 text-left">Course</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {filteredStudents.map((student) => (
                            <tr key={student.id} className="hover:bg-table-hover text-left border-b">
                                <td className="border-collapse border-b-primary p-2">{student.id}</td>
                                <td className="border-collapse border-b-primary p-2">{student.name}</td>
                                <td className="border-collapse border-b-primary p-2">{student.regNo}</td>
                                <td className="border-collapse border-b-primary p-2">{student.course}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}