import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Brain,
    CheckCircle2,
    Code2,
    Lightbulb,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const topics = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Stack",
    "Queue",
    "Hashing",
    "Recursion",
    "Sorting",
    "Binary Search",
    "Trees",
    "Graphs",
    "Greedy",
    "Backtracking",
    "Dynamic Programming",
    "Bit Manipulation",
];

const difficulties = ["Easy", "Medium", "Hard", "Mixed"];
const questionCounts = [5, 10, 15];

const demoQuestions = [
    {
        question:
            "What is the time complexity of accessing an element by index in an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        answer: 0,
        explanation:
            "Array elements are stored in contiguous memory, so accessing an element using its index takes constant time.",
    },
    {
        question:
            "Which data structure follows the Last In, First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Heap"],
        answer: 1,
        explanation:
            "A stack follows LIFO, meaning the most recently added element is removed first.",
    },
    {
        question:
            "Which searching algorithm requires the data to be sorted?",
        options: ["Linear Search", "Binary Search", "Depth First Search", "Breadth First Search"],
        answer: 1,
        explanation:
            "Binary Search repeatedly divides a sorted search space into two halves.",
    },
    {
        question:
            "What is the average time complexity of searching for a key in a well-designed hash table?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        answer: 0,
        explanation:
            "With a good hash function and controlled collisions, hash-table lookup has average-case O(1) time complexity.",
    },
    {
        question:
            "Which traversal visits a tree's root before its subtrees?",
        options: ["Inorder", "Postorder", "Preorder", "Level Order"],
        answer: 2,
        explanation:
            "Preorder traversal visits the root first, followed by the left and right subtrees.",
    },
];

