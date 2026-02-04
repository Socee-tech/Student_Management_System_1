import { useEffect, useState } from "react";
import Home from "../tabs/Home";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Students from "../tabs/Students";
import { Lecturers } from "../tabs/Lecturers";
import Courses from "../tabs/courses";
import MobileBar from "./mobileBar";
import Departments from "../tabs/departments";
import Classes from "../tabs/Classes";
import Attendance from "../tabs/Attendance";
import Reports from "../tabs/Reports";
import Settings from "../tabs/Settings";
import { useNavigate } from "react-router-dom";
import Grades from "../tabs/grades";

export default function Dashboard({ Tab }) {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    if (Tab) {
      setActiveTab(Tab);
    }
  }, [Tab]);
  return (
    <div className="h-screen bg-foreground text-primary flex flex-col p-4 relative">
      <div className="flex-shrink-0">
        <Topbar isMenuOpen={setIsMenuOpen} />
      </div>
      <div className="flex flex-1 overflow-hidden md:mt-10">
        <aside className="">
          <Sidebar setActiveTab={setActiveTab} currentTab={activeTab} />
          <MobileBar
            isOpen={isMenuOpen}
            OnClose={handleClose}
            setActiveTab={setActiveTab}
            currentTab={activeTab}
          />
        </aside>
        <aside className="flex-1 overflow-y-auto">
          <main className="md:p-6 flex-1 overflow-y-auto mt-16 md:mt-0 z-50">
            {activeTab === "home" && <Home isMenuOpen={setActiveTab} />}
            {activeTab === "students" && <Students />}
            {activeTab === "lecturers" && <Lecturers />}
            {activeTab === "courses" && <Courses />}
            {activeTab === "departments" && <Departments />}
            {activeTab === "classes" && <Classes />}
            {activeTab === "attendance" && <Attendance />}
            {activeTab === "grades" && <Grades />}
            {activeTab === "reports" && <Reports />}
            {activeTab === "settings" && <Settings />}
            {activeTab === "logout" && navigate("/")}
          </main>
        </aside>
      </div>
    </div>
  );
}
