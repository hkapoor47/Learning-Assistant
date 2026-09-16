import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    BookOpen,
    Check,
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    Sparkles,
} from "lucide-react";

const difficultyOptions = ["Easy", "Medium", "Hard", "Mixed"];
const cardCountOptions = [5, 10, 15];

const customFlashcards = [
    {
        question: "What is the main purpose of this topic?",
        answer:
            "The main purpose can be understood by identifying its core concepts, applications, and the problems it is designed to solve.",
    },
    {
        question: "What are the key concepts you should understand first?",
        answer:
            "Start with the fundamental definitions, important concepts, terminology, and relationships between the major ideas.",
    },
    {
        question: "How can this topic be applied in a practical situation?",
        answer:
            "It can be applied by using its concepts to solve a specific problem while considering the requirements, constraints, and expected outcome.",
    },
    {
        question: "How can you test whether you really understand this topic?",
        answer:
            "Explain the concept in your own words, solve practice problems, work through examples, and apply the idea to a new situation.",
    },
    {
        question: "What should you do when you find a difficult concept?",
        answer:
            "Break the concept into smaller parts, review prerequisite knowledge, study examples, and then try applying the concept yourself.",
    },
    {
        question: "Why is practice important when learning a new topic?",
        answer:
            "Practice turns passive knowledge into active understanding by requiring you to recall information and apply it to problems.",
    },
    {
        question: "How can you identify your weak areas in a topic?",
        answer:
            "Use practice questions, active recall, and problem-solving to identify concepts where your understanding is incomplete.",
    },
    {
        question: "What should you consider when comparing two approaches?",
        answer:
            "Consider correctness, requirements, constraints, performance, complexity, practical usefulness, and maintainability.",
    },
    {
        question: "How can you revise this topic effectively before an exam?",
        answer:
            "Use active recall, practice questions, concise notes, spaced revision, and application-based problems.",
    },
    {
        question: "What is an effective way to approach a problem from this topic?",
        answer:
            "First understand the requirements and constraints, identify the relevant concepts, then develop and test an appropriate solution.",
    },
    {
        question: "Why are examples useful when studying a topic?",
        answer:
            "Examples connect abstract concepts with practical situations and make it easier to understand when and how an idea should be applied.",
    },
    {
        question: "What is active recall?",
        answer:
            "Active recall is the process of trying to retrieve information from memory without looking at the answer first.",
    },
    {
        question: "How can you improve your understanding of an advanced concept?",
        answer:
            "Review prerequisite concepts, understand the underlying reasoning, study examples, and apply the concept to new problems.",
    },
    {
        question: "How can you retain information for a longer period?",
        answer:
            "Combine active recall with repeated practice and spaced revision so that information is retrieved multiple times over time.",
    },
    {
        question: "What is a good habit when learning a difficult topic?",
        answer:
            "Regularly connect theory with examples and practice, and test yourself instead of relying only on repeated reading.",
    },
];

