import { useEffect, useState } from "react"
import StatCard from "../statCard"
import { Users, BookOpen, Presentation, BookOpenCheck, UserCheck, SchoolIcon, GraduationCap, Pen, Book, School2Icon, Users2, DollarSign, Layers, TrendingUp } from 'lucide-react'
import API from "../../API/axios";
import UseNotify from "../../../snackBar/snackBar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
// Removed incorrect import from react-router-dom

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function Home({ isMenuOpen }) {
    const { notifyError, notifySuccess } = UseNotify();
    const [count, setCount] = useState({ studNo: "", lectNo: "", courseNo: "" });
    // Initialize chart data with a valid structure to avoid empty render issues
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Students per Department",
                data: [],
                tension: 0.3,
                borderColor: "rgba(99, 102, 241, 1)",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
            }
        ]
    });
    const [options, setOptions] = useState({
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            y: {
                color: 'white'
            },
            x: {
                color: 'white'
            }
        },
    });
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const countStudent = await API.get("/students/count");
                if (countStudent && countStudent.data) {
                    setCount(prev => ({ ...prev, studNo: countStudent.data.count }));
                }
                const countLecturer = await API.get("/lecturers/count");
                if (countLecturer && countLecturer.data) {
                    setCount(prev => ({ ...prev, lectNo: countLecturer.data.count }));
                }
                const countCourse = await API.get("/courses/count");
                if (countCourse && countCourse.data) {
                    setCount(prev => ({ ...prev, courseNo: countCourse.data.count }));
                }
            } catch (error) {
                console.error("Error fetching student count:", error);
                notifyError("Failed to fetch student count");
            }
        }
        fetchCount();
    }, [notifyError]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataSet = (await API.get("/analytics/students-per-department")).data;
                if (!dataSet.success) return;
                // Avoid shadowing state variable; build next chart state
                const nextChartData = {
                    labels: dataSet.data.map(d => d.departmentName),
                    datasets: [
                        {
                            label: "Students per Department",
                            data: dataSet.data.map(d => d.totalStudents),
                            tension: 0.3,
                            borderColor: "rgba(99, 102, 241, 1)",
                            backgroundColor: "rgba(99, 102, 241, 0.2)",
                        }
                    ]
                }
                setChartData(nextChartData);
            } catch (error) {
                console.error("Error fetching chart data:", error);
                notifyError("Failed to fetch chart data");
            }
        }
        fetchData();
    }, [notifyError, notifySuccess])
    return (
        <div className="space-y-4">
            <div className='flex flex-col sm:flex-col lg:flex-row sm:items-center sm:justify-between gap-2'>
                <div className="h-fill">
                    <div className='card-header p-6 space-y-8 flex-1 items-center w-full dark:text-white'>
                        <div className='flex justify-between items-center'>
                            <SchoolIcon className='w-16 h-16' />
                            <GraduationCap className='w-16 h-16' />
                        </div>
                        <div className='flex space-x-3'><Pen /> <Book /> <School2Icon /></div>
                        <h2 className='text-xl font-semibold'>"Transforming lives through quality education"</h2>
                    </div>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
                    <StatCard title="students"
                        value={count.studNo}
                        icon={Users}
                        onClick={isMenuOpen}
                    />
                    <StatCard title="lecturers"
                        value={count.lectNo}
                        icon={Users2}
                        onClick={isMenuOpen}
                    />
                    <StatCard title="courses"
                        value={count.courseNo}
                        icon={Presentation}
                        onClick={isMenuOpen}
                    />
                    <StatCard title="Active classes"
                        value="42"
                        icon={BookOpenCheck}
                    />
                    <StatCard title="Attendance Today"
                        value="92%"
                        icon={UserCheck}
                    />
                    <StatCard title="Debtors"
                        value="500"
                        icon={DollarSign}
                    />
                    <StatCard title="Courses"
                        value="267"
                        icon={BookOpen}
                    />
                    <StatCard title="Departments"
                        value="20"
                        icon={Layers}
                    />
                    <StatCard title="Performance"
                        value="70%"
                        icon={TrendingUp}
                    />

                </section>
            </div>

            <section className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 min-h-[12rem] gap-4'>
                <StatCard title="New Enrollments" value="120" />
                <StatCard title="Pending Approvals" value="8" />
                <div>
                    {chartData.labels && chartData.labels.length > 0 ? (
                        <Line data={chartData} className="" />
                    ) : (
                        <div className="text-sm  text-foreground p-4">No chart data available</div>
                    )}
                </div>
            </section>
        </div>
    )
}