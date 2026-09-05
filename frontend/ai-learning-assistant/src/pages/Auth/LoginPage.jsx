import { useState } from "react";
import {
    BrainCircuit,
    Eye,
    EyeOff,
    Lock,
    Mail,
    ArrowRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = formData.email.trim();
        const password = formData.password.trim();

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 500));

        setUser({
            username: email.split("@")[0] || "User",
            email,
        });

        const destination = location.state?.from?.pathname || "/dashboard";

        navigate(destination, { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-xl shadow-purple-500/20">
                        <BrainCircuit className="w-7 h-7 text-white" />
                    </div>

                    <p className="text-primary text-sm font-semibold mt-6">
                        AI LEARNING ASSISTANT
                    </p>

                    <h1 className="text-3xl font-bold text-white mt-2">
                        Welcome back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Sign in to continue your learning journey.
                    </p>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 sm:p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Email
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full bg-[#20242B] border border-[#30353E] rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full bg-[#20242B] border border-[#30353E] rounded-xl pl-11 pr-12 py-3 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-200 transition-colors"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                                <p className="text-sm text-red-400">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white py-3 text-sm font-semibold hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                            {!isSubmitting && (
                                <ArrowRight className="w-4 h-4" />
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-[#292D36] text-center">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-primary hover:text-purple-300 font-medium transition-colors"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs text-gray-600 mt-6">
                    Frontend demo mode · Real authentication will be connected
                    later.
                </p>
            </div>
        </div>
    );
}