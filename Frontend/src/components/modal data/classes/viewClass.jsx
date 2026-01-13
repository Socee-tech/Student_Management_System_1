import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";

export default function ViewClass({ cls, onClose }) {
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[101]"
            onClick={onClose}
        >
            <Motion.div
                initial={{ scale: 0.95, y: -10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                className="bg-foreground rounded-2xl w-full max-w-md shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">Class Details</h3>
                            <div className="text-sm text-primary/70">{cls.code}</div>
                        </div>
                        <button type="button" onClick={onClose} aria-label="Close">
                            <X size={22} />
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full">
                            <tbody>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Title</td>
                                    <td className="tb-td">{cls.title}</td>
                                </tr>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Department</td>
                                    <td className="tb-td">{cls.department?.name || "—"}</td>
                                </tr>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Course</td>
                                    <td className="tb-td">{cls.course?.title || "—"}</td>
                                </tr>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Lecturer</td>
                                    <td className="tb-td">{cls.lecturer?.name || "—"}</td>
                                </tr>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Schedule</td>
                                    <td className="tb-td">{cls.schedule || "—"}</td>
                                </tr>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Room</td>
                                    <td className="tb-td">{cls.room || "—"}</td>
                                </tr>
                                <tr className="odd:bg-t-odd hover:bg-t-hover">
                                    <td className="tb-td font-semibold">Status</td>
                                    <td className="tb-td">{cls.status || "—"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="action-accept" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </Motion.div>
        </Motion.div>
    );
}
