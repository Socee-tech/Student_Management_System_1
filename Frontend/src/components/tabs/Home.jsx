import { useState } from "react"
import StudentList from "../modal data/students/Students"
import StatCard from "../statCard"
import { Users, BookOpen, Presentation, BookOpenCheck, UserCheck, SchoolIcon, GraduationCap, Pen, Book, School2Icon, Users2, DollarSign, Layers, TrendingUp } from 'lucide-react'



export default function Home() {
    const [studNo, setStudNo] = useState(0);
    return (
        <div className="space-y-4">
            <div className='flex flex-col sm:flex-col lg:flex-row sm:items-center sm:justify-between gap-2'>
                <div className='card-header p-6 space-y-8 flex-1 items-center w-full dark:text-white'>
                    <div className='flex justify-between items-center'>
                        <SchoolIcon className='w-16 h-16' />
                        <GraduationCap className='w-16 h-16' />
                    </div>
                    <div className='flex space-x-3'><Pen /> <Book /> <School2Icon /></div>
                    <h2 className='text-xl font-semibold'>"Transforming lives through quality education"</h2>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
                    <StatCard title="Students"
                        value={<StudentList onCountChage={setStudNo}/>}
                        icon={Users}
                        No={studNo}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Lecturers"
                        value="78"
                        icon={Presentation}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Active classes"
                        value="42"
                        icon={BookOpenCheck}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Attendance Today"
                        value="92%"
                        icon={UserCheck}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Debtors"
                        value="500"
                        icon={DollarSign}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Courses"
                        value="267"
                        icon={BookOpen}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Departments"
                        value="20"
                        icon={Layers}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />
                    <StatCard title="Performance"
                        value="70%"
                        icon={TrendingUp}
                        extraInfo="There are currently 1,245 active students enrolled across all departments."
                    />

                </section>
            </div>

            <section className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 min-h-[12rem] gap-4'>
                <StatCard title="New Enrollments" value="56" />
                <StatCard title="Pending Approvals" value="8" />
                <StatCard title="Upcoming Events" value="3" />
            </section>
        </div>
    )
}