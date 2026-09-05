import {
    Activity,
    ArrowRight,
    BookOpen,
    Brain,
    CheckCircle2,
    Clock3,
    Code2,
    FileText,
    PlaySquare,
    Sparkles,
    Target,
    Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

const activeTools = [
    {
        title: "PDF Study Material",
        description: "Study from PDFs with AI-powered tools.",
        icon: FileText,
        path: "/documents",
        action: "Open Documents",
    },
    {
        title: "YouTube Learning",
        description: "Turn educational videos into study material.",
        icon: PlaySquare,
        path: "/youtube",
        action: "Start Learning",
    },
    {
        title: "Flashcards",
        description: "Strengthen memory with active recall.",
        icon: BookOpen,
        path: "/flashcards",
        action: "Study Flashcards",
    },
    {
        title: "Quizzes",
        description: "Test your understanding and knowledge.",
        icon: Brain,
        path: "/quizzes",
        action: "Practice Quizzes",
    },
];

const upcomingTools = [
    {
       title: "Code Reviewer",
       description: "Review code, find bugs, and understand complexity.",
       icon: Code2,
       path: "/code-reviewer",
       available: true,
    },
    {
        title: "Resume Analyzer",
        description: "Improve your resume and match it with opportunities.",
        icon: Target,
    },
    {
        title: "DSA Practice",
        description: "Practice data structures and algorithms.",
        icon: Sparkles,
    },
];

const recentActivities = [
    {
        id: 1,
        icon: FileText,
        title: "Opened Machine Learning Notes.pdf",
        time: "Today · 4:32 PM",
    },
    {
        id: 2,
        icon: BookOpen,
        title: "Generated flashcards",
        detail: "Machine Learning Notes.pdf",
        time: "Today · 4:18 PM",
    },
    {
        id: 3,
        icon: CheckCircle2,
        title: "Completed quiz",
        detail: "Python Fundamentals",
        time: "Yesterday · 8:42 PM",
    },
    {
        id: 4,
        icon: Upload,
        title: "Uploaded a new PDF",
        detail: "Database Management Systems.pdf",
        time: "Yesterday · 6:15 PM",
    },
];

function LearningToolCard({ tool }) {
    const Icon = tool.icon;

    return (
        <Link
            to={tool.path}
            className="group relative bg-[#20242B] border border-[#30353E] rounded-2xl p-5 min-h-[220px] flex flex-col overflow-hidden hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300"
        >
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                </div>

                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>

            <div className="relative mt-5">
                <h3 className="text-base font-semibold text-white">
                    {tool.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 leading-6">
                    {tool.description}
                </p>
            </div>

            <div className="relative mt-auto pt-5">
                <div className="pt-4 border-t border-[#30353E]">
                    <span className="text-xs font-medium text-primary">
                        {tool.action}
                    </span>
                </div>
            </div>
        </Link>
    );
}

function RecentActivityItem({ activity, isLast }) {
    const Icon = activity.icon;

    return (
        <div className="relative flex gap-3">
            <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                </div>

                {!isLast && (
                    <div className="absolute left-1/2 top-10 -translate-x-1/2 w-px h-8 bg-[#30353E]" />
                )}
            </div>

            <div className={`${isLast ? "" : "pb-5"} min-w-0 pt-0.5`}>
                <p className="text-sm font-medium text-gray-200 leading-5">
                    {activity.title}
                </p>

                {activity.detail && (
                    <p className="text-xs text-gray-600 mt-1 truncate">
                        {activity.detail}
                    </p>
                )}

                <div className="flex items-center gap-1.5 mt-1.5">
                    <Clock3 className="w-3 h-3 text-gray-600" />

                    <span className="text-xs text-gray-600">
                        {activity.time}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <p className="text-primary text-sm font-semibold mb-2">
                    YOUR LEARNING SPACE
                </p>

                <h1 className="text-3xl font-bold text-white">
                    Learning Hub
                </h1>

                <p className="text-gray-500 mt-2 max-w-2xl leading-6">
                    Everything you need to study, practice, and learn more
                    effectively in one place.
                </p>
            </div>

            {/* Learning Tools + Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] gap-6">
                {/* Learning Tools */}
                <section>
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-5 h-5 text-primary" />

                        <h2 className="text-lg font-semibold text-white">
                            Learning Tools
                        </h2>
                    </div>

                    <p className="text-sm text-gray-600 mb-5">
                        Choose how you want to learn today.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {activeTools.map((tool) => (
                            <LearningToolCard
                                key={tool.title}
                                tool={tool}
                            />
                        ))}
                    </div>
                </section>

                {/* Recent Activity */}
                <section className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 h-full min-h-[465px] flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary" />

                                <h2 className="text-lg font-semibold text-white">
                                    Recent Activity
                                </h2>
                            </div>

                            <p className="text-sm text-gray-600 mt-1">
                                Keep track of what you've been learning.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="text-xs font-medium text-gray-500 hover:text-primary transition-colors whitespace-nowrap"
                        >
                            View all
                        </button>
                    </div>

                    <div className="mt-7 flex-1 flex flex-col justify-between">
                        {recentActivities.map((activity, index) => (
                            <RecentActivityItem
                                key={activity.id}
                                activity={activity}
                                isLast={
                                    index === recentActivities.length - 1
                                }
                            />
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#292D36]">
                        <p className="text-xs text-gray-600">
                            Your latest learning actions will appear here.
                        </p>
                    </div>
                </section>
            </div>

            {/* More Learning Tools */}
            <section className="mt-8">
                <div className="mb-5">
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />

                        <h2 className="text-lg font-semibold text-white">
                            More Learning Tools
                        </h2>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                        More powerful learning features are being added.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {upcomingTools.map((tool) => {
    const Icon = tool.icon;

    if (tool.available) {
        return (
            <Link
                key={tool.title}
                to={tool.path}
                className="group bg-[#181B21] border border-[#292D36] rounded-2xl p-5 min-h-[175px] hover:bg-[#20242B] hover:border-[#3A404A] transition-all duration-300"
            >
                <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-base font-semibold text-gray-200 mt-5">
                    {tool.title}
                </h3>

                <p className="text-sm text-gray-600 mt-2 leading-6">
                    {tool.description}
                </p>
            </Link>
        );
    }

    return (
        <div
            key={tool.title}
            className="group bg-[#181B21] border border-[#292D36] rounded-2xl p-5 min-h-[175px] opacity-80 hover:opacity-100 hover:border-[#343A45] transition-all duration-300"
        >
            <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-xl bg-[#20242B] border border-[#30353E] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                </div>

                <span className="text-[10px] font-medium tracking-wide text-gray-600 border border-[#30353E] rounded-full px-2.5 py-1">
                    COMING SOON
                </span>
            </div>

            <h3 className="text-base font-semibold text-gray-300 mt-5">
                {tool.title}
            </h3>

            <p className="text-sm text-gray-600 mt-2 leading-6">
                {tool.description}
            </p>
        </div>
    );
})}
                </div>
            </section>

            {/* Personal AI Assistant */}
            <section className="mt-8 mb-2 bg-[#181B21] border border-[#292D36] rounded-2xl px-5 py-4">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white">
                            Your Personal AI Assistant
                        </h3>

                        <p className="text-sm text-gray-600 mt-1">
                            Ask questions, understand concepts, or get help
                            planning your next study session.
                        </p>
                    </div>

                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs font-medium text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        Available
                    </div>
                </div>
            </section>
        </div>
    );
}