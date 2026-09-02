import { NavLink } from 'react-router-dom';
import { LayoutGrid, FileText, BookOpen, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/flashcards', label: 'Flashcards', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: User },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between fixed inset-y-0 left-0">
      <div>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900 text-lg">AI Learning Assistant</span>
        </div>

        <nav className="px-4 mt-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 mx-4 mb-6 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;