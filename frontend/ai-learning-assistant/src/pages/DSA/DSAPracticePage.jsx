import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Brain,
    CalendarDays,
    Clock3,
    Code2,
    Eye,
    Flame,
    Play,
    Sparkles,
    Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const modes = [
    {
        title: "Problem Solver",
        description:
            "Solve DSA problems instead of just answering MCQs. Think, code, test, and improve.",
        icon: Brain,
        meta: "Coding challenges",
        path: "/dsa/problem",
    },
    {
        title: "Algorithm Visualizer",
        description:
            "Watch sorting, searching, trees, stacks, and other algorithms work step by step.",
        icon: Eye,
        meta: "Interactive visualization",
        path: "/dsa/visualizer",
    },
    {
        title: "AI DSA Coach",
        description:
            "Get hints, understand your mistakes, analyze your approach, and discover weak topics.",
        icon: Sparkles,
        meta: "Personalized guidance",
        path: "/dsa/coach",
    },
    {
        title: "DSA Progress",
        description:
            "Track solved problems, accuracy, attempts, streaks, and progress across your DSA journey.",
        icon: BarChart3,
        meta: "Track your growth",
        path: "/dsa/progress",
    },
];

export default function DSAPracticePage() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Back */}
            <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            {/* Hero */}
            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-8 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <Code2 className="w-4 h-4 text-primary" />

                            <span className="text-xs font-semibold text-primary tracking-wide">
                                DSA LAB
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Learn • Solve • Visualize • Improve
                        </h1>

                        <p className="text-gray-500 text-sm md:text-base mt-3 max-w-2xl leading-6">
                            Practice Data Structures and Algorithms through
                            real problems, visual explanations, guided hints,
                            and personalized learning.
                        </p>
                    </div>

                    <div className="hidden lg:flex w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 items-center justify-center">
                        <Code2 className="w-7 h-7 text-primary" />
                    </div>
                </div>
            </div>

            {/* Continue Practice */}
            <section className="mb-7">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-xs text-primary font-semibold tracking-wide">
                            CONTINUE PRACTICE
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-1">
                            Pick up where you left off
                        </h2>
                    </div>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5 md:p-6 hover:bg-[#20242B] transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Target className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-semibold text-white">
                                        Two Pointer — Pair Sum
                                    </h3>

                                    <span className="px-2 py-1 rounded-md bg-[#20242B] text-xs text-gray-500">
                                        Arrays
                                    </span>

                                    <span className="px-2 py-1 rounded-md bg-[#20242B] text-xs text-gray-500">
                                        Medium
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 mt-2">
                                    Continue solving your current DSA challenge.
                                </p>

                                <div className="flex items-center gap-2 mt-4">
                                    <div className="w-32 h-1.5 bg-[#292D36] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: "65%" }}
                                        />
                                    </div>

                                    <span className="text-xs text-gray-600">
                                        65% complete
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/dsa/problem"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                            Continue
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modes */}
            <section className="mb-7">
                <div className="mb-4">
                    <p className="text-xs text-primary font-semibold tracking-wide">
                        LEARN & PRACTICE
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-1">
                        Choose Your Mode
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {modes.map((mode) => {
                        const Icon = mode.icon;

                        return (
                            <Link
                                key={mode.title}
                                to={mode.path}
                                className="group bg-[#181B21] border border-[#292D36] rounded-2xl p-6 hover:bg-[#20242B] hover:border-[#3A404A] transition-all"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="w-13 h-13 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                        <Icon className="w-6 h-6 text-primary" />
                                    </div>

                                    <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                                </div>

                                <h3 className="text-lg font-semibold text-white mt-7">
                                    {mode.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-6 mt-2">
                                    {mode.description}
                                </p>

                                <div className="flex items-center gap-2 mt-6">
                                    <Code2 className="w-4 h-4 text-gray-700" />

                                    <span className="text-xs text-gray-600">
                                        {mode.meta}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Daily Challenge */}
            <section>
                <div className="mb-4">
                    <p className="text-xs text-primary font-semibold tracking-wide">
                        DAILY CHALLENGE
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-1">
                        One problem a day
                    </h2>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                <Flame className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-semibold text-white">
                                        Valid Parentheses
                                    </h3>

                                    <span className="px-2 py-1 rounded-md bg-[#20242B] text-xs text-gray-500">
                                        Stack
                                    </span>

                                    <span className="px-2 py-1 rounded-md bg-[#20242B] text-xs text-gray-500">
                                        Easy
                                    </span>
                                </div>

                                <p className="text-sm text-gray-500 mt-2 max-w-xl">
                                    Determine whether a string containing
                                    brackets has valid opening and closing
                                    pairs.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mt-4">
                                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                        <CalendarDays className="w-3.5 h-3.5" />
                                        Today
                                    </span>

                                    <span className="flex items-center gap-1.5 text-xs text-gray-600">
                                        <Clock3 className="w-3.5 h-3.5" />
                                        ~10 min
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/dsa/problem"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#20242B] border border-[#30353E] text-gray-300 text-sm font-medium hover:bg-[#292E36] hover:text-white transition-colors"
                        >
                            <Play className="w-4 h-4" />
                            Start Challenge
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}