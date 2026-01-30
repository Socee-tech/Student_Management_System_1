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
    <div className="min-h-screen bg-background-alt text-primary flex p-4">
      <Topbar isMenuOpen={setIsMenuOpen} />
      <Sidebar setActiveTab={setActiveTab} currentTab={activeTab} />
      <MobileBar
        isOpen={isMenuOpen}
        OnClose={handleClose}
        setActiveTab={setActiveTab}
        currentTab={activeTab}
      />

      <div className="w-full bg-foreground flex flex-1 flex-col p-0 rounded-xl mt-[4rem]">
        <main className="md:p-6">
          {activeTab === "home" && <Home isMenuOpen={setActiveTab} />}
          {activeTab === "students" && <Students />}
          {activeTab === "lecturers" && <Lecturers />}
          {activeTab === "courses" && <Courses />}
          {activeTab === "departments" && <Departments />}
          {activeTab === "classes" && <Classes />}
          {activeTab === "attendance" && <Attendance />}
          {activeTab === "reports" && <Reports />}
          {activeTab === "settings" && <Settings />}
          {activeTab === "logout" && navigate("/")}
        </main>
      </div>
    </div>
  );
}
