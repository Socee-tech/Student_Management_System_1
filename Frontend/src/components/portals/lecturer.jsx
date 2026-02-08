import { motion as Motion } from "framer-motion";
import {
  AlarmClock,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function LecturerPortal({
  lecturer,
  stats,
  schedule,
  courses,
  announcements,
}) {
  const [isDark, setIsDark] = useState(false);
  const usingDemo = !lecturer;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDark);
  }, [isDark]);

  const profile = lecturer || {
    name: "Dr. Mae Okoro",
    LecID: "LEC-204",
    department: { name: "Computer Science" },
    email: "mae.okoro@campus.edu",
    phone: "+1 (555) 201-4409",
    office: "Science Block, Room 3A",
    bio: "Focused on data systems, assessment design, and student success.",
  };

  const quickStats = stats || [
    { label: "Active Courses", value: "4", icon: BookOpen },
    { label: "Students", value: "186", icon: Users },
    { label: "Classes Today", value: "3", icon: CalendarDays },
    { label: "Attendance", value: "94%", icon: ClipboardCheck },
  ];

  const todaySchedule = schedule || [
    {
      time: "08:30",
      title: "Algorithms I",
      room: "Lab 2",
      group: "CS 200",
    },
    {
      time: "11:00",
      title: "Database Systems",
      room: "Room 1B",
      group: "CS 300",
    },
    {
      time: "14:30",
      title: "Project Clinic",
      room: "Studio",
      group: "Final Year",
    },
  ];

  const courseCards = courses || [
    {
      code: "CSC 210",
      title: "Algorithms I",
      students: 68,
      progress: 72,
    },
    {
      code: "CSC 320",
      title: "Database Systems",
      students: 54,
      progress: 61,
    },
    {
      code: "CSC 498",
      title: "Capstone Project",
      students: 28,
      progress: 48,
    },
  ];

  const notes = announcements || [
    {
      title: "Mid-semester grading opens",
      body: "Gradebook is open from Feb 10 - Feb 24.",
    },
    {
      title: "Lab equipment maintenance",
      body: "Lab 2 will be offline on Feb 12, 2:00pm - 5:00pm.",
    },
  ];

  return (
    <div
      className="min-h-screen text-primary p-4 md:p-6"
      style={{
        backgroundColor: "color-mix(in srgb, #0f1b2d 72%, #f5f3ef 28%)",
        backgroundImage:
          "radial-gradient(60% 60% at 50% 0%, rgba(34,197,94,0.12), rgba(255,255,255,0))",
      }}
    >
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
                Lecturer Portal
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {profile.name}
              </h1>
              <p className="text-sm text-muted max-w-2xl">{profile.bio}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="action-decline"
                onClick={() => setIsDark((prev) => !prev)}
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
              <button className="my-button">Record Attendance</button>
              <button className="my-button-alt">Upload Materials</button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Profile</h2>
                <p className="text-sm text-muted">{profile.LecID}</p>
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
                <Phone className="h-4 w-4" />
                <span>{profile.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{profile.office || "N/A"}</span>
              </div>
            </div>
            <div className="pt-2">
              <button className="action-accept w-full">Edit Profile</button>
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Teaching Overview</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View analytics <ArrowUpRight className="inline h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickStats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="stat-card-b flex flex-col justify-between"
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
                <div className="text-sm font-semibold mb-2">Office Hours</div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <AlarmClock className="h-4 w-4" />
                  Tue, Thu - 2:00pm to 4:00pm
                </div>
              </div>
              <div className="rounded-2xl border border-border/50 p-4 bg-surface">
                <div className="text-sm font-semibold mb-2">Pending Tasks</div>
                <div className="text-sm text-muted">
                  12 submissions awaiting review
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today Schedule</h2>
              <span className="text-xs text-muted">Next 3 classes</span>
            </div>
            <div className="space-y-4">
              {todaySchedule.map((item, idx) => (
                <div
                  key={`${item.title}-${idx}`}
                  className="flex items-start gap-3"
                >
                  <div className="h-9 w-16 rounded-xl bg-cream flex items-center justify-center text-sm font-semibold">
                    {item.time}
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-xs text-muted">
                      {item.group} - {item.room}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Courses</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                Manage courses
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
                    <div className="text-sm text-muted">
                      {course.students} students
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-muted mb-1">Progress</div>
                    <div className="h-2 rounded-full bg-border/60 overflow-hidden">
                      <div
                        className="h-full bg-blue-600"
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
              <h2 className="text-lg font-semibold">Announcements</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                New announcement
              </button>
            </div>
            <div className="space-y-4">
              {notes.map((note, idx) => (
                <div
                  key={`${note.title}-${idx}`}
                  className="rounded-2xl border border-border/50 p-4 bg-surface"
                >
                  <div className="font-semibold">{note.title}</div>
                  <p className="text-sm text-muted mt-1">{note.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-foreground rounded-2xl p-6 shadow-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="space-y-3">
              <button className="action-accept w-full">Enter Grades</button>
              <button className="action-decline w-full">
                Message Students
              </button>
              <button className="action-accept w-full">
                Create Assessment
              </button>
              <button className="action-decline w-full">Open Attendance</button>
            </div>
          </div>
        </section>
      </Motion.div>
    </div>
  );
}
