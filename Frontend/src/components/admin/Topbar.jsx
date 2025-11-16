import { Menu } from 'lucide-react'
import { ThemeToggle } from '../themeToggle'
import { cn } from '../../lib/utils'

export default function Topbar({ isMenuOpen }) {

    return (
        <nav className="fixed top-0 left-0 w-full z-100 flex items-center justify-between p-4 bg-orange-500 rounded-xl shadow-[0px_10px_12px_rgba(0,0,0,0.3)] rounded-2xl">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => isMenuOpen(true)}
                    className="md:hidden px-2 py-1" aria-label="Open menu">
                    <Menu className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-semibold">Admin Panel</h1>
            </div>

            <div className={cn("flex items-center gap-4", "shadow-[6px_6px_12px_rgba(0,0,0,0.3)] rounded-2xl")}>
                <ThemeToggle />

                <div className="text-sm mr-1">Admin User</div>
            </div>
        </nav>
    )
}
