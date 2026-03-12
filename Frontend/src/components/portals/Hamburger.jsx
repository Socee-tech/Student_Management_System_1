import { AnimatePresence, motion } from "framer-motion";
import {
  Book,
  Clock,
  Home,
  Menu,
  Settings,
  TrendingUp,
  User2,
  X,
} from "lucide-react";
import { useState } from "react";

export default function HamComponent({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const MotionDiv = motion.div;
  const MotionAside = motion.aside;
  const navigations = [
    { name: "Dashboard", icon: Home },
    { name: "Courses", icon: Book },
    { name: "Grades", icon: TrendingUp },
    { name: "Events", icon: Clock },
    { name: "Profile", icon: User2 },
    { name: "Transcript", icon: Book },
    { name: "Settings", icon: Settings },
  ];
  const sideBarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 28, mass: 0.9 },
    },
    closed: {
      x: "-100%",
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
    },
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:cursor-pointer bg-st-bg-m pl-3 pr-3 transition-all duration-600 rounded-2xl ml-2 mt-1"
      >
        <Menu />
      </button>
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            className="fixed inset-0 bg-black/40 backdrop:blur-2xl bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.22 } }}
            exit={{ opacity: 0, transition: { duration: 0.22, delay: 0.04 } }}
            onClick={() => setIsOpen(false)}
          >
            <MotionAside
              variants={sideBarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 h-full w-64 shadow-lg z-50 p-2 pr-0 bg-st-bg-m"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-right w-full">
                <button onClick={() => setIsOpen(false)} className="m-2">
                  <X />
                </button>
              </div>
              {navigations.map((nav) => {
                const Icon = nav.icon;
                return (
                  <button
                    key={nav.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-l-lg transition-colors w-full duration-300 ${
                      activeTab === nav.name
                        ? "bg-gray-500 text-white"
                        : "hover:bg-st-nav-active/10 hover:cursor-pointer"
                    }`}
                    onClick={() => {
                      setActiveTab(nav.name);
                      setIsOpen(false);
                    }}
                  >
                    <Icon size={18} />
                    <span>{nav.name}</span>
                  </button>
                );
              })}
            </MotionAside>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
