import { motion } from "framer-motion";
import { House, Mail, PercentIcon, Phone, User, X } from "lucide-react";





export default function ViewLec({ lecturer, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-101"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-foreground rounded-2xl shadow-2xl w-full max-w-sm md:max-w-3xl"
            >
                <div className="flex flex-col p-4 space-y-4">
                    <div className="flex justify-between">
                        <h3 className="text-3xl font-bold">Lecturer Details</h3>
                        <X className="w-6 h-6 hover:cursor-pointer" onClick={onClose} />
                    </div>
                    <div className="text-2xl font-semibold">{lecturer.LecID} - {lecturer.name}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex border p-2 rounded-2xl md:border-r-0">
                            <User size={16} />
                            <span className="text-lg font-bold mr-2">Name:</span>
                            {lecturer.name}
                        </div>
                        <div className="flex border md:border-l-0 p-2 rounded-2xl">
                            <PercentIcon size={16} />
                            <span className="text-lg font-bold mr-2">Status:</span>
                            {lecturer.status}
                        </div>
                        <div className="flex border p-2 rounded-2xl md:border-r-0">
                            <User size={16} />
                            <span className="text-lg font-bold mr-2">Lecturer ID:</span>
                            {lecturer.LecID}
                        </div>
                        <div className="flex border md:border-l-0 p-2 rounded-2xl">
                            <House size={16} />
                            <span className="text-lg font-bold mr-2">Department:</span>
                            {lecturer.department}
                        </div>
                        <div className="flex border p-2 rounded-2xl md:border-r-0">
                            <Mail size={16} />
                            <span className="text-lg font-bold mr-2">Email:</span>
                            {lecturer.email}
                        </div>
                        <div className="flex border md:border-l-0 p-2 rounded-2xl">
                            <Phone size={16} />
                            <span className="text-lg font-bold mr-2">Phone:</span>
                            {lecturer.phone}
                        </div>
                    </div>
                    <div className="w-full flex flex-col p-4 text-left space-y-3">
                        <h2 className="text-xl font-semibold">Courses:</h2>
                        {lecturer.courses.map((course, idx) => (
                            <li key={idx}>
                                {course.title}
                            </li>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}