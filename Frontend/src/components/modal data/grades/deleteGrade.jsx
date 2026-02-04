import { motion as Motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";

export default function DeleteGrade({ grade, onClose, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [Loading, setLoading] = useState(false);

  /* ============================
     DELETE HANDLER
  ============================ */
  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await API.delete(`/grades/${grade._id}`);

      if (res) {
        refresh((prev) => !prev);
        notifySuccess("Grade deleted successfully");
        setLoading(false);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      notifyError(error.response?.data?.message || "Failed to delete grade");
      console.error("Error deleting grade:", error);
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
        initial={{ scale: 0.8, y: -30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-foreground rounded-2xl w-full max-w-sm shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl text-red-500">Delete Grade</div>
            <div className="hover:cursor-pointer" onClick={onClose}>
              <X size={24} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="text-sm text-muted-foreground">
            Are you sure you want to delete this grade?
          </div>

          {/* PREVIEW INFO */}
          <div className="rounded-lg border p-3 text-sm bg-muted/40">
            <div>
              <b>Student:</b> {grade.student?.name}
            </div>
            <div>
              <b>Course:</b> {grade.course?.title}
            </div>
            <div>
              <b>Marks:</b> {grade.marks}
            </div>
            <div>
              <b>Grade:</b> {grade.grade}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 justify-end mt-2">
            <button
              className="action-decline hover:cursor-pointer"
              onClick={onClose}
              disabled={Loading}
            >
              Cancel
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 disabled:opacity-50"
              onClick={handleDelete}
              disabled={Loading}
            >
              {Loading ? (
                <CircularIndeterminate />
              ) : (
                <>
                  <Trash2 size={16} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
