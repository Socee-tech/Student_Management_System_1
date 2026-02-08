import { Menu } from "lucide-react";
import { ThemeToggle } from "../themeToggle";
import { cn } from "../../lib/utils";

export default function Topbar({ isMenuOpen }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-4 py-3 bg-foreground/90 backdrop-blur border-b border-border/60 shadow-[0px_10px_24px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => isMenuOpen(true)}
          className="md:hidden px-2 py-1"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">
            Admin <span className="hidden md:block">Dashboard</span>
          </h1>
          <p className="text-xs text-muted">School management suite</p>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-4 rounded-2xl border border-border/60 bg-foreground px-3 py-1",
          "shadow-[6px_6px_26px_rgba(0,0,0,0.58)]"
        )}
      >
        <ThemeToggle />

        <div className="text-sm mr-1 hidden md:flex">Admin User</div>
      </div>
    </nav>
  );
}
