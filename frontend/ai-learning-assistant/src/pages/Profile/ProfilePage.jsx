import { useState } from "react";
import {
    ArrowLeft,
    Bell,
    Check,
    LogOut,
    Mail,
    Save,
    Settings,
    User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
    const navigate = useNavigate();
    const { user, setUser, logout } = useAuth();

    const [username, setUsername] = useState(user?.username || "User");
    const [email, setEmail] = useState(user?.email || "");
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        setUser({
            ...user,
            username: username.trim() || "User",
            email: email.trim(),
        });

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 1800);
    };

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back */}
            <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            {/* Header */}
            <div className="mb-8">
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">
                    ACCOUNT
                </p>

                <h1 className="text-3xl font-bold text-white mt-2">
                    Profile
                </h1>

                <p className="text-gray-500 mt-2">
                    Manage your account details and learning preferences.
                </p>
            </div>

            {/* Profile Card */}
            <section className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary">
                                {(username || "U")
                                    .charAt(0)
                                    .toUpperCase()}
                            </span>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                {username || "User"}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {email || "No email added"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#292D36]" />

                {/* Personal Information */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white">
                                Personal Information
                            </h3>

                            <p className="text-xs text-gray-600 mt-1">
                                Update the details shown on your account.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label
                                htmlFor="profile-username"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Username
                            </label>

                            <input
                                id="profile-username"
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                className="w-full bg-[#20242B] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-gray-200 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="profile-email"
                                className="block text-sm font-medium text-gray-400 mb-2"
                            >
                                Email
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />

                                <input
                                    id="profile-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    className="w-full bg-[#20242B] border border-[#30353E] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 transition-colors"
                        >
                            {saved ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}

                            {saved ? "Saved" : "Save Changes"}
                        </button>
                    </div>
                </div>

                <div className="border-t border-[#292D36]" />

                {/* Preferences */}
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                            <Settings className="w-4 h-4 text-primary" />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white">
                                Preferences
                            </h3>

                            <p className="text-xs text-gray-600 mt-1">
                                Control how your learning experience behaves.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#20242B] border border-[#30353E]">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#181B21] flex items-center justify-center">
                                <Bell className="w-4 h-4 text-gray-400" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-200">
                                    Learning notifications
                                </p>

                                <p className="text-xs text-gray-600 mt-1">
                                    Receive reminders about your study activity.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setNotifications((prev) => !prev)
                            }
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                                notifications
                                    ? "bg-primary"
                                    : "bg-[#30353E]"
                            }`}
                            aria-label="Toggle learning notifications"
                            aria-pressed={notifications}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                    notifications
                                        ? "translate-x-6"
                                        : "translate-x-1"
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <div className="border-t border-[#292D36]" />

                {/* Account Actions */}
                <div className="p-6 md:p-8">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/20 text-sm font-medium text-red-400 hover:bg-red-500/5 hover:border-red-500/30 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            </section>
        </div>
    );
}