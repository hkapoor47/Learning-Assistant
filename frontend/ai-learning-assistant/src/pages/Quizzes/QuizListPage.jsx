import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Brain,
    Search,
    Clock,
    HelpCircle,
    ArrowRight,
    SlidersHorizontal,
} from "lucide-react";

const quizzes = [
    {
        id: 1,
        title: "Machine Learning Quiz",
        description:
            "Test your knowledge of machine learning concepts and algorithms.",
        questions: 10,
        time: "15 min",
        difficulty: "Medium",
        attempts: 2,
        bestScore: 80,
    },
    {
        id: 2,
        title: "Python Fundamentals Quiz",
        description:
            "Practice Python basics, syntax, functions and programming concepts.",
        questions: 10,
        time: "15 min",
        difficulty: "Easy",
        attempts: 4,
        bestScore: 90,
    },
    {
        id: 3,
        title: "Database Management Quiz",
        description:
            "Test your understanding of SQL, databases and normalization.",
        questions: 10,
        time: "15 min",
        difficulty: "Medium",
        attempts: 1,
        bestScore: 70,
    },
    {
        id: 4,
        title: "Artificial Intelligence Quiz",
        description:
            "Review important AI concepts, techniques and applications.",
        questions: 10,
        time: "15 min",
        difficulty: "Hard",
        attempts: 0,
        bestScore: null,
    },
];

const difficultyStyles = {
    Easy: "bg-green-500/10 text-green-400",
    Medium: "bg-yellow-500/10 text-yellow-400",
    Hard: "bg-red-500/10 text-red-400",
};

export default function QuizListPage() {
    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");

    const filteredQuizzes = useMemo(() => {
        return quizzes.filter((quiz) => {
            const matchesSearch =
                quiz.title.toLowerCase().includes(search.toLowerCase()) ||
                quiz.description.toLowerCase().includes(search.toLowerCase());

            const matchesDifficulty =
                difficulty === "All" || quiz.difficulty === difficulty;

            return matchesSearch && matchesDifficulty;
        });
    }, [search, difficulty]);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
                <div>
                    <p className="text-primary text-sm font-semibold mb-2">
                        TEST YOUR KNOWLEDGE
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Quizzes
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Test yourself with AI-generated quizzes from your study
                        materials.
                    </p>
                </div>

                <Link
                    to="/documents"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/10"
                >
                    <Brain className="w-4 h-4" />
                    Generate Quiz
                </Link>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search quizzes..."
                        className="w-full bg-[#181B21] border border-[#292D36] text-gray-200 placeholder:text-gray-600 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                    />
                </div>

                <div className="relative">
                    <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />

                    <select
                        value={difficulty}
                        onChange={(event) => setDifficulty(event.target.value)}
                        className="appearance-none w-full md:w-44 bg-[#181B21] border border-[#292D36] text-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            {/* Quiz Count */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />

                    <p className="text-sm font-medium text-gray-400">
                        {filteredQuizzes.length}{" "}
                        {filteredQuizzes.length === 1 ? "Quiz" : "Quizzes"}
                    </p>
                </div>
            </div>

            {/* Quiz Cards */}
            {filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="group bg-[#20242B] border border-[#30353E] rounded-2xl p-6 hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300"
                        >
                            {/* Icon + Difficulty */}
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                    <Brain className="w-6 h-6 text-primary" />
                                </div>

                                <span
                                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                                        difficultyStyles[quiz.difficulty]
                                    }`}
                                >
                                    {quiz.difficulty}
                                </span>
                            </div>

                            {/* Title */}
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-gray-100">
                                    {quiz.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2 leading-relaxed min-h-[48px]">
                                    {quiz.description}
                                </p>
                            </div>

                            {/* Quiz Info */}
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <HelpCircle className="w-4 h-4 text-gray-500" />
                                    <span>{quiz.questions} Questions</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Clock className="w-4 h-4 text-gray-500" />
                                    <span>{quiz.time}</span>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mt-5">
                                {quiz.bestScore !== null ? (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            Best Score
                                        </span>

                                        <span className="text-sm font-semibold text-gray-200">
                                            {quiz.bestScore}%
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xs text-gray-600">
                                        Not attempted yet
                                    </span>
                                )}
                            </div>

                            {/* Start Quiz */}
                            <div className="mt-6 pt-4 border-t border-[#30353E]">
                                <Link
                                    to={`/quizzes/${quiz.id}`}
                                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-purple-300 transition-colors"
                                >
                                    {quiz.attempts > 0
                                        ? "Retake Quiz"
                                        : "Start Quiz"}

                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#20242B] border border-[#30353E] rounded-2xl py-16 px-6 text-center">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <Search className="w-6 h-6 text-primary" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-200 mt-5">
                        No quizzes found
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        Try changing your search or difficulty filter.
                    </p>
                </div>
            )}
        </div>
    );
}