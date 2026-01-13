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
                className="dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg cursor-pointer p-4 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
                        {title}
                    </h3>
                    {Icon && <Icon className="text-indigo-500 w-6 h-6" />}
                </div>

                <Motion.div
                    layout
                    className="text-4xl font-bold text-gray-900 dark:text-white"
                >{value}</Motion.div>
            </Motion.div>
        </>
    );
};

export default StatCard;
