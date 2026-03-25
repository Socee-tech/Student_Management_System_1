import { Bell, Clock, School, Search, User, User2Icon } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import Navigations from "./navigations";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import Dashboard from "./tabs/dashBoard";
import Courses from "./tabs/courses";
import TopBar from "./topBar";
import Grades from "./tabs/grades";
import Events from "./tabs/events";
import Classes from "./tabs/classes";
import Notices from "./tabs/notices";
import Profile from "./profile";
import Transcript from "./transcript";

export default function StudentPortal() {
  const [selected, setSelected] = useState(new Date());
  const [activeTab, setActiveTab] = useState("Dashboard");
  const events = [
    {
      title: "Computer Science Tour",
      time: "Mon 2 March 2026",
      event: "Tour to fourteen falls",
    },
    {
      title: "Mathematics Workshop",
      time: "Wed 4 March 2026",
      event: "Workshop on calculus",
    },
    {
      title: "Physics Seminar",
      time: "Fri 6 March 2026",
      event: "Seminar on quantum mechanics",
    },
  ];
  return (
    <div className="w-full h-screen flex flex-col bg-st-bg transition-all duration-600 overflow-hidden">
      <TopBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="grid grid-cols-10 bg-st-bg m-2 transition-all duration-600 flex-1 overflow-y-auto [scrollbar-width-none] [&::-webkit-scrollbar]:hidden">
        {/* left screen */}
        <aside className="col-span-2 bg-st-bg h-screen flex-col hidden md:flex transition-all duration-600 scroll-smooth overflow-y-auto">
          <div className="flex border-b p-2 mr-2">
            <div className="rounded-full bg-accent-green p-2">
              <School size={40} />
            </div>
            <div className="ml-2">
              <div className="font-semibold text-lg">Student Portal</div>
              <div className="text-sm text-muted">
                Manage your academic profile
              </div>
            </div>
          </div>
          {/* Navigations */}
          <Navigations setActiveTab={setActiveTab} activeTab={activeTab} />
        </aside>
        {/* middle screen */}
        <div className="col-span-10 md:col-span-6 bg-st-bg-m h-screen rounded-2xl transition-all duration-600 scroll-smooth overflow-y-auto [scrollbar-width-none] [&::-webkit-scrollbar]:hidden">
          <div className="flex bg-gray-500 m-2 ml-5 mr-5 rounded-lg p-2 hover:cursor-pointer md:mt-8 text-white">
            <Search size={20} className="ml-2" />
            <input
              type="text"
              placeholder="search"
              className="ml-2 focus:outline-none"
            />
          </div>
          {/* Tabs */}
          {activeTab === "Dashboard" && (
            <Dashboard setActiveTab={setActiveTab} />
          )}
          {activeTab === "Courses" && <Courses />}
          {activeTab === "Grades" && <Grades />}
          {activeTab === "Events" && <Events />}
          {activeTab === "Classes" && <Classes />}
          {activeTab === "Notices" && <Notices />}
          {activeTab === "Profile" && <Profile />}
          {activeTab === "Transcript" && <Transcript />}
        </div>
        {/* Right screen */}
        <div className="col-span-2 bg-st-bg h-screen flex-col hidden md:flex transition-all duration-600 scroll-smooth overflow-y-auto">
          {/* Right profile bar */}
          <div className="flex border-b p-2 ml-2 justify-between transition-all duration-600">
            <div className="flex">
              <div className="bg-green-700 rounded-full mr-2 text-white">
                <User size={50} />
              </div>
              <div className="flex justify-between">
                <div className="flex-col">
                  <p className="font-semibold">Sospeter Bisera</p>
                  <p className="text-sm text-muted">S13/04395/24</p>
                </div>
              </div>
            </div>
            <ThemeToggle />
            <div className="bg-green-700 rounded-full p-2 text-white">
              <Bell size={30} />
            </div>
          </div>
          {/* calendar component */}
          <div className="p-2 bg-st-bg-m rounded-xl m-3 transition-all duration-600">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
            />
          </div>
          {/* Brief events component */}
          <div className="m-3 p-2 bg-st-bg-m rounded-2xl transition-all duration-600">
            <div className="flex justify-between border-b pb-2">
              <h4 className="font-semibold text-lg">Upcoming Events</h4>
              <button
                onClick={() => setActiveTab("Events")}
                className="border-green-500 border hover:cursor-pointer rounded-lg p-1 hover:scale-105 hover:text-white hover:bg-green-800 transition-all duration-300"
              >
                View all
              </button>
            </div>
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-2xl bg-st-bg p-2 mt-2 border border-gray-500 transition-all duration-600"
              >
                <h3>{event.title}</h3>
                <div className="flex text-muted text-sm">
                  <Clock size={18} className="mr-1" />
                  {event.time}
                </div>
                <div className="flex *: items-center gap-2 mt-2">
                  <div className="rounded-full bg-green-700 p-1 text-white">
                    <User2Icon />
                  </div>
                  <p className="text-muted">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
