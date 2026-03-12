import {
  Book,
  Clock,
  Home,
  Settings,
  TrendingUpIcon,
  User2,
} from "lucide-react";
import { useState } from "react";

export default function Navigations({ setActiveTab }) {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navigations = [
    { name: "Dashboard", icon: Home },
    { name: "Courses", icon: Book },
    { name: "Grades", icon: TrendingUpIcon },
    { name: "Events", icon: Clock },
    { name: "Profile", icon: User2 },
    { name: "Transcript", icon: Book },
    { name: "Settings", icon: Settings },
  ];
  return (
    <aside>
      <nav className="flex flex-col gap-2 p-4 pr-0">
        {navigations.map((nav) => {
          const Icon = nav.icon;
          return (
            <button
              key={nav.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-l-lg transition-colors duration-300 ${
                activeNav === nav.name
                  ? "bg-gray-500 text-white"
                  : "hover:bg-st-nav-active/10 hover:cursor-pointer"
              }`}
              onClick={() => {
                setActiveTab(nav.name);
                setActiveNav(nav.name);
              }}
            >
              <Icon size={18} />
              <span>{nav.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
