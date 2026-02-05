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
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <p className="text-xs text-muted">School management suite</p>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-4 rounded-2xl border border-border/60 bg-surface px-3 py-2",
          "shadow-[6px_6px_16px_rgba(0,0,0,0.08)]"
        )}
      >
        <ThemeToggle />

        <div className="text-sm mr-1">Admin User</div>
      </div>
    </nav>
  );
}
