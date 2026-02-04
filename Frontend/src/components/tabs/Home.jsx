import { useEffect, useState } from "react";
import StatCard from "../statCard";
import {
  Users,
  BookOpen,
  Presentation,
  BookOpenCheck,
  UserCheck,
  SchoolIcon,
  GraduationCap,
  Pen,
  Book,
  School2Icon,
  Users2,
  DollarSign,
  Layers,
  TrendingUp,
  TrendingUpDownIcon,
} from "lucide-react";
import API from "../../API/axios";
import UseNotify from "../../../snackBar/snackBar";

export default function Home({ isMenuOpen }) {
  const { notifyError } = UseNotify();
  const [count, setCount] = useState({
    studNo: "",
    lectNo: "",
    courseNo: "",
    classNo: "",
    dptNo: "",
    gradeNo: "",
  });
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const countStudent = await API.get("/students/count");
        if (countStudent && countStudent.data) {
          setCount((prev) => ({ ...prev, studNo: countStudent.data.count }));
        }
        const countLecturer = await API.get("/lecturers/count");
        if (countLecturer && countLecturer.data) {
          setCount((prev) => ({ ...prev, lectNo: countLecturer.data.count }));
        }
        const countCourse = await API.get("/courses/count");
        if (countCourse && countCourse.data) {
          setCount((prev) => ({ ...prev, courseNo: countCourse.data.count }));
        }
        const countDepartment = await API.get("/departments/count");
        if (countDepartment && countDepartment.data) {
          setCount((prev) => ({ ...prev, dptNo: countDepartment.data.count }));
        }
        const countClasses = await API.get("/classes/count");
        if (countClasses && countClasses.data) {
          setCount((prev) => ({ ...prev, classNo: countClasses.data.count }));
        }
        const gradesCount = await API.get("/grades/count");
        if (gradesCount && gradesCount.data) {
          setCount((prev) => ({ ...prev, gradeNo: gradesCount.data.count }));
        }
      } catch (error) {
        console.error("Error fetching student count:", error);
        notifyError("Failed to fetch student count");
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-col lg:flex-row sm:items-center sm:justify-between gap-2">
        <div className="h-fill">
          <div className="card-header p-6 space-y-8 flex-1 items-center w-full dark:text-white">
            <div className="flex justify-between items-center">
              <SchoolIcon className="w-16 h-16" />
              <GraduationCap className="w-16 h-16" />
            </div>
            <div className="flex space-x-3">
              <Pen /> <Book /> <School2Icon />
            </div>
            <h2 className="text-xl font-semibold">
              "Transforming lives through quality education"
            </h2>
          </div>
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
          <StatCard
            title="students"
            value={count.studNo}
            icon={Users}
            onClick={isMenuOpen}
          />
          <StatCard
            title="lecturers"
            value={count.lectNo}
            icon={Users2}
            onClick={isMenuOpen}
          />
          <StatCard
            title="courses"
            value={count.courseNo}
            icon={Presentation}
            onClick={isMenuOpen}
          />
          <StatCard
            title="Active classes"
            value={count.classNo}
            icon={BookOpenCheck}
          />
          <StatCard title="Departments" value={count.dptNo} icon={Layers} />
          <StatCard title="Attendance Today" value="92%" icon={UserCheck} />
          <StatCard
            title="Grades"
            value={count.gradeNo}
            icon={TrendingUpDownIcon}
          />
          <StatCard title="Performance" value="70%" icon={TrendingUp} />
        </section>
      </div>
    </div>
  );
}
