import { motion as Motion } from "framer-motion";
import { BookAIcon, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../API/axios";
import Select from "react-select";
import UseNotify from "../../../../snackBar/snackBar";
import CircularIndeterminate from "../../circularProgress";

export default function EditDepartment({ closeModal, department, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    hod: "",
    courses: [],
  });
  useEffect(() => {
    setFormData({
      code: department.code,
      name: department.name,
      hod: "",
      courses: department.courses,
    });
  }, [department]);
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [hod, setHod] = useState(department.hod.name);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCourseChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      courses: selectedOptions.map((option) => option.value),
    }));
  };
  const handleLecturerChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      hod: selectedOption ? selectedOption.value : "",
    }));
    setHod(selectedOption.label);
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/courses");
        const formated = res.data.map((c) => ({
          value: c._id,
          label: c.title,
        }));
        setCourses(formated);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchLecturers = async () => {
      try {
        const res = await API.get("/lecturers");
        const formated = res.data.map((l) => ({
          value: l._id,
          label: l.name,
        }));
        setLecturers(formated);
        setFormData((prev) => ({
          ...prev,
          hod: formated.find((l) => l.label === department.hod.name)?.value,
        }));
      } catch (error) {
        console.error("Error fetching lecturers:", error);
      }
    };

    fetchCourses();
    fetchLecturers();
  }, [department.hod.name]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.put(`/departments/${department.code}`, formData);
      if (res) {
        setLoading(false);
        closeModal();
        refresh((prev) => !prev);
        notifySuccess("Department updated successfully");
      } else {
        setLoading(false);
        notifyError("Failed to update department");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating department:", error);
      notifyError("Error updating department");
    }
  };
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[101]"
    >
      <Motion.div
        initial={{ scale: 0.8, y: -30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-4 p-4">
          <div className="flex flex-row justify-between">
            <div className="font-bold text-2xl">Edit Department</div>
            <div className="hover:cursor-pointer" onClick={closeModal}>
              <X size={24} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="flex flex-col">
              <div className="flex">
                <BookAIcon size={16} />
                <label htmlFor="code" className="text-sm">
                  Code:
                </label>
              </div>
              <input
                name="code"
                className="input-field ml-0 p-2"
                value={formData.code}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <BookAIcon size={16} />
                <label htmlFor="name" className="text-sm">
                  Name:
                </label>
              </div>
              <input
                name="name"
                className="input-field ml-0 p-2"
                value={formData.name}
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <User size={16} />
                <label htmlFor="hod" className="text-sm">
                  H.O.D:
                </label>
              </div>
              <Select
                value={lecturers.filter((l) => hod === l.label)}
                options={lecturers}
                onChange={handleLecturerChange}
                placeholder="Select H.O.D"
                className="text-black"
              />
            </div>
          </div>
          <div className="font-semibold text-2xl items-center">Courses:</div>
          <div>
            <Select
              value={courses.filter((c) => formData.courses.includes(c.value))}
              options={courses}
              isMulti
              onChange={handleCourseChange}
              placeholder="Select Courses"
              className="text-black"
            />
          </div>
          <div className="justify-end">
            <button className="action-accept" onClick={handleSubmit}>
              {Loading ? <CircularIndeterminate /> : "Save Changes"}
            </button>
            <button className="action-decline ml-4" onClick={closeModal}>
              {Loading ? <CircularIndeterminate /> : "Cancel"}
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
