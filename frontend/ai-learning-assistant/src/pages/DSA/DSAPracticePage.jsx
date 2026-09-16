import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Brain,
    Code2,
    Eye,
    Flame,
    GitBranch,
    Play,
    Sparkles,
    Target,
    Trophy,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const topics = [
    {
        name: "Arrays",
        progress: 80,
        problems: 18,
    },
    {
        name: "Strings",
        progress: 65,
        problems: 12,
    },
    {
        name: "Linked Lists",
        progress: 55,
        problems: 10,
    },
    {
        name: "Trees",
        progress: 40,
        problems: 8,
    },
    {
        name: "Graphs",
        progress: 30,
        problems: 6,
    },
    {
        name: "Dynamic Programming",
        progress: 20,
        problems: 4,
    },
];

export default function DSAPracticePage() {
    const navigate = useNavigate();

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
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Code2 className="w-6 h-6 text-primary" />
                            </div>

                            <div>
                                <p className="text-primary text-xs font-semibold tracking-wide">
                                    DSA LAB
                                </p>

                                <h1 className="text-3xl font-bold text-white">
                                    DSA Practice
                                </h1>
                            </div>
                        </div>

                        <p className="text-gray-500 mt-4 max-w-2xl leading-6">
                            Solve problems, understand algorithms, visualize
                            how they work, and improve your problem-solving
                            skills.
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 lg:min-w-[330px]">
                        <div className="bg-[#20242B] border border-[#30353E] rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-white">
                                42
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Solved
                            </p>
                        </div>

                        <div className="bg-[#20242B] border border-[#30353E] rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-white">
                                7
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Topics
                            </p>
                        </div>

                        <div className="bg-[#20242B] border border-[#30353E] rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-white">
                                68%
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Accuracy
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Continue Challenge */}
            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <Flame className="w-5 h-5 text-primary" />

                            <p className="text-sm font-semibold text-white">
                                Continue Your Practice
                            </p>
                        </div>

                        <h2 className="text-xl font-semibold text-white mt-3">
                            Two Pointer — Pair Sum
                        </h2>

                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            <span className="text-xs text-gray-500">
                                Arrays
                            </span>

                            <span className="text-gray-700">•</span>

                            <span className="text-xs text-gray-500">
                                Medium
                            </span>

                            <span className="text-gray-700">•</span>

                            <span className="text-xs text-gray-500">
                                Problem 3
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/dsa/problem")}
                        className="shrink-0 px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        Continue Problem
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Tools */}
            <div>
                <div className="mb-4">
                    <p className="text-primary text-xs font-semibold tracking-wide">
                        LEARN & PRACTICE
                    </p>

                    <h2 className="text-xl font-semibold text-white mt-1">
                        Choose Your Mode
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Problem Solver */}
                    <button
                        type="button"
                        onClick={() => navigate("/dsa/problem")}
                        className="group text-left bg-[#181B21] border border-[#292D36] rounded-2xl p-6 hover:bg-[#20242B] hover:border-[#3A404A] transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <Brain className="w-6 h-6 text-primary" />
                            </div>

                            <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                        </div>

                        <h3 className="text-lg font-semibold text-white mt-6">
                            Problem Solver
                        </h3>

                        <p className="text-sm text-gray-500 leading-6 mt-2">
                            Solve real DSA problems instead of just answering
                            MCQs. Think, code, test, and improve.
                        </p>

                        <div className="flex items-center gap-2 mt-5 text-xs text-gray-600">
                            <Code2 className="w-4 h-4" />
                            Coding challenges
                        </div>
                    </button>

                    {/* Visualizer */}
                    <button
                        type="button"
                        onClick={() => navigate("/dsa/visualizer")}
                        className="group text-left bg-[#181B21] border border-[#292D36] rounded-2xl p-6 hover:bg-[#20242B] hover:border-[#3A404A] transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <Eye className="w-6 h-6 text-primary" />
                            </div>

                            <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                        </div>

                        <h3 className="text-lg font-semibold text-white mt-6">
                            Algorithm Visualizer
                        </h3>

                        <p className="text-sm text-gray-500 leading-6 mt-2">
                            Watch sorting, searching, trees, stacks, and
                            other algorithms work step by step.
                        </p>

                        <div className="flex items-center gap-2 mt-5 text-xs text-gray-600">
                            <Play className="w-4 h-4" />
                            Interactive visualization
                        </div>
                    </button>

                    {/* DSA Coach */}
                    <button
                        type="button"
                        onClick={() => navigate("/dsa/coach")}
                        className="group text-left bg-[#181B21] border border-[#292D36] rounded-2xl p-6 hover:bg-[#20242B] hover:border-[#3A404A] transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>

                            <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                        </div>

                        <h3 className="text-lg font-semibold text-white mt-6">
                            AI DSA Coach
                        </h3>

                        <p className="text-sm text-gray-500 leading-6 mt-2">
                            Get hints, understand your mistakes, analyze your
                            approach, and discover weak topics.
                        </p>

                        <div className="flex items-center gap-2 mt-5 text-xs text-gray-600">
                            <Target className="w-4 h-4" />
                            Personalized guidance
                        </div>
                    </button>

                    {/* Progress */}
                    <button
                        type="button"
                        onClick={() => navigate("/dsa/progress")}
                        className="group text-left bg-[#181B21] border border-[#292D36] rounded-2xl p-6 hover:bg-[#20242B] hover:border-[#3A404A] transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <BarChart3 className="w-6 h-6 text-primary" />
                            </div>

                            <ArrowRight className="w-5 h-5 text-gray-700 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                        </div>

                        <h3 className="text-lg font-semibold text-white mt-6">
                            DSA Progress
                        </h3>

                        <p className="text-sm text-gray-500 leading-6 mt-2">
                            Track solved problems, accuracy, attempts, and
                            progress across different DSA topics.
                        </p>

                        <div className="flex items-center gap-2 mt-5 text-xs text-gray-600">
                            <Trophy className="w-4 h-4" />
                            Track your growth
                        </div>
                    </button>
                </div>
            </div>

            {/* Topic Progress */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-primary text-xs font-semibold tracking-wide">
                            YOUR JOURNEY
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-1">
                            Topic Progress
                        </h2>
                    </div>

                    <GitBranch className="w-5 h-5 text-gray-600" />
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {topics.map((item) => (
                            <div key={item.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-300">
                                            {item.name}
                                        </p>

                                        <p className="text-xs text-gray-600 mt-1">
                                            {item.problems} problems solved
                                        </p>
                                    </div>

                                    <span className="text-xs text-gray-500">
                                        {item.progress}%
                                    </span>
                                </div>

                                <div className="h-1.5 bg-[#20242B] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{
                                            width: `${item.progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Daily Challenge */}
            <div className="mt-8 mb-4">
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <div>
                            <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-primary" />

                                <p className="text-xs font-semibold text-primary tracking-wide">
                                    DAILY CHALLENGE
                                </p>
                            </div>

                            <h2 className="text-lg font-semibold text-white mt-3">
                                Find the Missing Number
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Arrays · Easy · ~10 min
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/dsa/problem")}
                            className="px-5 py-3 rounded-xl bg-[#20242B] border border-[#30353E] text-gray-300 hover:bg-[#292E36] transition-colors flex items-center justify-center gap-2"
                        >
                            Solve Challenge
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}