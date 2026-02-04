import { motion as Motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { X } from "lucide-react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";

export default function EditClass({ cls, onClose, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [Loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [formData, setFormData] = useState({
    title: cls.title || "",
    department: cls.department?._id || cls.department || "",
    course: cls.course?._id || cls.course || "",
    lecturer: cls.lecturer?._id || cls.lecturer || "",
    semester: cls.semester || "",
    year: cls.year ?? "",
    room: cls.room || "",
    schedule: cls.schedule || "",
    status: cls.status || "Active",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [deptRes, courseRes, lecRes] = await Promise.all([
          API.get("/departments"),
          API.get("/courses"),
          API.get("/lecturers"),
        ]);

        setDepartments(
          (deptRes?.data || []).map((d) => ({
            value: d._id,
            label: `${d.name} (${d.code})`,
          }))
        );
        setCourses(
          (courseRes?.data || []).map((c) => ({
            value: c._id,
            label: `${c.title} (${c.code})`,
          }))
        );
        setLecturers(
          (lecRes?.data || []).map((l) => ({
            value: l._id,
            label: `${l.name} (${l.LecID})`,
          }))
        );
      } catch (e) {
        console.error("Failed to load class options", e);
      }
    };

    fetchOptions();
  }, []);

  const selectStyles = useMemo(
    () => ({
      control: (base) => ({ ...base, minHeight: 40 }),
    }),
    []
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...formData,
        year: formData.year === "" ? undefined : Number(formData.year),
      };
      const res = await API.put(
        `/classes/${encodeURIComponent(cls.code)}`,
        payload
      );
      if (res?.data) {
        notifySuccess("Class updated");
        refresh((prev) => !prev);
        onClose();
      } else {
        notifyError("Failed to update class");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error updating class", err);
      notifyError("Failed to update class");
    }
  };

  const findOpt = (options, value) =>
    options.find((o) => o.value === value) || null;

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
        className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-3xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Edit Class</h3>
              <div className="text-sm text-primary/70">{cls.code}</div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="hover:cursor-pointer"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col md:col-span-3">
              <label className="text-sm">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Department</label>
              <Select
                styles={selectStyles}
                options={departments}
                className="text-black"
                value={findOpt(departments, formData.department)}
                placeholder="Select department..."
                onChange={(opt) =>
                  setFormData((p) => ({ ...p, department: opt?.value || "" }))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Course</label>
              <Select
                styles={selectStyles}
                options={courses}
                className="text-black"
                value={findOpt(courses, formData.course)}
                placeholder="Select course..."
                onChange={(opt) =>
                  setFormData((p) => ({ ...p, course: opt?.value || "" }))
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Lecturer</label>
              <Select
                styles={selectStyles}
                options={lecturers}
                className="text-black"
                value={findOpt(lecturers, formData.lecturer)}
                placeholder="Select lecturer..."
                onChange={(opt) =>
                  setFormData((p) => ({ ...p, lecturer: opt?.value || "" }))
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm">Semester</label>
              <input
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Year</label>
              <input
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Room</label>
              <input
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm">Schedule</label>
              <input
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field ml-0 p-2"
              >
                <option value="Active" className="select-bg">
                  Active
                </option>
                <option value="Inactive" className="select-bg">
                  Inactive
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-3 md:col-span-3 pt-2">
              <button
                type="button"
                className="action-decline"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="action-accept">
                {Loading ? <CircularIndeterminate /> : " Save "}
              </button>
            </div>
          </form>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
