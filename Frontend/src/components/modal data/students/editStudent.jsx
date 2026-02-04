import { motion as Motion } from "framer-motion";
import { Book, Calendar, Mail, Phone, User, X } from "lucide-react";
import { useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import Select from "react-select";
import { useEffect } from "react";
import CircularIndeterminate from "../../circularProgress";

export const EditStudent = ({ student, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    department: "",
    year: student.year,
    admDate: student.admDate,
    gender: student.gender,
    email: student.email,
    phone: student.phone,
  });
  const [departments, setDepartments] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [dpt, setDpt] = useState(student.department.name || "");
  const { notifySuccess, notifyError } = UseNotify();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      const deptOptions = res.data.map((dept) => ({
        value: dept._id,
        label: dept.name,
      }));
      setDepartments(deptOptions);

      const defaultDeptId =
        deptOptions.find((d) => d.label === student.department.name)?.value ||
        "";
      setFormData((prev) => ({
        ...prev,
        department: prev.department || defaultDeptId,
      }));
    } catch (error) {
      console.error("error fetching departments", error);
    }
  };
  const handleDepartmentChange = (selectedOption) => {
    setFormData({
      ...formData,
      department: selectedOption ? selectedOption.value : "",
    });
    setDpt(selectedOption ? selectedOption.label : "");
  };
  function calculateYear(admData) {
    if (!admData) return null;

    const admDate = new Date(admData);
    const today = new Date();

    let yearDiff = today.getFullYear() - admDate.getFullYear();

    const hasReachedAniversary =
      today.getMonth() > admDate.getMonth() ||
      (today.getMonth() === admDate.getMonth() &&
        today.getDate() >= admDate.getDate());

    if (!hasReachedAniversary) {
      yearDiff -= 1;
    }

    return Math.max(yearDiff + 1, 1);
  }
  const handleDateChange = (e) => {
    const date = e.target.value;
    const year = calculateYear(date);
    setFormData({ ...formData, year: year, admDate: date });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.put(
        `/students/${encodeURIComponent(student.regNo)}`,
        formData
      );
      if (res) {
        setLoading(false);
        refresh((prev) => !prev);
        notifySuccess("Student updated successfully");
        onClose();
      } else {
        notifyError("Failed to update student");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating student:", error);
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
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, y: -30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="bg-foreground rounded-2xl shadow-lg w-full max-w-sm p-4 md:max-w-4xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Student</h3>
          <X onClick={onClose} size={22} className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex text-xl mb-8 w-full items-center justify-center">
          <span className="text-lg font-bold mr-2">REG NO:</span>
          {student.regNo}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-2xl">
          <div className="flex flex-col">
            <div className="flex text-left">
              <User size={16} />
              <label htmlFor="name" className="text-sm">
                Name:
              </label>
            </div>
            <input
              type="text"
              id="name"
              className="input-field ml-0 p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-left">
              <Book size={16} />
              <label htmlFor="department" className="text-sm">
                Department:
              </label>
            </div>
            <div>
              <Select
                name="department"
                value={departments.filter((dept) => dpt === dept.label)}
                options={departments}
                onChange={handleDepartmentChange}
                className="text-left text-black"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex text-left">
              <User size={16} />
              <label htmlFor="year" className="text-sm">
                Year:
              </label>
            </div>
            <input
              type="number"
              id="year"
              className="input-field ml-0 p-2"
              value={formData.year}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-left">
              <User size={16} />
              <label htmlFor="gender" className="text-sm">
                Gender:
              </label>
            </div>
            <input
              type="text"
              id="gender"
              className="input-field ml-0 p-2"
              value={formData.gender}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-left">
              <Calendar size={16} />
              <label htmlFor="date" className="text-sm">
                Date enrolled:
              </label>
            </div>
            <input
              type="date"
              id="admDate"
              className="input-field ml-0 p-2 text-[1.2rem]"
              value={formData.admDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-left">
              <Mail size={16} />
              <label htmlFor="email" className="text-sm">
                Email:
              </label>
            </div>
            <input
              type="text"
              id="email"
              className="input-field ml-0 p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex text-left">
              <Phone size={16} />
              <label htmlFor="phone" className="text-sm">
                Phone:
              </label>
            </div>
            <input
              type="text"
              id="phone"
              className="input-field ml-0 p-2"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row gap-4 p-2">
            <button
              className="action-decline hover:cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="action-accept hover:cursor-pointer"
              onClick={handleSubmit}
            >
              {Loading ? <CircularIndeterminate /> : "Save"}
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
};
