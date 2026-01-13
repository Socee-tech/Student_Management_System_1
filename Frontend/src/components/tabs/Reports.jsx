import { useEffect, useMemo, useState } from "react";
import API from "../../API/axios";
import DotLoader from "../spinner";

function groupCounts(items, getKey) {
    const map = new Map();
    for (const item of items) {
        const key = (getKey(item) || "Unassigned").toString().trim() || "Unassigned";
        map.set(key, (map.get(key) || 0) + 1);
    }
    return [...map.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export default function Reports() {
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setIsLoading(true);
                const [studentsRes, lecturersRes] = await Promise.all([
                    API.get("/students"),
                    API.get("/lecturers/dpt"),
                ]);

                setStudents(studentsRes?.data || []);
                setLecturers(lecturersRes?.data || []);
            } catch (e) {
                console.error("Failed to fetch reports data", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAll();
    }, []);

    const studentsByDepartment = useMemo(
        () => groupCounts(students, (s) => s.department),
        [students]
    );

    const lecturersByDepartment = useMemo(
        () =>
            groupCounts(lecturers, (l) => {
                if (typeof l.department === "string") return l.department;
                return l?.department?.name;
            }),
        [lecturers]
    );

    return (
        <div className="space-y-6 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Reports</h2>
                <div className="text-sm text-primary/70">Summary tables</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <section className="bg-t-bg/20 rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Students by Department</h3>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-t-bg">
                                    <th className="th-tr">Department</th>
                                    <th className="th-tr">Students</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsByDepartment.map((row) => (
                                    <tr key={row.name} className="odd:bg-t-odd hover:bg-t-hover">
                                        <td className="tb-td">{row.name}</td>
                                        <td className="tb-td">{row.count}</td>
                                    </tr>
                                ))}
                                {!isLoading && studentsByDepartment.length === 0 && (
                                    <tr>
                                        <td className="tb-td" colSpan={2}>
                                            No students yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="bg-t-bg/20 rounded-xl p-4">
                    <h3 className="font-semibold mb-3">Lecturers by Department</h3>
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-t-bg">
                                    <th className="th-tr">Department</th>
                                    <th className="th-tr">Lecturers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lecturersByDepartment.map((row) => (
                                    <tr key={row.name} className="odd:bg-t-odd hover:bg-t-hover">
                                        <td className="tb-td">{row.name}</td>
                                        <td className="tb-td">{row.count}</td>
                                    </tr>
                                ))}
                                {!isLoading && lecturersByDepartment.length === 0 && (
                                    <tr>
                                        <td className="tb-td" colSpan={2}>
                                            No lecturers yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {isLoading && <DotLoader />}
        </div>
    );
}
