import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

const items = [
  { to: "home", label: "Home", icon: Home },
  { to: "students", label: "Students", icon: Users },
  { to: "lecturers", label: "Lecturers", icon: ClipboardList },
  { to: "courses", label: "Courses", icon: BookOpen },
  { to: "departments", label: "Departments", icon: BookOpen },
  { to: "classes", label: "Classes", icon: GraduationCap },
  { to: "attendance", label: "Attendance", icon: CalendarCheck },
  { to: "grades", label: "Grades", icon: TrendingUp },
  { to: "reports", label: "Reports", icon: BarChart3 },
  { to: "settings", label: "Settings", icon: Settings },
  { to: "logout", label: "Logout", icon: LogOut },
  { to: "lecPortal", label: "Lecturer Portal", icon: Home },
  { to: "studentPortal", label: "Student Portal", icon: Home },
];

export default function Sidebar({ setActiveTab, currentTab }) {
  return (
    <aside className="hidden md:flex md:flex-col p-4 gap-4 z-50 w-64">
      <div className="rounded-2xl border border-border/60 bg-foreground/90 backdrop-blur p-4 shadow-[0px_14px_26px_rgba(0,0,0,0.12)]">
        <div className="text-xs uppercase tracking-[0.2em] text-muted">
          Control Center
        </div>
        <div className="text-xl font-semibold mt-2">School Admin</div>
      </div>

      <nav className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-foreground/90 backdrop-blur p-3 shadow-[0px_14px_26px_rgba(0,0,0,0.12)]">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = currentTab === it.to;
          return (
            <button
              type="button"
              className={[
                "flex items-center gap-3 px-3 py-2 rounded-xl text-left transition",
                "hover:bg-t-hover hover:cursor-pointer",
                isActive
                  ? "bg-t-bg font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-muted",
              ].join(" ")}
              onClick={() => setActiveTab(it.to)}
              key={it.label}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-muted">v1.0</div>
    </aside>
  );
}
