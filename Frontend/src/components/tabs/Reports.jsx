import { useEffect, useMemo, useState } from "react";
import API from "../../API/axios";
import DotLoader from "../spinner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const PIE_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

function groupCounts(items, getKey) {
  const map = new Map();
  for (const item of items) {
    const key = (getKey(item) || "Unassigned").toString().trim() || "Unassigned";
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function groupByMonth(items, getDate) {
  const map = new Map();
  for (const item of items) {
    const d = getDate(item);
    if (!d) continue;
    const date = new Date(d);
    if (Number.isNaN(date.getTime())) continue;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export default function Reports() {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        const [
          studentsRes,
          lecturersRes,
          gradesRes,
          attendanceRes,
          classesRes,
          coursesRes,
        ] = await Promise.all([
          API.get("/students"),
          API.get("/lecturers/dpt"),
          API.get("/grades"),
          API.get("/attendance"),
          API.get("/classes"),
          API.get("/courses"),
        ]);

        setStudents(studentsRes?.data || []);
        setLecturers(lecturersRes?.data || []);
        setGrades(gradesRes?.data || []);
        setAttendance(attendanceRes?.data || []);
        setClasses(classesRes?.data || []);
        setCourses(coursesRes?.data || []);
      } catch (e) {
        console.error("Failed to fetch reports data", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  const studentsByDepartment = useMemo(
    () =>
      groupCounts(students, (s) =>
        typeof s.department === "string" ? s.department : s?.department?.name
      ),
    [students]
  );

  const lecturersByDepartment = useMemo(
    () =>
      groupCounts(lecturers, (l) => {
        if (typeof l.department === "string") return l.department;
        return l?.department?.name;
      }),
    [lecturers]
  );

  const gradesByLetter = useMemo(
    () => groupCounts(grades, (g) => g.grade || "Pending"),
    [grades]
  );

  const attendanceTrend = useMemo(() => {
    const trimmed = [...attendance].slice(0, 10).reverse();
    return trimmed.map((a) => ({
      date: new Date(a.date).toLocaleDateString(),
      present: a.presentCount || 0,
      absent: a.absentCount || 0,
    }));
  }, [attendance]);

  const classStatus = useMemo(
    () => groupCounts(classes, (c) => c.status || "Unknown"),
    [classes]
  );

  const gradesPerMonth = useMemo(
    () => groupByMonth(grades, (g) => g.createdAt),
    [grades]
  );

  const courseCredits = useMemo(
    () =>
      courses.map((c) => ({
        course: c.code,
        credits: c.credits || 0,
      })),
    [courses]
  );

  const deptComparison = useMemo(() => {
    const deptNames = new Set([
      ...studentsByDepartment.map((d) => d.name),
      ...lecturersByDepartment.map((d) => d.name),
    ]);
    return [...deptNames].map((name) => ({
      name,
      students:
        studentsByDepartment.find((d) => d.name === name)?.count || 0,
      lecturers:
        lecturersByDepartment.find((d) => d.name === name)?.count || 0,
    }));
  }, [studentsByDepartment, lecturersByDepartment]);

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Reports</h2>
        <div className="text-sm text-primary/70">Analytics overview</div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Students by Department</h3>
          <div className="h-72 min-h-[280px] min-w-0">
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
        </section>

        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Lecturers by Department</h3>
          <div className="h-72 min-h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lecturersByDepartment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Grade Distribution</h3>
          <div className="h-64 min-h-[260px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradesByLetter}
                  dataKey="count"
                  nameKey="name"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={4}
                >
                  {gradesByLetter.map((entry, index) => (
                    <Cell
                      key={`grade-${entry.name}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Attendance Trend</h3>
          <div className="h-64 min-h-[260px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="present"
                  stroke="#16a34a"
                  fill="#bbf7d0"
                />
                <Area
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  fill="#fecaca"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Class Status</h3>
          <div className="h-64 min-h-[260px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={classStatus}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="count" stroke="#2563eb" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Grades per Month</h3>
          <div className="h-72 min-h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradesPerMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Department Balance</h3>
          <div className="h-72 min-h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={deptComparison}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar
                  name="Students"
                  dataKey="students"
                  stroke="#2563eb"
                  fill="#93c5fd"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Lecturers"
                  dataKey="lecturers"
                  stroke="#16a34a"
                  fill="#86efac"
                  fillOpacity={0.5}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Course Credits</h3>
          <div className="h-72 min-h-[280px] min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseCredits}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="course" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="credits" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-border/60 bg-foreground/90 p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.1)]">
          <h3 className="font-semibold mb-3">Summary Tables</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-t-bg/20 rounded-xl p-3">
              <h4 className="font-semibold mb-2 text-sm">Students by Dept</h4>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-t-bg">
                      <th className="th-tr">Department</th>
                      <th className="th-tr">Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentsByDepartment.map((row) => (
                      <tr key={row.name} className="odd:bg-t-odd hover:bg-t-hover">
                        <td className="tb-td">{row.name}</td>
                        <td className="tb-td">{row.count}</td>
                      </tr>
                    ))}
                    {!isLoading && studentsByDepartment.length === 0 && (
                      <tr>
                        <td className="tb-td" colSpan={2}>
                          No students yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-t-bg/20 rounded-xl p-3">
              <h4 className="font-semibold mb-2 text-sm">Lecturers by Dept</h4>
              <div className="w-full overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-t-bg">
                      <th className="th-tr">Department</th>
                      <th className="th-tr">Lecturers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturersByDepartment.map((row) => (
                      <tr key={row.name} className="odd:bg-t-odd hover:bg-t-hover">
                        <td className="tb-td">{row.name}</td>
                        <td className="tb-td">{row.count}</td>
                      </tr>
                    ))}
                    {!isLoading && lecturersByDepartment.length === 0 && (
                      <tr>
                        <td className="tb-td" colSpan={2}>
                          No lecturers yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>

      {isLoading && <DotLoader />}
    </div>
  );
}
