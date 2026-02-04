import { motion as Motion } from "framer-motion";
import { User, X } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../../API/axios";

export default function ViewDepartment({ department, onClose }) {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      const courseOptions = res.data.map((course) => ({
        value: course._id,
        label: course.title,
      }));
      setCourses(courseOptions);
    } catch (error) {
      console.error("error fetching courses", error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

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
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-foreground rounded-2xl shadow-2xl w-full max-w-sm md:max-w-3xl overflow-y-auto"
      >
        <div className="flex flex-col p-4 space-y-4">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold">Department Details</h3>
            <X className="w-6 h-6 hover:cursor-pointer" onClick={onClose} />
          </div>
          <div className="text-2xl font-semibold">
            {department.code} - {department.name}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex border p-2 rounded-2xl md:border-r-0">
              <User size={16} />
              <span className="text-lg font-bold mr-2">H.O.D:</span>
              {department.hod.name}
            </div>
          </div>
          <div className="w-full flex flex-col p-4 text-left space-y-3">
            <h2 className="text-xl font-semibold">Courses:</h2>
            {department.courses.map((course, idx) => {
              const courseLabel = courses.find(
                (c) => c.value === course
              )?.label;
              return (
                <ul className="flex flex-row gap-2">
                  <li key={idx}>{courseLabel}</li>
                </ul>
              );
            })}
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
