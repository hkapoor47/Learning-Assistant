import { useEffect, useRef, useState } from "react";
import {
    Bell,
    BookOpen,
    BrainCircuit,
    ChevronDown,
    Code2,
    FileText,
    LogOut,
    PlaySquare,
    Settings,
    Sparkles,
    Target,
    User,
    UserCircle,
    X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const learningTools = [
    {
        title: "PDF Study Material",
        description: "Read, chat, and study from PDFs",
        icon: FileText,
        path: "/documents",
        available: true,
    },
    {
        title: "YouTube Learning",
        description: "Turn videos into study material",
        icon: PlaySquare,
        path: "/youtube",
        available: true,
    },
    {
        title: "Flashcards",
        description: "Practice active recall",
        icon: BookOpen,
        path: "/flashcards",
        available: true,
    },
    {
        title: "Quizzes",
        description: "Test your understanding",
        icon: BrainCircuit,
        path: "/quizzes",
        available: true,
    },
    {
        title: "Code Reviewer",
        description: "Review and improve your code",
        icon: Code2,
        path: "#",
        available: false,
    },
    {
        title: "Resume Analyzer",
        description: "Analyze and improve your resume",
        icon: Target,
        path: "#",
        available: false,
    },
    {
        title: "DSA Practice",
        description: "Practice data structures and algorithms",
        icon: Sparkles,
        path: "#",
        available: false,
    },
];

export default function Topbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = () => {
        setIsProfileOpen(false);
        setIsToolsOpen(false);

        logout();
        navigate("/login", { replace: true });
    };

    return (
        <>
            <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-[#292D36] bg-[#13151A]">
                <Link
                    to="/dashboard"
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-purple-500/20">
                        <BrainCircuit className="w-5 h-5 text-white" />
                    </div>

                    <div className="leading-tight">
                        <p className="text-base font-semibold text-white">
                            AI Learning Assistant
                        </p>

                        <p className="text-xs text-gray-500">
                            Learn smarter
                        </p>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    {/* Learning Tools */}
                    <button
                        type="button"
                        onClick={() => {
                            setIsToolsOpen((prev) => !prev);
                            setIsProfileOpen(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                            isToolsOpen
                                ? "bg-[#292E36] border-[#3A404A] text-white"
                                : "border-transparent text-gray-400 hover:bg-[#292E36] hover:text-white"
                        }`}
                        aria-expanded={isToolsOpen}
                    >
                        <Sparkles className="w-4 h-4 text-primary" />

                        <span className="hidden sm:block text-sm font-medium">
                            Learning Tools
                        </span>

                        {isToolsOpen ? (
                            <X className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                    <div className="h-8 w-px bg-[#292D36]" />

                    {/* Notifications */}
                    <button
                        type="button"
                        className="relative p-2.5 rounded-xl hover:bg-[#292E36] transition-colors"
                        aria-label="Notifications"
                    >
                        <Bell className="w-5 h-5 text-gray-400" />

                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                    </button>

                    <div className="h-8 w-px bg-[#292D36]" />

                    {/* Profile */}
                    <div
                        ref={profileRef}
                        className="relative"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setIsProfileOpen((prev) => !prev);
                                setIsToolsOpen(false);
                            }}
                            className={`flex items-center gap-3 px-2 py-1.5 rounded-xl border transition-all ${
                                isProfileOpen
                                    ? "bg-[#292E36] border-[#3A404A]"
                                    : "border-transparent hover:bg-[#292E36]"
                            }`}
                            aria-expanded={isProfileOpen}
                        >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                            </div>

                            <div className="hidden sm:block text-left leading-tight">
                                <p className="text-sm font-semibold text-white">
                                    {user?.username || "User"}
                                </p>

                                <p className="text-xs text-gray-500 max-w-[150px] truncate">
                                    {user?.email || "No email"}
                                </p>
                            </div>

                            <ChevronDown
                                className={`w-4 h-4 text-gray-500 hidden sm:block transition-transform ${
                                    isProfileOpen
                                        ? "rotate-180"
                                        : ""
                                }`}
                            />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 bg-[#181B21] border border-[#30353E] rounded-2xl shadow-2xl overflow-hidden">
                                <div className="px-4 py-4 border-b border-[#292D36]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-primary" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-white truncate">
                                                {user?.username || "User"}
                                            </p>

                                            <p className="text-xs text-gray-600 truncate mt-1">
                                                {user?.email || "No email"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2">
                                    <Link
                                        to="/profile"
                                        onClick={() =>
                                            setIsProfileOpen(false)
                                        }
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-[#292E36] transition-colors"
                                    >
                                        <UserCircle className="w-4 h-4" />
                                        Profile
                                    </Link>

                                    <button
                                        type="button"
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-[#292E36] transition-colors"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>
                                </div>

                                <div className="border-t border-[#292D36] p-2">
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Learning Tools Dropdown */}
            {isToolsOpen && (
                <div className="fixed inset-0 z-40">
                    <button
                        type="button"
                        className="absolute inset-0 cursor-default"
                        onClick={() => setIsToolsOpen(false)}
                        aria-label="Close learning tools"
                    />

                    <div className="absolute top-[88px] right-6 lg:right-10 w-[calc(100vw-2rem)] max-w-[420px] bg-[#181B21] border border-[#30353E] rounded-2xl shadow-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#292D36]">
                            <p className="text-sm font-semibold text-white">
                                Learning Tools
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                Jump directly to any part of your learning
                                workspace.
                            </p>
                        </div>

                        <div className="p-3 max-h-[70vh] overflow-y-auto">
                            {learningTools.map((tool) => {
                                const Icon = tool.icon;

                                if (!tool.available) {
                                    return (
                                        <div
                                            key={tool.title}
                                            className="flex items-center gap-3 px-3 py-3 rounded-xl opacity-50"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-[#20242B] border border-[#30353E] flex items-center justify-center shrink-0">
                                                <Icon className="w-5 h-5 text-gray-500" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium text-gray-300">
                                                        {tool.title}
                                                    </p>

                                                    <span className="text-[10px] font-medium text-gray-600 border border-[#30353E] rounded-full px-2 py-0.5">
                                                        Soon
                                                    </span>
                                                </div>

                                                <p className="text-xs text-gray-600 mt-1">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <Link
                                        key={tool.title}
                                        to={tool.path}
                                        onClick={() =>
                                            setIsToolsOpen(false)
                                        }
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[#292E36] transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/15">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-200 group-hover:text-white">
                                                {tool.title}
                                            </p>

                                            <p className="text-xs text-gray-600 group-hover:text-gray-500 mt-1">
                                                {tool.description}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}