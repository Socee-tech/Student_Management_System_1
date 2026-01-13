import { useCallback, useEffect, useState } from "react";
import API from "../../API/axios";
import DotLoader from "../spinner";
import AddClass from "../modal data/classes/addClass";
import EditClass from "../modal data/classes/editClass";
import DeleteClass from "../modal data/classes/deleteClass";
import ViewClass from "../modal data/classes/viewClass";

export default function Classes() {
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [classes, setClasses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filter, setFilter] = useState({ code: "", title: "" });
    const [selected, setSelected] = useState({ edit: null, delete: null, view: null });
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleCloseSelected = () => setSelected({ edit: null, delete: null, view: null });

    const fetchClasses = async () => {
        try {
            setIsLoading(true);
            const res = await API.get("/classes");
            setClasses(res?.data || []);
        } catch (e) {
            console.error("Error fetching classes", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClasses();
    }, [refresh]);

    const applyFilters = useCallback(() => {
        let next = classes;
        if (filter.code) {
            next = next.filter((c) => (c.code || "").toLowerCase().includes(filter.code.toLowerCase()));
        }
        if (filter.title) {
            next = next.filter((c) => (c.title || "").toLowerCase().includes(filter.title.toLowerCase()));
        }
        setFiltered(next);
    }, [classes, filter]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const handleChange = (e) => {
        setFilter((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Classes</h2>
                <button className="my-button" onClick={() => setIsAddOpen(true)}>
                    Add Class
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 text-left w-full">
                <div className="flex">
                    <label htmlFor="code" className="text-sm">Search by code:</label>
                    <input id="code" type="text" className="input-field" value={filter.code} onChange={handleChange} />
                </div>
                <div className="flex">
                    <label htmlFor="title" className="text-sm">Search by title:</label>
                    <input id="title" type="text" className="input-field" value={filter.title} onChange={handleChange} />
                </div>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-t-bg">
                            <th className="th-tr">Code</th>
                            <th className="th-tr">Title</th>
                            <th className="th-tr">Department</th>
                            <th className="th-tr">Course</th>
                            <th className="th-tr">Lecturer</th>
                            <th className="th-tr">Schedule</th>
                            <th className="th-tr">Room</th>
                            <th className="th-tr">Status</th>
                            <th className="th-tr">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((cls) => (
                            <tr key={cls._id} className="odd:bg-t-odd hover:bg-t-hover">
                                <td className="tb-td">{cls.code}</td>
                                <td className="tb-td">{cls.title}</td>
                                <td className="tb-td">{cls.department?.name || "—"}</td>
                                <td className="tb-td">{cls.course?.title || "—"}</td>
                                <td className="tb-td">{cls.lecturer?.name || "—"}</td>
                                <td className="tb-td">{cls.schedule || "—"}</td>
                                <td className="tb-td">{cls.room || "—"}</td>
                                <td className="tb-td">{cls.status || "—"}</td>
                                <td className="tb-td">
                                    <div className="flex gap-2">
                                        <button className="action-btn bg-blue-600" onClick={() => setSelected((p) => ({ ...p, view: cls }))}>View</button>
                                        <button className="action-btn bg-green-600" onClick={() => setSelected((p) => ({ ...p, edit: cls }))}>Edit</button>
                                        <button className="action-btn bg-red-600" onClick={() => setSelected((p) => ({ ...p, delete: cls }))}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!isLoading && filtered.length === 0 && (
                            <tr>
                                <td className="tb-td" colSpan={9}>
                                    No classes yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {isLoading && <DotLoader />}
            </div>

            {isAddOpen && (
                <AddClass onClose={() => setIsAddOpen(false)} refresh={setRefresh} />
            )}
            {selected.view && (
                <ViewClass cls={selected.view} onClose={handleCloseSelected} />
            )}
            {selected.edit && (
                <EditClass cls={selected.edit} onClose={handleCloseSelected} refresh={setRefresh} />
            )}
            {selected.delete && (
                <DeleteClass cls={selected.delete} onClose={handleCloseSelected} refresh={setRefresh} />
            )}
        </div>
    );
}
