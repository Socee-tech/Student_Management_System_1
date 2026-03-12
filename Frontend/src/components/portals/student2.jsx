import { motion as Motion } from "framer-motion";
import {
  Award,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Mail,
  MessageCircle,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import { ThemeToggle } from "../themeToggle";

export default function StudentPortal1({
  student,
  stats,
  timetable,
  courses,
  updates,
}) {
  const usingDemo = !student;

  const profile = student || {
    name: "Amina Yusuf",
    regNo: "STU-1042",
    department: { name: "Information Systems" },
    email: "amina.yusuf@campus.edu",
    year: "Year 3",
    gpa: "3.62",
  };

  const quickStats = stats || [
    { label: "Current GPA", value: profile.gpa || "3.62", icon: Award },
    { label: "Courses", value: "6", icon: BookOpen },
    { label: "Attendance", value: "92%", icon: ClipboardList },
    { label: "Assignments", value: "4", icon: CalendarDays },
  ];

  const todayTimetable = timetable || [
    { time: "09:00", title: "Networks", room: "Room 2C" },
    { time: "12:00", title: "Data Warehousing", room: "Lab 1" },
    { time: "15:00", title: "UX Research", room: "Studio" },
  ];

  const courseCards = courses || [
    { code: "IS 301", title: "Networks", grade: "B+", progress: 68 },
    { code: "IS 332", title: "Data Warehousing", grade: "A-", progress: 54 },
    { code: "IS 350", title: "UX Research", grade: "B", progress: 71 },
  ];

  const notices = updates || [
    {
      title: "Registration closes Feb 12",
      body: "Confirm your electives before the portal locks.",
    },
    {
      title: "Library hours extended",
      body: "Open until 10pm all week during midterms.",
    },
  ];

  return (
    <div className="min-h-screen text-primary p-4 md:p-6 bg-background">
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl space-y-6"
      >
        <section className="bg-foreground rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Student Portal
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome, {profile.name}
              </h1>
              <p className="text-sm text-muted max-w-2xl">
                Track progress, stay on top of deadlines, and keep your studies
                organized.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button>
                <ThemeToggle />
              </button>
              <button className="my-button hover:scale-102 transition-transform">View Grades</button>
              <button className="my-button-alt hover:scale-102 transition-transform">Submit Assignment</button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted">{profile.regNo}</p>
              </div>
              {usingDemo && (
                <span className="text-xs rounded-full px-2 py-1 bg-cream">
                  Demo
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4" />
                <span>{profile.department?.name || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>{profile.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span>{profile.year || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>GPA {profile.gpa || "N/A"}</span>
              </div>
            </div>
            <div className="pt-2 hover:scale-102 transition-transform">
              <button className="action-accept w-full">Update Profile</button>
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Academic Snapshot</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View transcript
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickStats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="stat-card-b flex flex-col justify-between hover:scale-102 transition-transform hover:cursor-pointer"
                >
                  <stat.icon className="h-6 w-6" />
                  <div>
                    <div className="text-2xl font-bold text-black">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/50 p-4 bg-surface">
                <div className="text-sm font-semibold mb-2">Advisor</div>
                <div className="text-sm text-muted">Dr. Edward Masai</div>
              </div>
              <div className="rounded-2xl border border-border/50 p-4 bg-surface">
                <div className="text-sm font-semibold mb-2">Next Deadline</div>
                <div className="text-sm text-muted">
                  IS 301 project - Feb 14
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today</h2>
              <span className="text-xs text-muted">Upcoming sessions</span>
            </div>
            <div className="space-y-4">
              {todayTimetable.map((item, idx) => (
                <div key={`${item.title}-${idx}`} className="flex gap-3">
                  <div className="h-9 w-16 rounded-xl bg-cream flex items-center justify-center text-sm font-semibold">
                    {item.time}
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-muted">{item.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Courses</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                Open course list
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseCards.map((course, idx) => (
                <div
                  key={`${course.code}-${idx}`}
                  className="rounded-2xl border border-border/50 p-4 bg-surface"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-muted">
                        {course.code}
                      </div>
                      <div className="font-semibold">{course.title}</div>
                    </div>
                    <div className="text-sm text-muted">{course.grade}</div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-muted mb-1">Progress</div>
                    <div className="h-2 rounded-full bg-border/60 overflow-hidden">
                      <div
                        className="h-full bg-green-600"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Campus Updates</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {notices.map((notice, idx) => (
                <div
                  key={`${notice.title}-${idx}`}
                  className="rounded-2xl border border-border/50 p-4 bg-surface"
                >
                  <div className="font-semibold">{notice.title}</div>
                  <p className="text-sm text-muted mt-1">{notice.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <button className="action-accept w-full">Open Timetable</button>
              <button className="action-decline w-full">
                Request Transcript
              </button>
              <button className="action-accept w-full">Contact Lecturer</button>
              <button className="action-decline w-full">
                Join Study Group
              </button>
              <button className="action-accept w-full flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Ask Support
              </button>
            </div>
          </div>
        </section>
      </Motion.div>
    </div>
  );
}
