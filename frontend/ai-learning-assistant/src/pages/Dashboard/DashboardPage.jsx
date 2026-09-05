import {
    ArrowRight,
    BookOpen,
    Brain,
    Code2,
    FileText,
    PlaySquare,
    Sparkles,
    Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const modules = [
    {
        title: "PDF Study Material",
        description:
            "Upload PDFs, read them, chat with your material, generate AI actions, flashcards, and quizzes.",
        icon: FileText,
        action: "Open Documents",
        path: "/documents",
        available: true,
    },
    {
        title: "YouTube Learning",
        description:
            "Turn educational YouTube videos into structured study material and downloadable study PDFs.",
        icon: PlaySquare,
        action: "Open YouTube Learning",
        path: "/youtube",
        available: true,
    },
    {
        title: "Flashcards",
        description:
            "Review concepts using active recall and practice remembering important information.",
        icon: BookOpen,
        action: "Study Flashcards",
        path: "/flashcards",
        available: true,
    },
    {
        title: "Quizzes",
        description:
            "Test your understanding with quizzes generated from your learning material.",
        icon: Brain,
        action: "Practice Quizzes",
        path: "/quizzes",
        available: true,
    },
    {
        title: "Code Reviewer",
        description:
            "Review code, understand bugs, improve implementations, and analyze complexity.",
        icon: Code2,
        action: "Coming Soon",
        path: "#",
        available: false,
    },
    {
        title: "Resume Analyzer",
        description:
            "Analyze your resume, identify improvements, and compare it with job requirements.",
        icon: Target,
        action: "Coming Soon",
        path: "#",
        available: false,
    },
    {
        title: "DSA Practice",
        description:
            "Practice data structures and algorithms with problems, explanations, and progress tracking.",
        icon: Sparkles,
        action: "Coming Soon",
        path: "#",
        available: false,
    },
];

function ModuleCard({ module }) {
    const Icon = module.icon;

    const content = (
        <>
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />

            <div className="relative">
                <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                    </div>

                    {!module.available && (
                        <span className="text-xs font-medium text-gray-500 bg-[#181B21] border border-[#30353E] rounded-full px-3 py-1">
                            Coming Soon
                        </span>
                    )}
                </div>

                <h2 className="text-xl font-semibold text-white mt-6">
                    {module.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2 leading-6 min-h-[72px]">
                    {module.description}
                </p>

                <div className="mt-6 pt-4 border-t border-[#30353E]">
                    <div
                        className={`flex items-center gap-2 text-sm font-medium ${
                            module.available
                                ? "text-primary group-hover:text-purple-300"
                                : "text-gray-600"
                        } transition-colors`}
                    >
                        {module.action}

                        {module.available && (
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                    </div>
                </div>
            </div>
        </>
    );

    if (!module.available) {
        return (
            <div className="group relative overflow-hidden bg-[#20242B] border border-[#30353E] rounded-2xl p-6 opacity-75">
                {content}
            </div>
        );
    }

    return (
        <Link
            to={module.path}
            className="group relative block overflow-hidden bg-[#20242B] border border-[#30353E] rounded-2xl p-6 hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300"
        >
            {content}
        </Link>
    );
}

export default function DashboardPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-10">
                <p className="text-primary text-sm font-semibold mb-2">
                    YOUR LEARNING SPACE
                </p>

                <h1 className="text-3xl font-bold text-white">
                    Learning Hub
                </h1>

                <p className="text-gray-500 mt-2 max-w-2xl">
                    Choose how you want to learn today. Study from PDFs,
                    transform YouTube videos into notes, practice with
                    flashcards and quizzes, and more.
                </p>
            </div>

            <div>
                <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-5 h-5 text-primary" />

                    <h2 className="text-lg font-semibold text-white">
                        Learning Tools
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <ModuleCard
                            key={module.title}
                            module={module}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-10 bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-white">
                            Your Personal AI Assistant
                        </h2>

                        <p className="text-sm text-gray-500 mt-1 leading-6">
                            Use the AI assistant in the bottom-right corner
                            from anywhere inside your learning workspace.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}