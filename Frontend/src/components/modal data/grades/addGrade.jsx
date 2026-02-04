import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";

export default function AddGrade({ onClose, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [Loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    course: "",
    department: "",
    lecturer: "",
    academicYear: "",
    semester: "",
    marks: "",
  });

  /* ============================
     FETCH DROPDOWN DATA
  ============================ */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [s, c, d, l] = await Promise.all([
          API.get("/students"),
          API.get("/courses"),
          API.get("/departments"),
          API.get("/lecturers"),
        ]);

        setStudents(s.data || []);
        setCourses(c.data || []);
        setDepartments(d.data || []);
        setLecturers(l.data || []);
      } catch (error) {
        notifyError("Failed to load form data");
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ============================
     SUBMIT
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post("/grades", {
        ...formData,
        marks: Number(formData.marks),
      });

      if (res) {
        refresh((prev) => !prev);
        notifySuccess("Grade added successfully");
        setLoading(false);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      notifyError(error.response?.data?.message || "Failed to add grade");
      console.error("Error adding grade:", error);
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
        className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-4">
          {/* HEADER */}
          <div className="flex justify-between">
            <div className="font-bold text-2xl">Add Grade</div>
            <div className="hover:cursor-pointer" onClick={onClose}>
              <X size={24} />
            </div>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {/* STUDENT */}
            <div className="flex flex-col">
              <label className="text-sm">Student</label>
              <select
                name="student"
                onChange={handleChange}
                className="input-field p-2 ml-0"
              >
                <option value="" className="select-bg">
                  -------Select student-------
                </option>
                {students.map((s) => (
                  <option key={s._id} value={s._id} className="select-bg">
                    {s.name} ({s.regNo})
                  </option>
                ))}
              </select>
            </div>

            {/* COURSE */}
            <div className="flex flex-col">
              <label className="text-sm">Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="input-field p-2 ml-0"
              >
                <option value="" className="select-bg">
                  -------Select course-------
                </option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id} className="select-bg">
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* DEPARTMENT */}
            <div className="flex flex-col">
              <label className="text-sm">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="input-field p-2 ml-0"
              >
                <option value="" className="select-bg">
                  -------Select department-------
                </option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id} className="select-bg">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* LECTURER */}
            <div className="flex flex-col">
              <label className="text-sm">Lecturer</label>
              <select
                name="lecturer"
                value={formData.lecturer}
                onChange={handleChange}
                className="input-field p-2 ml-0"
              >
                <option value="" className="select-bg">
                  -------Select lecturer-------
                </option>
                {lecturers.map((l) => (
                  <option key={l._id} value={l._id} className="select-bg">
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ACADEMIC YEAR */}
            <div className="flex flex-col">
              <label className="text-sm">Academic Year</label>
              <input
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                className="input-field p-2 ml-0"
                type="text"
                placeholder="2024/2025"
              />
            </div>

            {/* SEMESTER */}
            <div className="flex flex-col">
              <label className="text-sm">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="input-field p-2 ml-0"
              >
                <option value="" className="select-bg">
                  -------Select semester-------
                </option>
                <option value="1" className="select-bg">
                  1
                </option>
                <option value="2" className="select-bg">
                  2
                </option>
              </select>
            </div>

            {/* MARKS */}
            <div className="flex flex-col">
              <label className="text-sm">Marks</label>
              <input
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                className="input-field p-2 ml-0"
                type="number"
                min="0"
                max="100"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex flex-row">
              <button
                onClick={handleSubmit}
                className="action-accept ml-auto mt-4 hover:cursor-pointer"
              >
                {Loading ? <CircularIndeterminate /> : "Add Grade"}
              </button>
              <button
                className="action-decline ml-auto mt-4 hover:cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
