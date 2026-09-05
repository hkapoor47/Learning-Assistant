import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const flashcardSets = {
    1: {
        title: "Machine Learning",
        cards: [
            {
                question: "What is Machine Learning?",
                answer:
                    "Machine Learning is a branch of AI that enables computers to learn patterns from data and make predictions or decisions without being explicitly programmed for every task.",
            },
            {
                question: "What is supervised learning?",
                answer:
                    "Supervised learning is a machine learning approach where a model learns from labeled training data to make predictions on new, unseen data.",
            },
            {
                question: "What is an algorithm?",
                answer:
                    "An algorithm is a step-by-step procedure used to solve a problem or perform a specific task.",
            },
            {
                question: "What is overfitting?",
                answer:
                    "Overfitting occurs when a model learns the training data too closely, including its noise, and performs poorly on new data.",
            },
            {
                question: "What is a neural network?",
                answer:
                    "A neural network is a computing model inspired by the human brain, consisting of interconnected nodes that process information and learn patterns from data.",
            },
        ],
    },

    2: {
        title: "Python Fundamentals",
        cards: [
            {
                question: "What is a Python variable?",
                answer:
                    "A variable is a name that refers to a value stored by a Python program.",
            },
            {
                question: "What is a Python list?",
                answer:
                    "A list is an ordered, mutable collection that can store multiple values.",
            },
            {
                question: "What is a function?",
                answer:
                    "A function is a reusable block of code designed to perform a specific task.",
            },
            {
                question: "What is a dictionary?",
                answer:
                    "A dictionary stores data as key-value pairs and provides lookup by key.",
            },
            {
                question: "What does a loop do?",
                answer:
                    "A loop repeatedly executes a block of code while iterating over a sequence or condition.",
            },
        ],
    },

    3: {
        title: "Database Management",
        cards: [
            {
                question: "What is a database?",
                answer:
                    "A database is an organized collection of data that can be stored, managed, and retrieved efficiently.",
            },
            {
                question: "What is SQL?",
                answer:
                    "SQL is a language used to define, query, manipulate, and manage data in relational database systems.",
            },
            {
                question: "What is normalization?",
                answer:
                    "Normalization organizes relational data to reduce unnecessary duplication and improve data consistency.",
            },
            {
                question: "What is a primary key?",
                answer:
                    "A primary key uniquely identifies each row in a database table.",
            },
            {
                question: "What is a foreign key?",
                answer:
                    "A foreign key is a column or set of columns that references a key in another table to establish a relationship.",
            },
        ],
    },

    4: {
        title: "Artificial Intelligence",
        cards: [
            {
                question: "What is Artificial Intelligence?",
                answer:
                    "Artificial Intelligence is the field of computing concerned with creating systems that perform tasks associated with human intelligence.",
            },
            {
                question: "What is an intelligent agent?",
                answer:
                    "An intelligent agent perceives its environment and takes actions to achieve goals.",
            },
            {
                question: "What is deep learning?",
                answer:
                    "Deep learning is a machine learning approach that uses neural networks with multiple layers to learn complex patterns.",
            },
            {
                question: "What is natural language processing?",
                answer:
                    "Natural language processing focuses on enabling computers to process and work with human language.",
            },
            {
                question: "What is computer vision?",
                answer:
                    "Computer vision enables computers to interpret and analyze information contained in images and video.",
            },
        ],
    },
};

export default function FlashcardPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const currentSet = flashcardSets[id] ?? flashcardSets[1];
    const cards = currentSet.cards;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = cards[currentIndex];

    const progress = ((currentIndex + 1) / cards.length) * 100;

    const nextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setIsFlipped(false);
        }
    };

    const previousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setIsFlipped(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <button
                    type="button"
                    onClick={() => navigate("/flashcards")}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Flashcards
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BookOpen className="w-4 h-4 text-primary" />

                    <span>
                        {currentIndex + 1} / {cards.length}
                    </span>
                </div>
            </div>

            {/* Title */}
            <div className="mb-5">
                <p className="text-primary text-xs font-semibold uppercase tracking-wider">
                    Study Session
                </p>

                <h1 className="text-2xl font-bold text-white mt-1">
                    {currentSet.title}
                </h1>
            </div>

            {/* Progress */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">
                        Progress
                    </span>

                    <span className="text-xs text-gray-400">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="h-1.5 bg-[#181B21] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Flashcard */}
            <button
                type="button"
                onClick={() => setIsFlipped((prev) => !prev)}
                className="w-full min-h-[300px] bg-[#20242B] border border-[#30353E] rounded-2xl px-8 py-9 flex flex-col items-center justify-center text-center hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300"
            >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                </div>

                <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">
                    {isFlipped ? "Answer" : "Question"}
                </p>

                <div className="max-w-2xl mt-5">
                    <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                        {isFlipped
                            ? currentCard.answer
                            : currentCard.question}
                    </p>
                </div>

                <p className="text-xs text-gray-600 mt-7">
                    Click to {isFlipped ? "see the question" : "reveal the answer"}
                </p>
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-5">
                <button
                    type="button"
                    onClick={previousCard}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:bg-[#292E36] hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                <button
                    type="button"
                    onClick={nextCard}
                    disabled={currentIndex === cards.length - 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            {/* Helper */}
            <p className="text-center text-xs text-gray-700 mt-5">
                Tap the card to reveal the answer
            </p>
        </div>
    );
}