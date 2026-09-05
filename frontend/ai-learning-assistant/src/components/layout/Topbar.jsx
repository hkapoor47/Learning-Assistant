import { Bell, BrainCircuit, User, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
    const { user } = useAuth();

    return (
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-[#292D36] bg-[#13151A]">

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <BrainCircuit className="w-5 h-5 text-white" />
                </div>

                <div className="leading-tight">
                    <p className="text-base font-semibold text-white">
                        AI Learning Assistant
                    </p>

                    {/* <p className="text-xs text-gray-500">
                        Learn smarter
                    </p> */}
                </div>
            </div>


            <div className="flex items-center gap-4">
                <button
                    type="button"
                    className="relative p-2.5 rounded-xl hover:bg-[#292E36] transition-colors"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5 text-gray-400" />

                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                </button>

                <div className="h-8 w-px bg-[#292D36]" />

                <button
                    type="button"
                    className="flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-[#292E36] transition-colors"
                >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                    </div>

                    <div className="hidden sm:block text-left leading-tight">
                        <p className="text-sm font-semibold text-white">
                            {user?.username || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
                </button>
            </div>
        </header>
    );
}