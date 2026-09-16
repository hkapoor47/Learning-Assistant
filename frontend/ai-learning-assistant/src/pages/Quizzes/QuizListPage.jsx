import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Brain,
    Clock,
    HelpCircle,
    ArrowRight,
    X,
    Sparkles,
} from "lucide-react";

const quizzes = [
    {
        id: 1,
        title: "Machine Learning Quiz",
        description:
            "Test your knowledge of machine learning concepts, algorithms, and practical applications.",
        questions: 10,
        duration: "15 min",
        difficulty: "Hard",
    },
    {
        id: 2,
        title: "Machine Learning Quiz",
        description:
            "Practice important machine learning concepts and fundamental algorithms.",
        questions: 5,
        duration: "10 min",
        difficulty: "Medium",
    },
    {
        id: 3,
        title: "Python Fundamentals Quiz",
        description:
            "Test your understanding of Python syntax, functions, data types, and programming concepts.",
        questions: 5,
        duration: "10 min",
        difficulty: "Easy",
    },
    {
        id: 4,
        title: "Database Management Quiz",
        description:
            "Test your knowledge of SQL, databases, normalization, and database concepts.",
        questions: 5,
        duration: "10 min",
        difficulty: "Hard",
    },
    {
        id: 5,
        title: "Artificial Intelligence Quiz",
        description:
            "Test your understanding of AI concepts, techniques, and real-world applications.",
        questions: 5,
        duration: "10 min",
        difficulty: "Mixed",
    },
];

const difficultyStyles = {
    Easy: "bg-green-500/10 text-green-400 border-green-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    Mixed: "bg-primary/10 text-primary border-primary/20",
};

function QuizListPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");

    const [showGenerator, setShowGenerator] = useState(false);
    const [topic, setTopic] = useState("");
    const [quizDifficulty, setQuizDifficulty] = useState("Medium");
    const [questionCount, setQuestionCount] = useState(5);

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

    const generateQuiz = () => {
        const trimmedTopic = topic.trim();

        if (!trimmedTopic) {
            return;
        }

        const generatedQuiz = {
            generated: true,
            topic: trimmedTopic,
            difficulty: quizDifficulty,
            questionCount,
        };

        // Save it so the quiz can still load if the page is refreshed.
        sessionStorage.setItem(
            "generatedQuiz",
            JSON.stringify(generatedQuiz)
        );

        navigate("/quizzes/generated", {
            state: generatedQuiz,
        });
    };

    const closeGenerator = () => {
        setShowGenerator(false);
        setTopic("");
        setQuizDifficulty("Medium");
        setQuestionCount(5);
    };

    return (
        <div className="min-h-full">
            {/* Header */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between mb-8">
                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-2">
                        Test Your Knowledge
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Quizzes
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Test yourself with AI-generated quizzes from your study
                        materials.
                    </p>
                </div>

                <button
                    onClick={() => setShowGenerator(true)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/10"
                >
                    <Brain className="w-5 h-5" />
                    Generate Quiz
                </button>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search quizzes..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#181B21] border border-[#292D36] text-white placeholder:text-gray-600 outline-none focus:border-primary/50 transition-all"
                    />
                </div>

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-[#181B21] border border-[#292D36] text-gray-300 outline-none focus:border-primary/50 cursor-pointer"
                >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Mixed">Mixed</option>
                </select>
            </div>

            {/* Quiz Count */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                    {filteredQuizzes.length}{" "}
                    {filteredQuizzes.length === 1 ? "quiz" : "quizzes"} found
                </p>
            </div>

            {/* Quiz Cards */}
            {filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="group bg-[#181B21] border border-[#292D36] rounded-2xl p-5 hover:bg-[#20242B] hover:border-[#3A404A] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 min-w-0">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                        <Brain className="w-5 h-5 text-primary" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-base font-semibold text-white truncate">
                                            {quiz.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                            {quiz.description}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`text-xs px-2.5 py-1 rounded-lg border shrink-0 ${
                                        difficultyStyles[quiz.difficulty]
                                    }`}
                                >
                                    {quiz.difficulty}
                                </span>
                            </div>

                            {/* Quiz Info */}
                            <div className="flex items-center gap-5 mt-5 text-xs text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <HelpCircle className="w-4 h-4" />
                                    <span>
                                        {quiz.questions} questions
                                    </span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    <span>{quiz.duration}</span>
                                </div>
                            </div>

                            {/* Start */}
                            <button
                                onClick={() =>
                                    navigate(`/quizzes/${quiz.id}`)
                                }
                                className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#20242B] border border-[#292D36] text-gray-300 font-medium hover:bg-[#30353E] hover:text-white transition-all duration-200"
                            >
                                Start Quiz

                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl py-16 text-center">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#20242B] flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-gray-600" />
                    </div>

                    <h3 className="text-lg font-semibold text-white">
                        No quizzes found
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        Try changing your search or difficulty filter.
                    </p>
                </div>
            )}

            {/* Generate Quiz Modal */}
            {showGenerator && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    onClick={closeGenerator}
                >
                    <div
                        className="w-full max-w-lg bg-[#181B21] border border-[#292D36] rounded-2xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#292D36]">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                    </div>

                                    <h2 className="text-xl font-semibold text-white">
                                        Generate Quiz
                                    </h2>
                                </div>

                                <p className="text-sm text-gray-500 mt-2">
                                    Create a quiz on any topic you want.
                                </p>
                            </div>

                            <button
                                onClick={closeGenerator}
                                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#20242B] transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Topic */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Topic
                                </label>

                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) =>
                                        setTopic(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === "Enter" &&
                                            topic.trim()
                                        ) {
                                            generateQuiz();
                                        }
                                    }}
                                    placeholder="e.g. Neural Networks, Java, World History..."
                                    autoFocus
                                    className="w-full h-12 px-4 rounded-xl bg-[#0F1115] border border-[#292D36] text-white placeholder:text-gray-600 outline-none focus:border-primary/60 transition-all"
                                />
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Difficulty
                                </label>

                                <div className="grid grid-cols-4 gap-2">
                                    {["Easy", "Medium", "Hard", "Mixed"].map(
                                        (level) => (
                                            <button
                                                key={level}
                                                onClick={() =>
                                                    setQuizDifficulty(level)
                                                }
                                                className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                                                    quizDifficulty === level
                                                        ? "bg-primary/10 border-primary text-primary"
                                                        : "bg-[#0F1115] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                                                }`}
                                            >
                                                {level}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Number of Questions */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Number of Questions
                                </label>

                                <div className="grid grid-cols-3 gap-3">
                                    {[5, 10, 15].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() =>
                                                setQuestionCount(count)
                                            }
                                            className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                                                questionCount === count
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-[#0F1115] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                                            }`}
                                        >
                                            {count} Questions
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Generate */}
                            <button
                                onClick={generateQuiz}
                                disabled={!topic.trim()}
                                className="w-full h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <Sparkles className="w-5 h-5" />
                                Generate Quiz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizListPage;