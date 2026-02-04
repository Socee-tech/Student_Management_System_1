import { motion as Motion } from "framer-motion";
import {
  BookA,
  Calendar1Icon,
  Mail,
  PersonStanding,
  PhoneCall,
  Timer,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import API from "../../../API/axios";
import UseNotify from "../../../../snackBar/snackBar";
import Select from "react-select";
import CircularIndeterminate from "../../circularProgress";
export default function AddStudent({ onClose, refresh }) {
  const { notifySuccess, notifyError } = UseNotify();
  const [departments, setDepartments] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    department: "",
    year: "",
    gender: "",
    email: "",
    phone: "",
    admDate: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const fetchDepartments = async () => {
    try {
      const res = await API.get("/departments");
      const deptOptions = res.data.map((dept) => ({
        value: dept._id,
        label: dept.name,
      }));
      setDepartments(deptOptions);
    } catch (error) {
      console.error("error fetching departments", error);
    }
  };
  const handleDepartmentChange = (selectedOption) => {
    setFormData({
      ...formData,
      department: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/students", formData);
      if (res) {
        setLoading(false);
        refresh((prev) => !prev);
        notifySuccess("Student added successfully");
        setFormData({
          name: "",
          regNo: "",
          department: "",
          year: "",
          gender: "",
          email: "",
          phone: "",
          admDate: "",
        });
        onClose();
      } else {
        setLoading(false);
        notifyError("Failed to add student");
      }
    } catch (error) {
      notifyError("Failed to add student");
      console.error("Error adding student:", error);
    }
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
        className="bg-foreground rounded-2xl w-full max-w-sm md:max-w-2xl shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4 p-5">
          <div className="flex justify-between">
            <div className="font-semibold text-2xl underline">
              Add New Student
            </div>
            <div className="hover:cursor-pointer" onClick={onClose}>
              <X size={24} />
            </div>
          </div>
          <div className="font-semibold">Enter student details below:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="flex flex-col">
              <div className="flex flex-row">
                <User size={16} />
                <label htmlFor="name">Name:</label>
              </div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <User size={16} />
                <label htmlFor="name">RegNo:</label>
              </div>
              <input
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <BookA size={16} />
                <label htmlFor="name">Department:</label>
              </div>
              <div>
                <Select
                  options={departments}
                  onFocus={fetchDepartments}
                  onChange={handleDepartmentChange}
                  className="text-left text-black"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <Timer size={16} />
                <label htmlFor="name">Year:</label>
              </div>
              <input
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                type="text"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <PersonStanding size={16} />
                <label htmlFor="name">Gender:</label>
              </div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                type="text"
              >
                <option value="--select--" className="select-bg">
                  --select--
                </option>
                <option value="Male" className="select-bg">
                  Male
                </option>
                <option value="Female" className="select-bg">
                  Female
                </option>
                <option value="Other" className="select-bg">
                  Other
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <Mail size={16} />
                <label htmlFor="name">Email:</label>
              </div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <PhoneCall size={16} />
                <label htmlFor="name">Phone:</label>
              </div>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field ml-0 p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <Calendar1Icon size={16} />
                <label htmlFor="name">Admission date:</label>
              </div>
              <input
                name="admDate"
                value={formData.admDate}
                onChange={handleDateChange}
                className="input-field ml-0 p-2"
                type="date"
              />
            </div>
          </div>
          <div className="space-x-4">
            <button
              onClick={onClose}
              className="p-2 bg-gray-400 rounded-2xl text-black font-bold text-lg hover:cursor-pointer"
            >
              cancel
            </button>
            <button
              onClick={handleSubmitt}
              className="p-2 bg-green-400 rounded-2xl text-black font-bold text-lg hover:cursor-pointer"
            >
              {Loading ? <CircularIndeterminate /> : "submit"}
            </button>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
