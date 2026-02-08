// src/components/StatCard.jsx
import React from "react";
import { motion as Motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, onClick }) => {
  // Prevent background scrolling when modal is open
  // useEffect(() => {
  //     if (isOpen) {
  //         document.body.style.overflow = "hidden";
  //     } else {
  //         document.body.style.overflow = "auto";
  //     }

  //     return () => {
  //         document.body.style.overflow = "auto";
  //     };
  // }, [isOpen]);

  return (
    <>
      {/* 🔹 Compact Card */}
      <Motion.div
        layout
        onClick={() => onClick(title)}
        className="dark:bg-gray-800 rounded-sm shadow-md hover:shadow-lg cursor-pointer p-2 md:rounded-2xl md:p-4 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-gray-700 dark:text-gray-200 text-medium md:text-lg font-medium">
            {title}
          </h3>
          {Icon && <Icon className="text-indigo-500 w-4 h-4 md:w-6 md:h-6" />}
        </div>

        <Motion.div
          layout
          className="text-4xl font-bold text-gray-900 dark:text-white"
        >
          {value}
        </Motion.div>
      </Motion.div>
    </>
  );
};

export default StatCard;