export default function DSAPracticePage() {
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Mixed");
    const [questionCount, setQuestionCount] = useState(5);

    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const questions = demoQuestions.slice(
        0,
        Math.min(questionCount, demoQuestions.length)
    );

    const question = questions[currentQuestion];

    const startPractice = () => {
        if (!topic.trim()) return;

        setStarted(true);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setSubmitted(false);
        setScore(0);
        setFinished(false);
    };

    const submitAnswer = () => {
        if (selectedAnswer === null) return;

        if (selectedAnswer === question.answer) {
            setScore((prev) => prev + 1);
        }

        setSubmitted(true);
    };

    const nextQuestion = () => {
        if (currentQuestion === questions.length - 1) {
            setFinished(true);
            return;
        }

        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setSubmitted(false);
    };

    const restartPractice = () => {
        setStarted(false);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setSubmitted(false);
        setScore(0);
        setFinished(false);
    };

    if (!started) {
        return (
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Code2 className="w-6 h-6 text-primary" />
                        </div>

                        <div>
                            <p className="text-primary text-xs font-semibold tracking-wide">
                                PRACTICE
                            </p>

                            <h1 className="text-3xl font-bold text-white">
                                DSA Practice
                            </h1>
                        </div>
                    </div>

                    <p className="text-gray-500 mt-3 max-w-2xl leading-6">
                        Choose a topic and practice data structures and
                        algorithms questions with explanations.
                    </p>
                </div>

                {/* Setup Card */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-7">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Start Practice
                            </h2>

                            <p className="text-sm text-gray-600 mt-1">
                                Configure your DSA practice session.
                            </p>
                        </div>
                    </div>

                    {/* Topic */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Topic
                        </label>

                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Enter a topic, e.g. Arrays"
                            className="w-full bg-[#20242B] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/50 transition-colors"
                        />

                        <div className="flex flex-wrap gap-2 mt-3">
                            {topics.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setTopic(item)}
                                    className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                                        topic === item
                                            ? "bg-primary/10 border-primary/30 text-primary"
                                            : "bg-[#20242B] border-[#30353E] text-gray-500 hover:bg-[#292E36] hover:text-gray-300"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty */}
                    <div className="mt-7">
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Difficulty
                        </label>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {difficulties.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setDifficulty(item)}
                                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                                        difficulty === item
                                            ? "bg-primary/10 border-primary/40 text-primary"
                                            : "bg-[#20242B] border-[#30353E] text-gray-500 hover:bg-[#292E36] hover:text-gray-300"
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Number */}
                    <div className="mt-7">
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Number of Questions
                        </label>

                        <div className="grid grid-cols-3 gap-3">
                            {questionCounts.map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => setQuestionCount(count)}
                                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                                        questionCount === count
                                            ? "bg-primary/10 border-primary/40 text-primary"
                                            : "bg-[#20242B] border-[#30353E] text-gray-500 hover:bg-[#292E36] hover:text-gray-300"
                                    }`}
                                >
                                    {count}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Start */}
                    <button
                        type="button"
                        onClick={startPractice}
                        disabled={!topic.trim()}
                        className="w-full mt-8 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <Brain className="w-5 h-5" />
                        Start Practice
                    </button>
                </div>
            </div>
        );
    }

    if (finished) {
        const finalScore = score;

        return (
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>

                    <p className="text-primary text-xs font-semibold tracking-wide mt-5">
                        PRACTICE COMPLETE
                    </p>

                    <h1 className="text-3xl font-bold text-white mt-2">
                        Good work!
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Here's your DSA practice result.
                    </p>
                </div>

                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-8 text-center">
                    <p className="text-sm text-gray-500">
                        {topic} · {difficulty}
                    </p>

                    <div className="text-5xl font-bold text-white mt-5">
                        {finalScore}/{questions.length}
                    </div>

                    <p className="text-gray-500 mt-2">
                        Questions answered correctly
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button
                            type="button"
                            onClick={restartPractice}
                            className="flex-1 py-3 rounded-xl border border-[#30353E] bg-[#20242B] text-gray-300 hover:bg-[#292E36] transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Practice Again
                        </button>

                        <Link
                            to="/dashboard"
                            className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors flex items-center justify-center"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Top */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Exit Practice
                </Link>

                <div className="text-right">
                    <p className="text-xs text-gray-600">
                        {topic} · {difficulty}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                        Question {currentQuestion + 1} of {questions.length}
                    </p>
                </div>
            </div>

            {/* Progress */}
            <div className="h-1.5 bg-[#20242B] rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                        width: `${
                            ((currentQuestion + 1) / questions.length) * 100
                        }%`,
                    }}
                />
            </div>

            {/* Question */}
            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <Code2 className="w-4 h-4" />
                    DSA Question
                </div>

                <h1 className="text-xl md:text-2xl font-semibold text-white leading-8 mt-5">
                    {question.question}
                </h1>

                {/* Options */}
                <div className="space-y-3 mt-7">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === question.answer;

                        let classes =
                            "bg-[#20242B] border-[#30353E] text-gray-300 hover:bg-[#292E36]";

                        if (submitted && isCorrect) {
                            classes =
                                "bg-green-500/10 border-green-500/30 text-green-400";
                        } else if (
                            submitted &&
                            isSelected &&
                            !isCorrect
                        ) {
                            classes =
                                "bg-red-500/10 border-red-500/30 text-red-400";
                        } else if (isSelected) {
                            classes =
                                "bg-primary/10 border-primary/40 text-primary";
                        }

                        return (
                            <button
                                key={option}
                                type="button"
                                disabled={submitted}
                                onClick={() => setSelectedAnswer(index)}
                                className={`w-full text-left px-4 py-4 rounded-xl border transition-all ${classes}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#181B21] border border-[#30353E] flex items-center justify-center text-xs font-semibold shrink-0">
                                        {String.fromCharCode(65 + index)}
                                    </div>

                                    <span className="text-sm">
                                        {option}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {submitted && (
                    <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/15">
                        <div className="flex items-start gap-3">
                            <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Explanation
                                </p>

                                <p className="text-sm text-gray-500 leading-6 mt-1">
                                    {question.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end mt-7">
                    {!submitted ? (
                        <button
                            type="button"
                            onClick={submitAnswer}
                            disabled={selectedAnswer === null}
                            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium transition-colors"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={nextQuestion}
                            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors flex items-center gap-2"
                        >
                            {currentQuestion === questions.length - 1
                                ? "View Result"
                                : "Next Question"}

                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}