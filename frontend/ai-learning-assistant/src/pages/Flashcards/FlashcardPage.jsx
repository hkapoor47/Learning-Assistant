import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    RotateCcw,
    Check,
    X,
    BookOpen,
} from "lucide-react";

const cards = [
    {
        question: "What is Machine Learning?",
        answer: "Machine Learning is a branch of AI that enables computers to learn patterns from data and make predictions or decisions without being explicitly programmed for every task.",
    },
    {
        question: "What is supervised learning?",
        answer: "Supervised learning is a machine learning approach where a model learns from labeled training data to make predictions on new, unseen data.",
    },
    {
        question: "What is an algorithm?",
        answer: "An algorithm is a step-by-step procedure used to solve a problem or perform a specific task.",
    },
    {
        question: "What is overfitting?",
        answer: "Overfitting occurs when a model learns the training data too closely, including its noise, and performs poorly on new data.",
    },
    {
        question: "What is a neural network?",
        answer: "A neural network is a computing model inspired by the human brain, consisting of interconnected nodes that process information and learn patterns from data.",
    },
];

export default function FlashcardPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
        }
    };

    const previousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsFlipped(false);
        }
    };

    const resetCard = () => {
        setIsFlipped(false);
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="p-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <div>
                        <p className="text-primary text-sm font-semibold mb-1">
                            STUDY SESSION
                        </p>

                        <h1 className="text-2xl font-bold text-white">
                            Machine Learning
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>
                        Card {currentIndex + 1} of {cards.length}
                    </span>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                        Session Progress
                    </span>

                    <span className="text-xs font-medium text-gray-300">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="h-2 bg-[#15181E] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Flashcard */}
            <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="min-h-[400px] bg-[#20242B] border border-[#30353E] rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#292E36] transition-all duration-300"
            >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-8">
                    <BookOpen className="w-7 h-7 text-primary" />
                </div>

                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-5">
                    {isFlipped ? "Answer" : "Question"}
                </p>

                <h2 className="text-2xl md:text-3xl font-semibold text-white leading-relaxed max-w-2xl">
                    {isFlipped
                        ? currentCard.answer
                        : currentCard.question}
                </h2>

                <p className="text-sm text-gray-600 mt-10">
                    Click the card to {isFlipped ? "see the question" : "reveal the answer"}
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">

                <button
                    type="button"
                    onClick={resetCard}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </button>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                        Need Review
                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white transition-colors"
                    >
                        <Check className="w-4 h-4" />
                        I Know This
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#30353E]">

                <button
                    type="button"
                    onClick={previousCard}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-[#292E36] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                <button
                    type="button"
                    onClick={nextCard}
                    disabled={currentIndex === cards.length - 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ArrowRight className="w-4 h-4" />
                </button>

            </div>
        </div>
    );
}