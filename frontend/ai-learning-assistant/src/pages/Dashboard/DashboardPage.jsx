import { FileText, BookOpen, Brain, ArrowRight } from "lucide-react";
import StatCard from "../../components/dashboard/statCard";

const activities = [
    {
        id: 1,
        type: "document",
        title: "Uploaded Machine Learning Notes.pdf",
        time: "Today, 10:30 AM",
        icon: FileText,
    },
    {
        id: 2,
        type: "flashcard",
        title: "Created 20 flashcards",
        time: "Yesterday, 4:15 PM",
        icon: BookOpen,
    },
    {
        id: 3,
        type: "quiz",
        title: "Completed Python Fundamentals Quiz",
        time: "Yesterday, 2:40 PM",
        icon: Brain,
    },
];

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Track your learning progress and activity
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <StatCard
                    title="Total Documents"
                    value="4"
                    icon="documents"
                />

                <StatCard
                    title="Total Flashcards"
                    value="50"
                    icon="flashcards"
                />

                <StatCard
                    title="Total Quizzes"
                    value="4"
                    icon="quizzes"
                />

            </div>

            {/* Recent Activity */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm">

                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Recent Activity
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your latest learning activities
                        </p>
                    </div>

                    <button className="text-sm font-medium text-primary hover:underline">
                        View All
                    </button>
                </div>

                <div className="divide-y divide-gray-100">

                    {activities.map((activity) => {
                        const Icon = activity.icon;

                        return (
                            <div
                                key={activity.id}
                                className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors"
                            >
                                {/* Icon */}
                                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>

                                {/* Activity information */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                        {activity.title}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {activity.time}
                                    </p>
                                </div>

                                {/* View */}
                                <button
                                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                >
                                    View
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}

                </div>
            </div>

        </div>
    );
}