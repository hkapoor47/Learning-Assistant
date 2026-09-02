import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Flag,
} from "lucide-react";

const quizData = {
    1: {
        title: "Machine Learning Quiz",
        difficulty: "Medium",
        questions: [
            {
                question: "Which of the following is a supervised learning algorithm?",
                options: [
                    "K-Means Clustering",
                    "Linear Regression",
                    "PCA",
                    "Apriori",
                ],
                answer: 1,
                explanation:
                    "Linear Regression is a supervised learning algorithm because it learns from labeled training data.",
            },
            {
                question:
                    "What is the main purpose of a loss function in machine learning?",
                options: [
                    "To increase the dataset size",
                    "To measure model performance",
                    "To visualize the data",
                    "To remove duplicate data",
                ],
                answer: 1,
                explanation:
                    "A loss function measures how far the model's predictions are from the expected results.",
            },
            {
                question: "Which algorithm is commonly used for clustering?",
                options: [
                    "Linear Regression",
                    "Logistic Regression",
                    "K-Means",
                    "Decision Tree",
                ],
                answer: 2,
                explanation:
                    "K-Means is a popular unsupervised learning algorithm used to divide data into clusters.",
            },
            {
                question: "What does overfitting mean?",
                options: [
                    "The model performs poorly on training data",
                    "The model performs well on training data but poorly on unseen data",
                    "The dataset is too small",
                    "The model has no parameters",
                ],
                answer: 1,
                explanation:
                    "Overfitting occurs when a model learns the training data too closely and fails to generalize to unseen data.",
            },
            {
                question:
                    "Which technique is commonly used to reduce overfitting?",
                options: [
                    "Regularization",
                    "Removing all training data",
                    "Increasing model complexity indefinitely",
                    "Ignoring validation data",
                ],
                answer: 0,
                explanation:
                    "Regularization adds constraints or penalties to the model to help prevent it from becoming too complex.",
            },
        ],
    },

    2: {
        title: "Python Fundamentals Quiz",
        difficulty: "Easy",
        questions: [
            {
                question: "Which keyword is used to define a function in Python?",
                options: ["function", "define", "def", "func"],
                answer: 2,
                explanation:
                    "Python uses the `def` keyword to define a function.",
            },
            {
                question: "Which data type stores an ordered collection of items?",
                options: ["List", "Boolean", "Integer", "Float"],
                answer: 0,
                explanation:
                    "A Python list stores an ordered collection of items.",
            },
            {
                question: "Which symbol is used for a comment in Python?",
                options: ["//", "#", "/*", "--"],
                answer: 1,
                explanation:
                    "Python uses the `#` symbol to begin a single-line comment.",
            },
        ],
    },

    3: {
        title: "Database Management Quiz",
        difficulty: "Medium",
        questions: [
            {
                question: "What does SQL stand for?",
                options: [
                    "Structured Query Language",
                    "Simple Query Language",
                    "System Query Logic",
                    "Structured Question Language",
                ],
                answer: 0,
                explanation:
                    "SQL stands for Structured Query Language and is used to interact with relational databases.",
            },
            {
                question: "Which SQL command is used to retrieve data?",
                options: ["GET", "SELECT", "FETCH", "READ"],
                answer: 1,
                explanation:
                    "The SELECT statement is used to retrieve data from database tables.",
            },
            {
                question: "What is the purpose of normalization?",
                options: [
                    "Increase duplicate data",
                    "Reduce data redundancy",
                    "Delete all relationships",
                    "Increase storage requirements",
                ],
                answer: 1,
                explanation:
                    "Database normalization organizes data to reduce unnecessary redundancy and improve data integrity.",
            },
        ],
    },

    4: {
        title: "Artificial Intelligence Quiz",
        difficulty: "Hard",
        questions: [
            {
                question: "Which field is a major area of artificial intelligence?",
                options: [
                    "Machine Learning",
                    "Word Processing",
                    "File Compression",
                    "Screen Rendering",
                ],
                answer: 0,
                explanation:
                    "Machine Learning is one of the major fields within artificial intelligence.",
            },
            {
                question: "What is an intelligent agent?",
                options: [
                    "A database table",
                    "A system that perceives its environment and takes actions",
                    "A programming language",
                    "A computer monitor",
                ],
                answer: 1,
                explanation:
                    "An intelligent agent perceives its environment and takes actions to achieve goals.",
            },
            {
                question:
                    "Which approach allows an AI system to learn through rewards and penalties?",
                options: [
                    "Supervised learning",
                    "Unsupervised learning",
                    "Reinforcement learning",
                    "Database normalization",
                ],
                answer: 2,
                explanation:
                    "Reinforcement learning uses rewards and penalties to guide an agent toward better decisions.",
            },
        ],
    },
};

