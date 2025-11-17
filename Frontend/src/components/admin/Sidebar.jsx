import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Users, BookOpen, CalendarCheck, Settings, ClipboardList } from 'lucide-react'

const items = [
    { to: 'home', label: 'Home', icon: Home },
    { to: 'students', label: 'Students', icon: Users },
    { to: 'lecturers', label: 'Lecturers', icon: ClipboardList },
    { to: 'courses', label: 'Courses', icon: BookOpen },
    { to: 'classes', label: 'Classes', icon: BookOpen },
    { to: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { to: 'settings', label: 'Settings', icon: Settings }
]

export default function Sidebar({ activeTab }) {
    return (
        <aside className="sticky hidden md:flex md:flex-col p-4 gap-4 text-white z-50">
            <div className="text-xl font-bold mb-4">School Admin</div>

            <nav className="flex flex-col gap-2">
                {items.map((it) => {
                    const Icon = it.icon
                    return (
                        <nav
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[rgba(16,9,112,0.76)] hover:cursor-pointer"
                            onClick={() => activeTab(it.to)}
                            key={it.label}
                        >
                            {Icon && <Icon className="w-4 h-4" />}
                            <span>{it.label}</span>
                        </nav>
                    )
                })}
            </nav>

            <div className="mt-auto text-sm text-primary/70">v1.0</div>
        </aside>
    )
}
