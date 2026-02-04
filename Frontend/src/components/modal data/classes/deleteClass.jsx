import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";
import { useState } from "react";

export default function DeleteClass({ cls, onClose, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [Loading, setLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await API.delete(`/classes/${encodeURIComponent(cls.code)}`);
      if (res?.data) {
        notifySuccess("Class deleted");
        refresh((prev) => !prev);
        onClose();
      } else {
        notifyError("Failed to delete class");
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error deleting class", e);
      notifyError("Failed to delete class");
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
        className="bg-foreground rounded-2xl w-full max-w-md shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Delete Class</h3>
            <button type="button" onClick={onClose} aria-label="Close">
              <X size={22} />
            </button>
          </div>
          <div className="text-sm">
            Delete <span className="font-semibold">{cls.code}</span> —{" "}
            {cls.title}?
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" className="action-decline" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="action-accept"
              onClick={handleDelete}
            >
              {Loading ? <CircularIndeterminate /> : "Delete Class"}
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
