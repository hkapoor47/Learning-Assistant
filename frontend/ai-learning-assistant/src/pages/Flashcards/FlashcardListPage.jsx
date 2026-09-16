import { useMemo, useState } from "react";
import {
    ArrowRight,
    BookOpen,
    Brain,
    Layers3,
    Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const flashcardSets = [
    {
        id: 1,
        title: "Machine Learning",
        description: "Important concepts and algorithms",
        cards: 20,
        progress: 75,
    },
    {
        id: 2,
        title: "Python Fundamentals",
        description: "Python basics, syntax and programming",
        cards: 15,
        progress: 60,
    },
    {
        id: 3,
        title: "Database Management",
        description: "SQL, databases and normalization",
        cards: 10,
        progress: 40,
    },
    {
        id: 4,
        title: "Artificial Intelligence",
        description: "AI concepts and intelligent systems",
        cards: 25,
        progress: 25,
    },
];

export default function FlashcardListPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const filteredSets = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return flashcardSets;
        }

        return flashcardSets.filter((set) => {
            return (
                set.title.toLowerCase().includes(query) ||
                set.description.toLowerCase().includes(query)
            );
        });
    }, [search]);

    const handleGenerate = () => {
        navigate("/flashcards/1");
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <p className="text-primary text-sm font-semibold mb-2">
                        STUDY SMARTER
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Flashcards
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Review your AI-generated flashcards and strengthen your
                        memory.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleGenerate}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/10"
                >
                    <Brain className="w-4 h-4" />
                    Generate Flashcards
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search flashcard sets..."
                    className="w-full bg-[#181B21] border border-[#292D36] text-gray-200 placeholder:text-gray-600 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />
            </div>

            {/* Count */}
            <div className="flex items-center gap-2 mb-5">
                <Layers3 className="w-5 h-5 text-primary" />

                <p className="text-sm font-medium text-gray-400">
                    {filteredSets.length} Flashcard{" "}
                    {filteredSets.length === 1 ? "Set" : "Sets"}
                </p>
            </div>

            {/* Empty state */}
            {filteredSets.length === 0 && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <BookOpen className="w-10 h-10 text-gray-600 mx-auto" />

                    <h3 className="text-lg font-semibold text-white mt-4">
                        No flashcard sets found
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        Try a different search term.
                    </p>
                </div>
            )}

            {/* Flashcard sets */}
            {filteredSets.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredSets.map((set) => (
                        <div
                            key={set.id}
                            className="group bg-[#20242B] border border-[#30353E] rounded-2xl p-6 hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="flex items-start justify-between">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-primary" />
                                </div>

                                <span className="text-xs font-medium text-gray-500">
                                    {set.cards} cards
                                </span>
                            </div>

                            {/* Content */}
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-gray-100">
                                    {set.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2">
                                    {set.description}
                                </p>
                            </div>

                            {/* Progress */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-500">
                                        Progress
                                    </span>

                                    <span className="text-xs font-medium text-gray-300">
                                        {set.progress}%
                                    </span>
                                </div>

                                <div className="h-2 bg-[#15181E] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-300"
                                        style={{
                                            width: `${set.progress}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t border-[#30353E]">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/flashcards/${set.id}`)
                                    }
                                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-purple-300 transition-colors"
                                >
                                    Study Cards
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}