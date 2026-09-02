import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Clock,
    Brain,
} from "lucide-react";

const questions = [
    {
        question: "Which of the following best describes Machine Learning?",
        options: [
            "A method of storing data",
            "A technique that allows computers to learn from data",
            "A programming language",
            "A type of computer hardware",
        ],
        answer: 1,
    },
    {
        question: "Which type of learning uses labeled training data?",
        options: [
            "Unsupervised learning",
            "Reinforcement learning",
            "Supervised learning",
            "Deep learning",
        ],
        answer: 2,
    },
    {
        question: "What is overfitting?",
        options: [
            "When a model is too simple",
            "When a model performs well on new data",
            "When a model learns training data too closely",
            "When data is completely missing",
        ],
        answer: 2,
    },
    {
        question: "Which of these is commonly used for classification?",
        options: [
            "Decision Tree",
            "File System",
            "Database",
            "Operating System",
        ],
        answer: 0,
    },
    {
        question: "What is the purpose of a training dataset?",
        options: [
            "To shut down a model",
            "To teach a model patterns from existing data",
            "To store application passwords",
            "To design a user interface",
        ],
        answer: 1,
    },
];

export default function QuizTakePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnswer(null);
        }
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
                            QUIZ SESSION
                        </p>

                        <h1 className="text-2xl font-bold text-white">
                            Machine Learning Quiz
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>12:45</span>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                        Question {currentIndex + 1} of {questions.length}
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

            {/* Question Card */}
            <div className="bg-[#20242B] border border-[#30353E] rounded-3xl p-7 md:p-10">

                <div className="flex items-center gap-3 mb-7">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                            Question {currentIndex + 1}
                        </p>

                        <p className="text-xs text-gray-600 mt-1">
                            Choose the best answer
                        </p>
                    </div>
                </div>

                <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                    {currentQuestion.question}
                </h2>

                {/* Options */}
                <div className="mt-8 space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => setSelectedAnswer(index)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                                    isSelected
                                        ? "bg-primary/10 border-primary/50 text-white"
                                        : "bg-[#181B21] border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:border-[#3A404A] hover:text-gray-200"
                                }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold ${
                                        isSelected
                                            ? "bg-primary text-white"
                                            : "bg-[#292E36] text-gray-500"
                                    }`}
                                >
                                    {String.fromCharCode(65 + index)}
                                </div>

                                <span className="text-sm md:text-base">
                                    {option}
                                </span>

                                {isSelected && (
                                    <CheckCircle className="w-5 h-5 text-primary ml-auto shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">

                <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-[#292E36] hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    {currentIndex === questions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}

                    <ArrowRight className="w-4 h-4" />
                </button>

            </div>

        </div>
    );
}