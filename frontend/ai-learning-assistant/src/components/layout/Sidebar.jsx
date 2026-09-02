import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    BookOpen,
    Brain,
    User,
    LogOut,
    BrainCircuit,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/documents", label: "Documents", icon: FileText },
    { to: "/flashcards", label: "Flashcards", icon: BookOpen },
    { to: "/quizzes", label: "Quizzes", icon: Brain },
    { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="w-64 min-h-screen bg-[#13151A] border-r border-[#292D36] flex flex-col shrink-0">

            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-7">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <BrainCircuit className="w-5 h-5 text-white" />
                </div>

                <div>
                    <p className="font-bold text-white">
                        AI Learning
                    </p>

                    <p className="text-xs text-gray-500">
                        Assistant
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">

                <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                    Workspace
                </p>

                {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-primary/15 text-primary border border-primary/20"
                                    : "text-gray-400 hover:bg-[#292E36] hover:text-white"
                            }`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </NavLink>
                ))}

            </nav>

            {/* Logout */}
            <div className="px-4 pb-6 border-t border-[#292D36] pt-5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-500/10 hover:text-red-400 w-full transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>

        </aside>
    );
}