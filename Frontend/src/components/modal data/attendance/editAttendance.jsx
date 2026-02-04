import { motion as Motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { X } from "lucide-react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";

function toDateInput(value) {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
  } catch {
    return "";
  }
}

export default function EditAttendance({ session, onClose, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [classes, setClasses] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    class: session.class?._id || session.class || "",
    date: toDateInput(session.date),
    presentCount: session.presentCount ?? 0,
    absentCount: session.absentCount ?? 0,
    notes: session.notes || "",
  });

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/classes");
        setClasses(
          (res?.data || []).map((c) => ({
            value: c._id,
            label: `${c.code} — ${c.title}`,
          }))
        );
      } catch (e) {
        console.error("Failed to fetch classes", e);
      }
    };
    fetchClasses();
  }, []);

  const selectStyles = useMemo(
    () => ({
      control: (base) => ({ ...base, minHeight: 40 }),
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        date: formData.date ? new Date(formData.date).toISOString() : undefined,
      };
      const res = await API.put(
        `/attendance/${encodeURIComponent(session._id)}`,
        payload
      );
      if (res?.data) {
        setLoading(false);
        notifySuccess("Attendance session updated");
        refresh((prev) => !prev);
        onClose();
      } else {
        setLoading(false);
        notifyError("Failed to update session");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error updating attendance", err);
      notifyError("Failed to update session");
    }
  };

  const currentClass = classes.find((c) => c.value === formData.class) || null;

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
        className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Edit Attendance Session</h3>
            <button type="button" onClick={onClose} aria-label="Close">
              <X size={22} />
            </button>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:col-span-2">
              <label className="text-sm">Class</label>
              <Select
                styles={selectStyles}
                options={classes}
                className="text-black"
                value={currentClass}
                placeholder="Select class..."
                onChange={(opt) =>
                  setFormData((p) => ({ ...p, class: opt?.value || "" }))
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Date</label>
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Present</label>
              <input
                name="presentCount"
                type="number"
                value={formData.presentCount}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Absent</label>
              <input
                name="absentCount"
                type="number"
                value={formData.absentCount}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm">Notes</label>
              <input
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                placeholder="Optional"
              />
            </div>

            <div className="flex justify-end gap-3 md:col-span-2 pt-2">
              <button
                type="button"
                className="action-decline"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="action-accept">
                {Loading ? <CircularIndeterminate /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
