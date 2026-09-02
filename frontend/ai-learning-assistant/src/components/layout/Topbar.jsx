import { Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
    const { user } = useAuth();

    return (
        <header className="h-20 flex items-center justify-end gap-4 px-8 border-b border-gray-100 bg-white">
            <button
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </button>

            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                    <p className="text-sm font-semibold text-gray-900">{user?.username || 'User'}</p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
            </div>
        </header>
    );
}