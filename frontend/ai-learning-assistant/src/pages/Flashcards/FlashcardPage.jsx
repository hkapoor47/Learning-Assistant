import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    Brain,
    Clock,
    FileText,
    MoreVertical,
    Plus,
    Search,
    Sparkles,
    X,
} from "lucide-react";

const flashcards = [
    {
        id: 1,
        title: "Machine Learning Flashcards",
        description:
            "Core concepts, algorithms, and important machine learning fundamentals.",
        cards: 10,
        difficulty: "Hard",
        topic: "Machine Learning",
        lastStudied: "Today",
    },
    {
        id: 2,
        title: "Python Fundamentals Flashcards",
        description:
            "Python syntax, functions, data structures, and programming concepts.",
        cards: 10,
        difficulty: "Easy",
        topic: "Python",
        lastStudied: "Yesterday",
    },
    {
        id: 3,
        title: "Database Management Flashcards",
        description:
            "SQL, normalization, transactions, keys, and database concepts.",
        cards: 10,
        difficulty: "Medium",
        topic: "Database Management",
        lastStudied: "2 days ago",
    },
    {
        id: 4,
        title: "Artificial Intelligence Flashcards",
        description:
            "AI concepts, techniques, applications, and important terminology.",
        cards: 10,
        difficulty: "Hard",
        topic: "Artificial Intelligence",
        lastStudied: "3 days ago",
    },
];

const difficultyStyles = {
    Easy: "bg-green-500/10 text-green-400 border-green-500/20",
    Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Hard: "bg-red-500/10 text-red-400 border-red-500/20",
    Mixed: "bg-primary/10 text-primary border-primary/20",
};

const difficulties = ["All", "Easy", "Medium", "Hard", "Mixed"];

const difficultyOptions = ["Easy", "Medium", "Hard", "Mixed"];

const cardCountOptions = [5, 10, 15];

