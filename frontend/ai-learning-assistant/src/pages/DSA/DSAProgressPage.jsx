import {
    ArrowLeft,
    BarChart3,
    CheckCircle2,
    Flame,
    Target,
    Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
    {
        name: "Arrays",
        solved: 18,
        total: 25,
        accuracy: 84,
    },
    {
        name: "Strings",
        solved: 12,
        total: 20,
        accuracy: 79,
    },
    {
        name: "Linked Lists",
        solved: 10,
        total: 20,
        accuracy: 72,
    },
    {
        name: "Trees",
        solved: 8,
        total: 20,
        accuracy: 68,
    },
    {
        name: "Graphs",
        solved: 6,
        total: 20,
        accuracy: 61,
    },
    {
        name: "Dynamic Programming",
        solved: 4,
        total: 20,
        accuracy: 55,
    },
];

const weeklyActivity = [
    { day: "Mon", problems: 3 },
    { day: "Tue", problems: 5 },
    { day: "Wed", problems: 2 },
    { day: "Thu", problems: 6 },
    { day: "Fri", problems: 4 },
    { day: "Sat", problems: 7 },
    { day: "Sun", problems: 3 },
];

export default function DSAProgressPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <Link
                to="/dsa"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to DSA Lab
            </Link>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <p className="text-primary text-xs font-semibold tracking-wide">
                            YOUR DSA JOURNEY
                        </p>

                        <h1 className="text-2xl font-bold text-white">
                            DSA Progress
                        </h1>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-3">
                    Track your problem-solving progress and identify areas
                    that need more practice.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>

                    <p className="text-2xl font-bold text-white mt-4">
                        42
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                        Problems Solved
                    </p>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-primary" />
                    </div>

                    <p className="text-2xl font-bold text-white mt-4">
                        78%
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                        Overall Accuracy
                    </p>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-primary" />
                    </div>

                    <p className="text-2xl font-bold text-white mt-4">
                        7 days
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                        Current Streak
                    </p>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-primary" />
                    </div>

                    <p className="text-2xl font-bold text-white mt-4">
                        6
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                        Topics Practiced
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5">
                {/* Weekly Activity */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-600 uppercase tracking-wide">
                                THIS WEEK
                            </p>

                            <h2 className="text-lg font-semibold text-white mt-1">
                                Practice Activity
                            </h2>
                        </div>

                        <span className="text-xs text-gray-600">
                            30 problems
                        </span>
                    </div>

                    <div className="h-[260px] mt-8 flex items-end justify-between gap-3">
                        {weeklyActivity.map((item) => {
                            const height =
                                (item.problems / 7) * 190;

                            return (
                                <div
                                    key={item.day}
                                    className="flex-1 h-full flex flex-col items-center justify-end gap-3"
                                >
                                    <span className="text-xs text-gray-600">
                                        {item.problems}
                                    </span>

                                    <div
                                        className="w-full max-w-12 rounded-t-lg bg-primary/70 hover:bg-primary transition-colors"
                                        style={{
                                            height: `${height}px`,
                                        }}
                                    />

                                    <span className="text-xs text-gray-700">
                                        {item.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Goal */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                    <p className="text-xs text-gray-600 uppercase tracking-wide">
                        WEEKLY GOAL
                    </p>

                    <h2 className="text-lg font-semibold text-white mt-1">
                        Keep the momentum
                    </h2>

                    <div className="flex items-center justify-center py-8">
                        <div className="w-36 h-36 rounded-full border-[10px] border-[#20242B] flex items-center justify-center relative">
                            <div className="absolute inset-[-10px] rounded-full border-[10px] border-primary border-r-transparent border-b-transparent rotate-[-35deg]" />

                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">
                                    7/10
                                </p>

                                <p className="text-xs text-gray-600 mt-1">
                                    sessions
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center leading-6">
                        Complete 3 more practice sessions this week to reach
                        your goal.
                    </p>
                </div>
            </div>

            {/* Topic Mastery */}
            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 mt-5">
                <div className="mb-6">
                    <p className="text-xs text-gray-600 uppercase tracking-wide">
                        TOPIC MASTERY
                    </p>

                    <h2 className="text-lg font-semibold text-white mt-1">
                        Your DSA Skills
                    </h2>
                </div>

                <div className="space-y-5">
                    {topics.map((topic) => {
                        const progress =
                            (topic.solved / topic.total) * 100;

                        return (
                            <div key={topic.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-300">
                                            {topic.name}
                                        </p>

                                        <p className="text-xs text-gray-700 mt-1">
                                            {topic.solved} of{" "}
                                            {topic.total} problems
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">
                                            {Math.round(progress)}%
                                        </p>

                                        <p className="text-[10px] text-gray-700 mt-1">
                                            {topic.accuracy}% accuracy
                                        </p>
                                    </div>
                                </div>

                                <div className="h-2 bg-[#20242B] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Recommended Focus */}
            <div className="mt-5 bg-[#181B21] border border-primary/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-primary" />

                            <p className="text-xs text-primary font-semibold">
                                RECOMMENDED FOCUS
                            </p>
                        </div>

                        <h2 className="text-lg font-semibold text-white mt-2">
                            Dynamic Programming
                        </h2>

                        <p className="text-sm text-gray-500 mt-1 max-w-xl">
                            Your current accuracy is lower in this topic.
                            Practice a few beginner problems before moving
                            to harder challenges.
                        </p>
                    </div>

                    <Link
                        to="/dsa/problem"
                        className="px-5 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors text-center"
                    >
                        Practice Now
                    </Link>
                </div>
            </div>
        </div>
    );
}