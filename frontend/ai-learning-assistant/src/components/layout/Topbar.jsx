import { Bell, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
    const { user } = useAuth();

    return (
        <header className="h-20 flex items-center justify-end gap-5 px-6 lg:px-8 border-b border-[#292D36] bg-[#13151A]">

            {/* Notification */}
            <button
                className="relative p-2.5 rounded-xl hover:bg-[#292E36] transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-gray-400" />

                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </button>

            {/* User */}
            <div className="flex items-center gap-3 pl-4 border-l border-[#292D36]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                </div>

                <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">
                        {user?.username || "User"}
                    </p>

                    <p className="text-xs text-gray-500">
                        {user?.email}
                    </p>
                </div>
            </div>

        </header>
    );
}