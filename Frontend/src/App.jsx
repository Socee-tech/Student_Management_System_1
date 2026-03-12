import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/admin/Dashboard";
import LecturerPortal from "./components/portals/lecturer";
import StudentPortal from "./components/portals/student";
import API from "./API/axios";
import {
  Award,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

function LecturerPage() {
  const { state } = useLocation();
  const [data, setData] = useState(state || {});

  useEffect(() => {
    if (state?.profile || state?.details) return;
    const raw = localStorage.getItem("portalUser");
    if (!raw) return;
    const stored = JSON.parse(raw);
    if (stored?.role !== "lecturer" || !stored?.email) return;

    API.get("/user/portal/lecturer", { params: { email: stored.email } })
      .then((res) => {
        if (res?.data) setData(res.data);
      })
      .catch(() => {});
  }, [state]);

  const stats = data?.details?.stats
    ? [
        {
          label: "Active Courses",
          value: data.details.stats.activeCourses ?? 0,
          icon: BookOpen,
        },
        {
          label: "Students",
          value: data.details.stats.students ?? 0,
          icon: Users,
        },
        {
          label: "Classes Today",
          value: data.details.stats.classesToday ?? 0,
          icon: CalendarDays,
        },
        {
          label: "Attendance",
          value: `${data.details.stats.attendancePercentage ?? 0}%`,
          icon: ClipboardCheck,
        },
      ]
    : undefined;

  const schedule = data?.details?.schedule
    ? data.details.schedule.map((cls) => ({
        time: cls.schedule || "—",
        title: cls.title || cls.code || "—",
        room: cls.room || "—",
        group: cls.department?.name || cls.course?.code || "—",
      }))
    : undefined;

  const courses = data?.details?.courses
    ? data.details.courses.map((course) => ({
        code: course.code || "—",
        title: course.title || "—",
        students: 0,
        progress: 0,
      }))
    : data?.profile?.courses?.map((course) => ({
        code: course.code || "—",
        title: course.title || "—",
        students: 0,
        progress: 0,
      }));

  return (
    <LecturerPortal
      lecturer={data.profile}
      stats={stats}
      schedule={schedule}
      courses={courses}
      announcements={data?.details?.announcements}
    />
  );
}

function StudentPage() {
  const { state } = useLocation();
  const [data, setData] = useState(state || {});

  useEffect(() => {
    if (state?.profile || state?.grades) return;
    const raw = localStorage.getItem("portalUser");
    if (!raw) return;
    const stored = JSON.parse(raw);
    if (stored?.role !== "student" || !stored?.email) return;

    API.get("/user/portal/student", { params: { email: stored.email } })
      .then((res) => {
        if (res?.data) setData(res.data);
      })
      .catch(() => {});
  }, [state]);

  const stats = data?.grades
    ? [
        {
          label: "Courses",
          value: data.courses.courses.length || 0,
          icon: BookOpen,
        },
        {
          label: "Completed",
          value: data.grades.filter((g) => g.grade).length || 0,
          icon: Award,
        },
      ]
    : undefined;

  return (
    <StudentPortal
      student={data.profile}
      stats={stats}
      courses={data?.courses?.courses?.slice(0, 4).map((g) => ({
        code: g.code || "—",
        title: g.title || "—",
        grade: g.grade || "—",
        progress: 0,
      }))}
      updates={data?.updates}
    />
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/lecturer" element={<LecturerPage />} />
        <Route path="/student" element={<StudentPage />} />
      </Routes>
    </>
  );
}

export default App;
