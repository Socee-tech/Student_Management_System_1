import { useEffect, useMemo, useState } from "react";
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
  Layers,
  TrendingUp,
  TrendingUpDownIcon,
} from "lucide-react";
import API from "../../API/axios";
import UseNotify from "../../../snackBar/snackBar";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const PIE_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

function groupCounts(items, getKey) {
  const map = new Map();
  for (const item of items) {
    const key =
      (getKey(item) || "Unassigned").toString().trim() || "Unassigned";
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

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
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true);
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

        const [studentsRes, gradesRes, attendanceRes, classesRes] =
          await Promise.all([
            API.get("/students"),
            API.get("/grades"),
            API.get("/attendance"),
            API.get("/classes"),
          ]);

        setStudents(studentsRes?.data || []);
        setGrades(gradesRes?.data || []);
        setAttendance(attendanceRes?.data || []);
        setClasses(classesRes?.data || []);
      } catch (error) {
        console.error("Error fetching student count:", error);
        notifyError("Failed to fetch student count");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCount();
  }, []);

  const studentsByDepartment = useMemo(
    () =>
      groupCounts(students, (s) =>
        typeof s.department === "string" ? s.department : s?.department?.name
      ).slice(0, 6),
    [students]
  );

  const gradeDistribution = useMemo(
    () => groupCounts(grades, (g) => g.grade || "Pending"),
    [grades]
  );

  const attendanceTrend = useMemo(() => {
    const trimmed = [...attendance].slice(0, 7).reverse();
    return trimmed.map((a) => ({
      date: new Date(a.date).toLocaleDateString(),
      present: a.presentCount || 0,
      absent: a.absentCount || 0,
    }));
  }, [attendance]);

  const recentClasses = useMemo(() => classes.slice(0, 5), [classes]);
  const recentGrades = useMemo(() => grades.slice(0, 5), [grades]);

  return (
    <div className="space-y-6">
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
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 flex-1 w-full">
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

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 *:h-[300px]">
        <div className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Students by Department</h3>
            <span className="text-xs text-muted">Top 6</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={studentsByDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Grade Distribution</h3>
            <span className="text-xs text-muted">Overall</span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gradeDistribution}
                dataKey="count"
                nameKey="name"
                outerRadius={90}
                innerRadius={55}
                paddingAngle={4}
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Attendance Trend</h3>
            <span className="text-xs text-muted">Last 7 sessions</span>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="present" stroke="#16a34a" />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Classes</h3>
            <span className="text-xs text-muted">Latest</span>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-t-bg">
                  <th className="th-tr">Code</th>
                  <th className="th-tr">Title</th>
                  <th className="th-tr">Room</th>
                  <th className="th-tr">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentClasses.map((cls) => (
                  <tr key={cls._id} className="odd:bg-t-odd hover:bg-t-hover">
                    <td className="tb-td">{cls.code}</td>
                    <td className="tb-td">{cls.title}</td>
                    <td className="tb-td">{cls.room || "—"}</td>
                    <td className="tb-td">{cls.status || "—"}</td>
                  </tr>
                ))}
                {!isLoading && recentClasses.length === 0 && (
                  <tr>
                    <td className="tb-td" colSpan={4}>
                      No classes yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Recent Grades</h3>
            <span className="text-xs text-muted">Latest</span>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-t-bg">
                  <th className="th-tr">Student</th>
                  <th className="th-tr">Course</th>
                  <th className="th-tr">Marks</th>
                  <th className="th-tr">Grade</th>
                </tr>
              </thead>
              <tbody>
                {recentGrades.map((g) => (
                  <tr key={g._id} className="odd:bg-t-odd hover:bg-t-hover">
                    <td className="tb-td">{g.student?.name || "—"}</td>
                    <td className="tb-td">{g.course?.code || "—"}</td>
                    <td className="tb-td">{g.marks ?? "—"}</td>
                    <td className="tb-td">{g.grade || "—"}</td>
                  </tr>
                ))}
                {!isLoading && recentGrades.length === 0 && (
                  <tr>
                    <td className="tb-td" colSpan={4}>
                      No grades yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
