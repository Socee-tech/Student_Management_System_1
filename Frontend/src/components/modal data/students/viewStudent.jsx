import { motion } from "framer-motion"
import { Book, Calendar, CalendarArrowDown, Mail, Phone, User, X } from "lucide-react"





export const ViewStudent = ({ student, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8, y: -30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
                <div
                    className="bg-foreground rounded-2xl shadow-lg w-full max-w-sm p-4 flex flex-col gap-4 md:max-w-3xl"
                >
                    <div
                        className="flex justify-between items-center mb-4"
                    >
                        <h3 className="text-xl font-semibold">View Student</h3>
                        <button className="hover:cursor-pointer"><X className="w-6 h-6" onClick={onClose} /></button>
                    </div>
                    <div className="text-left p-4 text-2xl">{student.name}</div>
                    <div className="text-left p-4">
                        <ul className="list-inside space-y-2 text-lg grid grid-cols-2 gap-4">
                            <li><span className="font-bold"><User /> Name:</span> {student.name}</li>
                            <li><span className="font-bold"><Mail /> Email:</span> {student.email}</li>
                            <li><span className="font-bold"><Phone /> Phone:</span> {student.phone}</li>
                            <li><span className="font-bold"><Book /> Reg No:</span> {student.regNo}</li>
                            <li><span className="font-bold"><User /> Gender:</span> {student.gender}</li>
                            <li><span className="font-bold"><Book /> Course:</span> {student.course}</li>
                            <li><span className="font-bold"><CalendarArrowDown />Year:</span> {student.year}</li>
                            <li><span className="font-bold"><Calendar /> Date enrolled:</span> {student.admDate}</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}