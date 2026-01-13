import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";

export default function DeleteAttendance({ session, onClose, refresh }) {
    const { notifySuccess, notifyError } = UseNotify();

    const handleDelete = async () => {
        try {
            const res = await API.delete(`/attendance/${encodeURIComponent(session._id)}`);
            if (res?.data) {
                notifySuccess("Attendance session deleted");
                refresh((prev) => !prev);
                onClose();
            } else {
                notifyError("Failed to delete session");
            }
        } catch (e) {
            console.error("Error deleting attendance", e);
            notifyError("Failed to delete session");
        }
    };

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
                        <h3 className="text-xl font-bold">Delete Attendance Session</h3>
                        <button type="button" onClick={onClose} aria-label="Close">
                            <X size={22} />
                        </button>
                    </div>
                    <div className="text-sm">
                        Delete this attendance session?
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" className="action-decline" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="button" className="action-accept" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            </Motion.div>
        </Motion.div>
    );
}
