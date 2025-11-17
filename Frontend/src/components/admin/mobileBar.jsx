import { motion } from "framer-motion";
import { BookOpen, CalendarCheck, ClipboardList, Home, Settings2, Users, X } from "lucide-react";



export default function MobileBar({ isOpen, OnClose, setActiveTab }) {
    const items = [
        { to: 'home', label: 'Home', icon: Home },
        { to: 'students', label: 'Students', icon: Users },
        { to: 'lecturers', label: 'Lecturers', icon: ClipboardList },
        { to: 'courses', label: 'Courses', icon: BookOpen },
        { to: 'classes', label: 'Classes', icon: BookOpen },
        { to: 'attendance', label: 'Attendance', icon: CalendarCheck },
        { to: 'settings', label: 'Settings', icon: Settings2 }
    ]
    return (
        <>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={OnClose}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-101"
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: isOpen ? '0%' : '-100%' }}
                        transition={{ type: "spring", stiffness: 200, damping: 18 }}
                        className="fixed top-0 left-0 h-full w-64 bg-foreground z-50 flex flex-col p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-2xl">Menu</h2>
                            <button onClick={OnClose}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {items.map((it) => {
                                const Icon = it.icon
                                return (
                                    <nav
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[rgba(16,9,112,0.76)] hover:cursor-pointer"
                                        onClick={() => (setActiveTab(it.to), OnClose())}
                                        key={it.label}
                                    >
                                        {Icon && <Icon className="w-4 h-4" />}
                                        <span>{it.label}</span>
                                    </nav>
                                )
                            })}
                        </nav>
                        <div className="mt-auto pt-5 border-t">
                            <button className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">
                                Logout
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    )
}