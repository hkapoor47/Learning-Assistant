import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
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
  );
};

export default Header;