import { useState } from "react";
import Home from "../tabs/Home";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Students from "../tabs/Students";
import { Lecturers } from "../tabs/Lecturers";
import Courses from "../tabs/courses";
import MobileBar from "./mobileBar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClose = () => {
    setIsMenuOpen(false);
  }
  return (
    <div className="min-h-screen bg-background-alt text-primary flex p-4">
      <Topbar isMenuOpen={setIsMenuOpen} />
      <Sidebar activeTab={setActiveTab} />
      <MobileBar isOpen={isMenuOpen} OnClose={handleClose} setActiveTab={setActiveTab} />

      <div className='w-full bg-foreground flex flex-1 flex-col p-0 rounded-xl mt-[4rem]'>
        <main className="md:p-6">
          {activeTab === 'home' && <Home />}
          {activeTab === 'students' && <Students />}
          {activeTab === 'lecturers' && <Lecturers />}
          {activeTab === 'courses' && <Courses />}
        </main>
      </div>
    </div>
  )
}
