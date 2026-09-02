import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutGrid, FileText, BookOpen, User, LogOut, Bell, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // adjust path to match your project

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/flashcards', label: 'Flashcards', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: User },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
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
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
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
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 mx-4 mb-6 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-20 flex items-center justify-end gap-6 px-8 border-b border-gray-100 bg-white">
          <button className="relative">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-semibold">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;