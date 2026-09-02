import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, BookOpen, User, LogOut, BrainCircuit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/documents', label: 'Documents', icon: FileText },
    { to: '/flashcards', label: 'Flashcards', icon: BookOpen },
    { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col shrink-0">
            <div className="flex items-center gap-2 px-6 py-6">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-gray-900">AI Learning Assistant</span>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                                isActive
                                    ? 'bg-primary text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`
                        }
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            <div className="px-3 pb-6">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 w-full transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
}