function FlashcardPage() {
    const navigate = useNavigate();

    // Setup
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Medium");
    const [cardCount, setCardCount] = useState(5);

    // Study
    const [isGenerated, setIsGenerated] = useState(false);
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [completedCards, setCompletedCards] = useState([]);

    const generatedCards = useMemo(() => {
        const finalTopic = topic.trim();

        if (!finalTopic) {
            return [];
        }

        return customFlashcards
            .slice(0, cardCount)
            .map((card, index) => ({
                id: index + 1,
                question: card.question.replace(
                    "this topic",
                    finalTopic
                ),
                answer: card.answer,
            }));
    }, [topic, cardCount]);

    const generateFlashcards = () => {
        if (!topic.trim()) {
            return;
        }

        setCurrentCard(0);
        setIsFlipped(false);
        setCompletedCards([]);
        setIsGenerated(true);
    };

    const generateAgain = () => {
        setIsGenerated(false);
        setCurrentCard(0);
        setIsFlipped(false);
        setCompletedCards([]);
    };

    const nextCard = () => {
        if (currentCard < generatedCards.length - 1) {
            setCurrentCard((prev) => prev + 1);
            setIsFlipped(false);
        }
    };

    const previousCard = () => {
        if (currentCard > 0) {
            setCurrentCard((prev) => prev - 1);
            setIsFlipped(false);
        }
    };

    const markCompleted = () => {
        const cardId = generatedCards[currentCard]?.id;

        if (!cardId) return;

        setCompletedCards((prev) =>
            prev.includes(cardId) ? prev : [...prev, cardId]
        );
    };

    // ---------------------------------------------------------
    // SETUP SCREEN
    // ---------------------------------------------------------

    if (!isGenerated) {
        return (
            <div className="min-h-full pb-10">
                {/* Back */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-primary mb-2">
                        <Sparkles className="w-4 h-4" />

                        <span className="text-xs font-semibold tracking-[0.18em] uppercase">
                            Active Recall
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Generate Flashcards
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Enter any topic and create a personalized
                        flashcard set.
                    </p>
                </div>

                {/* Compact Generator */}
                <div className="max-w-4xl bg-[#181B21] border border-[#292D36] rounded-2xl p-5 md:p-6">
                    {/* Topic */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                            Enter your topic
                        </label>

                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    topic.trim()
                                ) {
                                    generateFlashcards();
                                }
                            }}
                            placeholder="e.g. Operating Systems, Java OOP, Computer Networks..."
                            className="w-full h-11 px-4 rounded-xl bg-[#0F1115] border border-[#292D36] text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/60 transition-all"
                        />
                    </div>

                    {/* Difficulty + Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        {/* Difficulty */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Difficulty
                            </label>

                            <div className="grid grid-cols-4 gap-2">
                                {difficultyOptions.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() =>
                                            setDifficulty(level)
                                        }
                                        className={`h-10 rounded-lg border text-xs font-medium transition-all ${
                                            difficulty === level
                                                ? "bg-primary/10 border-primary text-white"
                                                : "bg-[#20242B] border-[#292D36] text-gray-500 hover:bg-[#292F37] hover:text-gray-300"
                                        }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Number */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Number of cards
                            </label>

                            <div className="grid grid-cols-3 gap-2">
                                {cardCountOptions.map((count) => (
                                    <button
                                        key={count}
                                        onClick={() =>
                                            setCardCount(count)
                                        }
                                        className={`h-10 rounded-lg border text-xs font-medium transition-all ${
                                            cardCount === count
                                                ? "bg-primary/10 border-primary text-white"
                                                : "bg-[#20242B] border-[#292D36] text-gray-500 hover:bg-[#292F37] hover:text-gray-300"
                                        }`}
                                    >
                                        {count}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Generate */}
                    <button
                        onClick={generateFlashcards}
                        disabled={!topic.trim()}
                        className="w-full h-11 mt-5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                        <Sparkles className="w-4 h-4" />
                        Generate Flashcards
                    </button>
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------
    // STUDY SCREEN
    // ---------------------------------------------------------

    const card = generatedCards[currentCard];

    const progress =
        ((currentCard + 1) / generatedCards.length) * 100;

    return (
        <div className="min-h-full pb-10">
            {/* Top */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <button
                    onClick={generateAgain}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Setup
                </button>

                <button
                    onClick={generateAgain}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181B21] border border-[#292D36] text-xs text-gray-400 hover:bg-[#20242B] hover:text-white transition-all"
                >
                    <RotateCcw className="w-4 h-4" />
                    Generate Again
                </button>
            </div>

            {/* Header */}
            <div className="mb-5">
                <div className="flex items-center gap-2 text-primary mb-2">
                    <BookOpen className="w-4 h-4" />

                    <span className="text-xs font-semibold tracking-[0.15em] uppercase">
                        {difficulty} • {generatedCards.length} Cards
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {topic.trim()}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Review each card and test your recall.
                </p>
            </div>

            {/* Progress */}
            <div className="mb-5">
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>
                        Card {currentCard + 1} of{" "}
                        {generatedCards.length}
                    </span>

                    <span>
                        {completedCards.length} completed
                    </span>
                </div>

                <div className="h-1.5 rounded-full bg-[#20242B] overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Flashcard */}
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => setIsFlipped((prev) => !prev)}
                    className="w-full text-left"
                >
                    <div className="min-h-[360px] md:min-h-[400px] bg-[#181B21] border border-[#292D36] rounded-2xl p-7 md:p-9 flex flex-col hover:bg-[#1D2128] hover:border-[#3A404A] transition-all">
                        {/* Card top */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary">
                                {isFlipped
                                    ? "Answer"
                                    : "Question"}
                            </span>

                            <span className="text-xs text-gray-600">
                                Click to flip
                            </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex items-center justify-center py-8">
                            <div className="max-w-2xl text-center">
                                {!isFlipped ? (
                                    <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                                        {card.question}
                                    </h2>
                                ) : (
                                    <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                        {card.answer}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                            <RotateCcw className="w-4 h-4" />
                            Click to{" "}
                            {isFlipped
                                ? "see question"
                                : "reveal answer"}
                        </div>
                    </div>
                </button>

                {/* Complete */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={markCompleted}
                        disabled={completedCards.includes(card.id)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            completedCards.includes(card.id)
                                ? "bg-green-500/10 border-green-500/20 text-green-400"
                                : "bg-[#181B21] border-[#292D36] text-gray-400 hover:bg-[#20242B] hover:text-white"
                        }`}
                    >
                        <Check className="w-4 h-4" />

                        {completedCards.includes(card.id)
                            ? "Completed"
                            : "Mark as Completed"}
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={previousCard}
                        disabled={currentCard === 0}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181B21] border border-[#292D36] text-sm text-gray-400 hover:bg-[#20242B] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <span className="text-xs text-gray-600">
                        {currentCard + 1} /{" "}
                        {generatedCards.length}
                    </span>

                    <button
                        onClick={nextCard}
                        disabled={
                            currentCard ===
                            generatedCards.length - 1
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Card numbers */}
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {generatedCards.map((item, index) => {
                        const isCurrent =
                            currentCard === index;

                        const isCompleted =
                            completedCards.includes(item.id);

                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setCurrentCard(index);
                                    setIsFlipped(false);
                                }}
                                className={`w-9 h-9 rounded-lg border text-xs font-semibold transition-all ${
                                    isCurrent
                                        ? "bg-primary border-primary text-white"
                                        : isCompleted
                                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                                        : "bg-[#181B21] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                                }`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>

                {/* Finished */}
                {completedCards.length ===
                    generatedCards.length && (
                    <div className="mt-5 p-5 rounded-2xl bg-green-500/5 border border-green-500/20 text-center">
                        <Check className="w-6 h-6 text-green-400 mx-auto mb-2" />

                        <h3 className="text-sm font-semibold text-white">
                            All cards completed
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                            Great job! You completed this study
                            session.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FlashcardPage;