// src/components/StatCard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            {/* 🔹 Compact Card */}
            <motion.div
                layout
                onClick={() => setIsOpen(true)}
                className="dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg cursor-pointer p-2 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
            >
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
                        {title}
                    </h3>
                    {Icon && <Icon className="text-indigo-500 w-6 h-6" />}
                </div>

                <motion.div
                    layout
                    className="text-4xl font-bold text-gray-900 dark:text-white"
                >{value}</motion.div>
            </motion.div>
        </>
    );
};

export default StatCard;
