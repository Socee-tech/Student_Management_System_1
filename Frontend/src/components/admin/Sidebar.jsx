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
];

export default function Sidebar({ setActiveTab, currentTab }) {
  return (
    <aside className="hidden md:flex md:flex-col p-4 gap-4 z-50">
      <div className="text-xl font-bold mb-4">School Admin</div>

      <nav className="flex flex-col gap-2">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = currentTab === it.to;
          return (
            <button
              type="button"
              className={[
                "flex items-center gap-3 px-3 py-2 rounded-lg text-left",
                "hover:bg-t-hover hover:cursor-pointer",
                isActive ? "bg-t-bg font-semibold" : "",
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

      <div className="mt-auto text-sm text-primary/70">v1.0</div>
    </aside>
  );
}
