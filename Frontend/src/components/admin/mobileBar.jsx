import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  GraduationCap,
  Home,
  Settings2,
  Users,
  X,
} from "lucide-react";

export default function MobileBar({
  isOpen,
  OnClose,
  setActiveTab,
  currentTab,
}) {
  const items = [
    { to: "home", label: "Home", icon: Home },
    { to: "students", label: "Students", icon: Users },
    { to: "lecturers", label: "Lecturers", icon: ClipboardList },
    { to: "courses", label: "Courses", icon: BookOpen },
    { to: "departments", label: "Departments", icon: BookOpen },
    { to: "classes", label: "Classes", icon: GraduationCap },
    { to: "attendance", label: "Attendance", icon: CalendarCheck },
    { to: "reports", label: "Reports", icon: BarChart3 },
    { to: "settings", label: "Settings", icon: Settings2 },
  ];
  const navigate = useNavigate();
  return (
    <>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={OnClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[101]"
        >
          <Motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? "0%" : "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="fixed top-0 left-0 h-full w-64 bg-foreground z-50 flex flex-col p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Menu</h2>
              <button onClick={OnClose}>
                <X className="h-6 w-6" />
              </button>
            </div>
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
                    onClick={() => (setActiveTab(it.to), OnClose())}
                    key={it.label}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{it.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="mt-auto pt-5 border-t">
              <button
                className="w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate("/")}
              >
                Logout
              </button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </>
  );
}
