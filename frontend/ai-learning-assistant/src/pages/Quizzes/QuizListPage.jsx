import {
    Brain,
    Search,
    Clock,
    HelpCircle,
    ArrowRight,
} from "lucide-react";

const quizzes = [
    {
        id: 1,
        title: "Machine Learning Quiz",
        description: "Test your knowledge of machine learning concepts and algorithms.",
        questions: 10,
        time: "15 min",
        difficulty: "Medium",
    },
    {
        id: 2,
        title: "Python Fundamentals Quiz",
        description: "Practice Python basics, syntax, functions and programming concepts.",
        questions: 10,
        time: "15 min",
        difficulty: "Easy",
    },
    {
        id: 3,
        title: "Database Management Quiz",
        description: "Test your understanding of SQL, databases and normalization.",
        questions: 10,
        time: "15 min",
        difficulty: "Medium",
    },
    {
        id: 4,
        title: "Artificial Intelligence Quiz",
        description: "Review important AI concepts, techniques and applications.",
        questions: 10,
        time: "15 min",
        difficulty: "Hard",
    },
];

export default function QuizListPage() {
    return (
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <p className="text-primary text-sm font-semibold mb-2">
                    TEST YOUR KNOWLEDGE
                </p>

                <h1 className="text-3xl font-bold text-white">
                    Quizzes
                </h1>

                <p className="text-gray-500 mt-2">
                    Test yourself with AI-generated quizzes from your study materials.
                </p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                <input
                    type="text"
                    placeholder="Search quizzes..."
                    className="w-full bg-[#181B21] border border-[#292D36] text-gray-200 placeholder:text-gray-600 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />
            </div>

            {/* Quiz Count */}
            <div className="flex items-center gap-2 mb-5">
                <Brain className="w-5 h-5 text-primary" />

                <p className="text-sm font-medium text-gray-400">
                    {quizzes.length} Quizzes
                </p>
            </div>

            {/* Quiz Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {quizzes.map((quiz) => (
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
                                    quiz.difficulty === "Easy"
                                        ? "bg-green-500/10 text-green-400"
                                        : quiz.difficulty === "Medium"
                                        ? "bg-yellow-500/10 text-yellow-400"
                                        : "bg-red-500/10 text-red-400"
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

                            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                                {quiz.description}
                            </p>

                        </div>

                        {/* Quiz Info */}
                        <div className="flex items-center gap-5 mt-6">

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <HelpCircle className="w-4 h-4 text-gray-500" />
                                <span>{quiz.questions} Questions</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>{quiz.time}</span>
                            </div>

                        </div>

                        {/* Start Quiz */}
                        <div className="mt-6 pt-4 border-t border-[#30353E]">

                            <button
                                type="button"
                                onClick={() => {
                                    window.location.href = `/quizzes/${quiz.id}`;
                                }}
                                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-purple-300 transition-colors"
                            >
                                Start Quiz

                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}