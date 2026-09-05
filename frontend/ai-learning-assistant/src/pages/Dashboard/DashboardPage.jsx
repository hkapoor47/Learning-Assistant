import {
    FileText,
    BookOpen,
    Brain,
    ArrowUpRight,
    Clock,
} from "lucide-react";

import { Link } from "react-router-dom";
import StatCard from "../../components/dashboard/statCard";

const activities = [
    {
        id: 1,
        title: "Uploaded Machine Learning Notes.pdf",
        time: "Today, 10:30 AM",
        icon: FileText,
    },
    {
        id: 2,
        title: "Created 20 new flashcards",
        time: "Yesterday, 4:15 PM",
        icon: BookOpen,
    },
    {
        id: 3,
        title: "Completed Python Fundamentals Quiz",
        time: "Yesterday, 2:40 PM",
        icon: Brain,
    },
];

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">

            
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white">
                    Dashboard
                </h1>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <Link
                    to="/documents"
                    className="block focus:outline-none"
                >
                    <StatCard
                        title="Documents"
                        value="4"
                        icon="documents"
                    />
                </Link>

                <Link
                    to="/flashcards"
                    className="block focus:outline-none"
                >
                    <StatCard
                        title="Flashcards"
                        value="50"
                        icon="flashcards"
                    />
                </Link>

                <Link
                    to="/quizzes"
                    className="block focus:outline-none"
                >
                    <StatCard
                        title="Quizzes"
                        value="4"
                        icon="quizzes"
                    />
                </Link>

            </div>

            <div className="mt-8 bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">

                <div className="flex items-center justify-between px-6 py-5 border-b border-[#292D36]">
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Recent Activity
                        </h2>

                        {/* <p className="text-sm text-gray-500 mt-1">
                            Your latest learning activity
                        </p> */}
                    </div>

                    <button
                        type="button"
                        className="text-sm text-primary hover:text-purple-300 font-medium transition-colors"
                    >
                        View all
                    </button>
                </div>

                <div>
                    {activities.map((activity) => {
                        const Icon = activity.icon;

                        return (
                            <div
                                key={activity.id}
                                className="flex items-center gap-4 px-6 py-5 border-b border-[#292D36] last:border-b-0 hover:bg-[#292E36] transition-colors"
                            >
                                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-200 truncate">
                                        {activity.title}
                                    </p>

                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Clock className="w-3.5 h-3.5 text-gray-600" />

                                        <p className="text-xs text-gray-500">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#343941] transition-colors"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>

            </div>

        </div>
    );
}