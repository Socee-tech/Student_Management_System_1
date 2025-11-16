// src/components/StatCard.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, extraInfo, No }) => {
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

                {title === "Students" ? (
                    <motion.p
                        layout
                        className="text-4xl font-bold text-gray-900 dark:text-white"
                    >{No}</motion.p>
                ) : (
                    <motion.p
                        layout
                        className="text-4xl font-bold text-gray-900 dark:text-white"
                    >{value}</motion.p>
                )}
            </motion.div>

            {/* 🔹 Expanded Modal Card */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            layout
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                            }}
                            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 w-[90%] max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {title}
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <div className="text-center mb-6">
                                <motion.p
                                    layout
                                    className=""
                                >
                                    {value}
                                </motion.p>
                            </div>

                            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                {extraInfo || "No additional information available."}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default StatCard;
