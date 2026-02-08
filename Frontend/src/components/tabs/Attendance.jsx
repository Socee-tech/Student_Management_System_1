import { useCallback, useEffect, useState } from "react";
import API from "../../API/axios";
import DotLoader from "../spinner";
import AddAttendance from "../modal data/attendance/addAttendance";
import EditAttendance from "../modal data/attendance/editAttendance";
import DeleteAttendance from "../modal data/attendance/deleteAttendance";

function formatDate(value) {
    try {
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return "—";
        return d.toISOString().slice(0, 10);
    } catch {
        return "—";
    }
}

export default function Attendance() {
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filter, setFilter] = useState({ classCode: "", date: "" });
    const [selected, setSelected] = useState({ edit: null, delete: null });
    const [isAddOpen, setIsAddOpen] = useState(false);

    const fetchSessions = async () => {
        try {
            setIsLoading(true);
            const res = await API.get("/attendance");
            setSessions(res?.data || []);
        } catch (e) {
            console.error("Error fetching attendance sessions", e);
        } finally {
            setIsLoading(false);
            setRefresh(false);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, [refresh]);

    const applyFilters = useCallback(() => {
        let next = sessions;
        if (filter.classCode) {
            next = next.filter((s) =>
                ((s.class?.code || "") + " " + (s.class?.title || ""))
                    .toLowerCase()
                    .includes(filter.classCode.toLowerCase())
            );
        }
        if (filter.date) {
            next = next.filter((s) => formatDate(s.date).includes(filter.date));
        }
        setFiltered(next);
    }, [sessions, filter]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const handleChange = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const closeSelected = () => setSelected({ edit: null, delete: null });

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Attendance</h2>
                <button className="my-button" onClick={() => setIsAddOpen(true)}>
                    Add Session
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 text-left w-full">
                <div className="flex">
                    <label htmlFor="classCode" className="text-sm">Search class:</label>
                    <input id="classCode" type="text" className="input-field" value={filter.classCode} onChange={handleChange} />
                </div>
                <div className="flex">
                    <label htmlFor="date" className="text-sm">Filter date:</label>
                    <input id="date" type="text" placeholder="YYYY-MM-DD" className="input-field" value={filter.date} onChange={handleChange} />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-t-bg">
                            <th className="th-tr">Date</th>
                            <th className="th-tr">Class</th>
                            <th className="th-tr">Present</th>
                            <th className="th-tr">Absent</th>
                            <th className="th-tr">Notes</th>
                            <th className="th-tr">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((s) => (
                            <tr key={s._id} className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="tb-td">{formatDate(s.date)}</td>
                                <td className="tb-td">
                                    {(s.class?.code || "").toString()} {s.class?.title ? `— ${s.class.title}` : ""}
                                </td>
                                <td className="tb-td">{s.presentCount ?? 0}</td>
                                <td className="tb-td">{s.absentCount ?? 0}</td>
                                <td className="tb-td whitespace-nowrap">{s.notes || "—"}</td>
                                <td className="tb-td">
                                    <div className="flex gap-2">
                                        <button className="action-btn bg-green-600" onClick={() => setSelected((p) => ({ ...p, edit: s }))}>Edit</button>
                                        <button className="action-btn bg-red-600" onClick={() => setSelected((p) => ({ ...p, delete: s }))}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!isLoading && filtered.length === 0 && (
                            <tr>
                                <td className="tb-td" colSpan={6}>
                                    No attendance sessions yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {isLoading && <DotLoader />}
            </div>

            {isAddOpen && (
                <AddAttendance onClose={() => setIsAddOpen(false)} refresh={setRefresh} />
            )}
            {selected.edit && (
                <EditAttendance session={selected.edit} onClose={closeSelected} refresh={setRefresh} />
            )}
            {selected.delete && (
                <DeleteAttendance session={selected.delete} onClose={closeSelected} refresh={setRefresh} />
            )}
        </div>
    );
}