function FlashcardListPage() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] =
        useState("All");

    // Generate modal
    const [showGenerator, setShowGenerator] = useState(false);
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [cardCount, setCardCount] = useState(5);

    const filteredFlashcards = useMemo(() => {
        return flashcards.filter((flashcard) => {
            const matchesSearch =
                flashcard.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                flashcard.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                flashcard.topic
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesDifficulty =
                selectedDifficulty === "All" ||
                flashcard.difficulty === selectedDifficulty;

            return matchesSearch && matchesDifficulty;
        });
    }, [searchQuery, selectedDifficulty]);

    const openGenerator = () => {
        setShowGenerator(true);
    };

    const closeGenerator = () => {
        setShowGenerator(false);
    };

    const generateFlashcards = () => {
        const trimmedTopic = topic.trim();

        if (!trimmedTopic) {
            return;
        }

        // Store generated setup so the study page can use it.
        sessionStorage.setItem(
            "generatedFlashcard",
            JSON.stringify({
                generated: true,
                topic: trimmedTopic,
                difficulty,
                cardCount,
            })
        );

        setShowGenerator(false);

        navigate("/flashcards/generated");
    };

    return (
        <div className="min-h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-7">
                <div>
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <Sparkles className="w-4 h-4" />

                        <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                            Active Recall
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Flashcards
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Review your study material with active recall.
                    </p>
                </div>

                <button
                    onClick={openGenerator}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                >
                    <Sparkles className="w-4 h-4" />
                    Generate Flashcards
                </button>
            </div>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                            setSearchQuery(e.target.value)
                        }
                        placeholder="Search flashcards..."
                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#181B21] border border-[#292D36] text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/50 transition-all"
                    />
                </div>

                {/* Difficulty */}
                <div className="flex gap-2 overflow-x-auto">
                    {difficulties.map((level) => (
                        <button
                            key={level}
                            onClick={() =>
                                setSelectedDifficulty(level)
                            }
                            className={`px-4 h-11 rounded-xl border text-xs font-medium whitespace-nowrap transition-all ${
                                selectedDifficulty === level
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-[#181B21] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Flashcard List */}
            {filteredFlashcards.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredFlashcards.map((flashcard) => (
                        <div
                            key={flashcard.id}
                            className="group bg-[#181B21] border border-[#292D36] rounded-2xl p-5 hover:bg-[#20242B] hover:border-[#3A404A] transition-all duration-300"
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-base font-semibold text-white truncate">
                                            {flashcard.title}
                                        </h3>

                                        <p className="text-xs text-gray-600 mt-1">
                                            {flashcard.topic}
                                        </p>
                                    </div>
                                </div>

                                <button className="p-2 rounded-lg text-gray-600 hover:bg-[#292D36] hover:text-gray-300 transition-all">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-500 leading-relaxed mt-4">
                                {flashcard.description}
                            </p>

                            {/* Info */}
                            <div className="flex flex-wrap items-center gap-3 mt-5">
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                    <BookOpen className="w-3.5 h-3.5" />
                                    {flashcard.cards} cards
                                </span>

                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    {flashcard.lastStudied}
                                </span>

                                <span
                                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-medium ${
                                        difficultyStyles[
                                            flashcard.difficulty
                                        ]
                                    }`}
                                >
                                    {flashcard.difficulty}
                                </span>
                            </div>

                            {/* Open */}
                            <button
                                onClick={() =>
                                    navigate(
                                        `/flashcards/${flashcard.id}`
                                    )
                                }
                                className="w-full mt-5 flex items-center justify-center gap-2 h-10 rounded-xl bg-[#20242B] border border-[#292D36] text-sm text-gray-400 hover:bg-[#292F37] hover:text-white hover:border-[#3A404A] transition-all"
                            >
                                Study Flashcards
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl py-16 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#20242B] flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-5 h-5 text-gray-500" />
                    </div>

                    <h3 className="text-base font-semibold text-white">
                        No flashcards found
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                        Try another search or difficulty filter.
                    </p>
                </div>
            )}

            {/* ------------------------------------------------ */}
            {/* Generate Flashcards Modal */}
            {/* ------------------------------------------------ */}

            {showGenerator && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) {
                            closeGenerator();
                        }
                    }}
                >
                    <div className="w-full max-w-[550px] bg-[#181B21] border border-[#292D36] rounded-2xl shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between p-5 border-b border-[#292D36]">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        Generate Flashcards
                                    </h2>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Create flashcards on any topic you want.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={closeGenerator}
                                className="p-1.5 rounded-lg text-gray-600 hover:bg-[#292D36] hover:text-gray-300 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5">
                            {/* Topic */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Topic
                                </label>

                                <input
                                    autoFocus
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
                                            generateFlashcards();
                                        }
                                    }}
                                    placeholder="e.g. Neural Networks, Java, World History..."
                                    className="w-full h-12 px-4 rounded-xl bg-[#0F1115] border border-primary/60 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary transition-all"
                                />
                            </div>

                            {/* Difficulty */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Difficulty
                                </label>

                                <div className="grid grid-cols-4 gap-2">
                                    {difficultyOptions.map((level) => (
                                        <button
                                            key={level}
                                            onClick={() =>
                                                setDifficulty(level)
                                            }
                                            className={`h-11 rounded-xl border text-xs font-medium transition-all ${
                                                difficulty === level
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-[#0F1115] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                                            }`}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Number of Cards */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Number of Cards
                                </label>

                                <div className="grid grid-cols-3 gap-2">
                                    {cardCountOptions.map((count) => (
                                        <button
                                            key={count}
                                            onClick={() =>
                                                setCardCount(count)
                                            }
                                            className={`h-11 rounded-xl border text-xs font-medium transition-all ${
                                                cardCount === count
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "bg-[#0F1115] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                                            }`}
                                        >
                                            {count} Cards
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={generateFlashcards}
                                disabled={!topic.trim()}
                                className="w-full h-12 mt-6 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                <Sparkles className="w-4 h-4" />
                                Generate Flashcards
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FlashcardListPage;