export default function QuizTakePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const quiz = quizData[id] || quizData[1];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState({});

    const question = quiz.questions[currentQuestion];
    const totalQuestions = quiz.questions.length;

    const selectedAnswer = selectedAnswers[currentQuestion];

    const progress = Math.round(
        ((currentQuestion + 1) / totalQuestions) * 100
    );

    const handleSelectAnswer = (optionIndex) => {
        setSelectedAnswers((previous) => ({
            ...previous,
            [currentQuestion]: optionIndex,
        }));
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((previous) => previous + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((previous) => previous - 1);
        }
    };

    const toggleMarkQuestion = () => {
        setMarkedQuestions((previous) => ({
            ...previous,
            [currentQuestion]: !previous[currentQuestion],
        }));
    };

    const handleSubmit = () => {
        let score = 0;

        quiz.questions.forEach((item, index) => {
            if (selectedAnswers[index] === item.answer) {
                score += 1;
            }
        });

        navigate(`/quizzes/${id}/result`, {
            state: {
                quiz,
                selectedAnswers,
                score,
            },
        });
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
                <Link
                    to="/quizzes"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Quizzes
                </Link>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>15 min</span>
                </div>
            </div>

            {/* Quiz Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-primary text-sm font-semibold mb-2">
                            {quiz.difficulty.toUpperCase()} QUIZ
                        </p>

                        <h1 className="text-3xl font-bold text-white">
                            {quiz.title}
                        </h1>
                    </div>

                    <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/15">
                        <span className="text-lg font-bold text-primary">
                            {currentQuestion + 1}
                        </span>
                    </div>
                </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </span>

                    <span className="text-xs font-medium text-gray-400">
                        {progress}%
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
            <div className="bg-[#20242B] border border-[#30353E] rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                    <div>
                        <p className="text-xs font-medium text-gray-500 mb-3">
                            QUESTION {currentQuestion + 1}
                        </p>

                        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 leading-relaxed">
                            {question.question}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={toggleMarkQuestion}
                        className={`shrink-0 p-2.5 rounded-xl transition-colors ${
                            markedQuestions[currentQuestion]
                                ? "bg-primary/10 text-primary"
                                : "text-gray-500 hover:bg-[#292E36] hover:text-gray-300"
                        }`}
                        title="Mark question"
                    >
                        <Flag className="w-5 h-5" />
                    </button>
                </div>

                {/* Options */}
                <div className="mt-8 space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleSelectAnswer(index)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                                    isSelected
                                        ? "bg-primary/10 border-primary/50 text-white"
                                        : "bg-[#181B21] border-[#30353E] text-gray-300 hover:bg-[#292E36] hover:border-[#3A404A]"
                                }`}
                            >
                                <span
                                    className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center text-sm font-semibold border ${
                                        isSelected
                                            ? "bg-primary text-white border-primary"
                                            : "bg-[#20242B] text-gray-400 border-[#3A404A]"
                                    }`}
                                >
                                    {String.fromCharCode(65 + index)}
                                </span>

                                <span className="flex-1 text-sm md:text-base">
                                    {option}
                                </span>

                                {isSelected && (
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Question Navigator */}
            <div className="mt-6 bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-gray-300">
                        Questions
                    </p>

                    <p className="text-xs text-gray-600">
                        {Object.keys(selectedAnswers).length} answered
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {quiz.questions.map((_, index) => {
                        const isCurrent = currentQuestion === index;
                        const isAnswered =
                            selectedAnswers[index] !== undefined;
                        const isMarked = markedQuestions[index];

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentQuestion(index)}
                                className={`relative w-9 h-9 rounded-lg text-xs font-medium transition-all ${
                                    isCurrent
                                        ? "bg-primary text-white"
                                        : isAnswered
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "bg-[#20242B] text-gray-500 border border-[#30353E] hover:bg-[#292E36] hover:text-gray-300"
                                }`}
                            >
                                {index + 1}

                                {isMarked && (
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-[#181B21]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between gap-4 mt-6">
                <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#30353E] text-gray-400 font-medium hover:bg-[#292E36] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                {currentQuestion === totalQuestions - 1 ? (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/10"
                    >
                        Submit Quiz
                        <CheckCircle2 className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/10"
                    >
                        Next
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}