import { motion as Motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";

export default function EditGrade({ grade, onClose, refresh }) {
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

  /* ============================
     PREFILL FORM
  ============================ */
  useEffect(() => {
    if (grade) {
      setFormData({
        student: grade.student?._id || grade.student,
        course: grade.course?._id || grade.course,
        department: grade.department?._id || grade.department,
        lecturer: grade.lecturer?._id || grade.lecturer,
        academicYear: grade.academicYear,
        semester: grade.semester,
        marks: grade.marks,
      });
    }
  }, [grade]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ============================
     SUBMIT UPDATE
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.put(`/grades/${grade._id}`, {
        ...formData,
        marks: Number(formData.marks), // IMPORTANT
      });

      if (res) {
        refresh((prev) => !prev);
        notifySuccess("Grade updated successfully");
        setLoading(false);
        onClose();
      }
    } catch (error) {
      setLoading(false);
      notifyError(error.response?.data?.message || "Failed to update grade");
      console.error("Error updating grade:", error);
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
        className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-3xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-4">
          {/* HEADER */}
          <div className="flex justify-between">
            <div className="font-bold text-2xl">Edit Grade</div>
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
                value={formData.student}
                onChange={handleChange}
                className="input-field p-2"
              >
                <option value="" className="select-bg">
                  Select student
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
                className="input-field p-2"
              >
                <option value="" className="select-bg">
                  Select course
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
                className="input-field p-2"
              >
                <option value="" className="select-bg">
                  Select department
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
                className="input-field p-2"
              >
                <option value="" className="select-bg">
                  Select lecturer
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
                className="input-field p-2"
                type="text"
              />
            </div>

            {/* SEMESTER */}
            <div className="flex flex-col">
              <label className="text-sm">Semester</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="input-field p-2"
              >
                <option value="" className="select-bg">
                  Select semester
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
                className="input-field p-2"
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
                {Loading ? <CircularIndeterminate /> : "Update Grade"}
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
