import { ThemeToggle } from "../themeToggle";
import HamComponent from "./Hamburger";

export default function TopBar({ activeTab, setActiveTab }) {
  return (
    <aside className="flex justify-between md:hidden">
      <HamComponent activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="text-right pr-2 flex">
        <div>
          <p className="text-xl">Student portal</p>
          <p className="text-muted text-sm">Manage your academic profile</p>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
