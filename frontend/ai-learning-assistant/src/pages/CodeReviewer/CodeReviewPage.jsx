import { useState } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    Code2,
    FileCode2,
    Gauge,
    Lightbulb,
    Play,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const languages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C",
    "TypeScript",
];

const demoCode = `def find_max(numbers):
    max_value = 0

    for number in numbers:
        if number > max_value:
            max_value = number

    return max_value`;

const reviewSections = [
    {
        id: "summary",
        title: "Code Summary",
        icon: Sparkles,
        content:
            "This function iterates through a collection of numbers and returns the largest value found.",
    },
    {
        id: "issues",
        title: "Potential Issues",
        icon: AlertTriangle,
        points: [
            "Initializing max_value to 0 can produce an incorrect result when all input values are negative.",
            "The function does not explicitly handle an empty input list.",
        ],
    },
    {
        id: "improvements",
        title: "Suggested Improvements",
        icon: Lightbulb,
        points: [
            "Initialize the maximum from the first element or use a safe built-in approach.",
            "Decide how empty input should be handled and document that behavior.",
        ],
    },
    {
        id: "complexity",
        title: "Complexity",
        icon: Gauge,
        points: [
            "Time complexity: O(n), because the input is traversed once.",
            "Space complexity: O(1), excluding the input collection.",
        ],
    },
];

export default function CodeReviewerPage() {
    const navigate = useNavigate();

    const [language, setLanguage] = useState("Python");
    const [code, setCode] = useState(demoCode);
    const [isReviewing, setIsReviewing] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    const handleReview = async () => {
        if (!code.trim() || isReviewing) {
            return;
        }

        setIsReviewing(true);
        setHasReviewed(false);

        await new Promise((resolve) => setTimeout(resolve, 900));

        setIsReviewing(false);
        setHasReviewed(true);
    };

    const handleClear = () => {
        setCode("");
        setHasReviewed(false);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-200 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            <div className="mb-8">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Code2 className="w-7 h-7 text-primary" />
                    </div>

                    <div>
                        <p className="text-primary text-sm font-semibold mb-2">
                            CODE REVIEW
                        </p>

                        <h1 className="text-3xl font-bold text-white">
                            Code Reviewer
                        </h1>

                        <p className="text-gray-500 mt-2 max-w-2xl leading-6">
                            Paste your code and get an AI-powered review with
                            explanations, potential issues, improvements, and
                            complexity analysis.
                        </p>
                    </div>
                </div>
            </div>

            <section className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#292D36] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                            <FileCode2 className="w-4 h-4 text-primary" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-white">
                                Your Code
                            </p>

                            <p className="text-xs text-gray-600 mt-0.5">
                                Paste the code you want reviewed.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <select
                            value={language}
                            onChange={(event) =>
                                setLanguage(event.target.value)
                            }
                            className="bg-[#20242B] border border-[#30353E] rounded-xl px-3 py-2 text-sm text-gray-300 outline-none focus:border-primary/50 transition-colors"
                        >
                            {languages.map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                    className="bg-[#20242B]"
                                >
                                    {item}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={!code || isReviewing}
                            className="px-4 py-2 rounded-xl border border-[#30353E] text-sm text-gray-500 hover:text-gray-200 hover:bg-[#292E36] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <textarea
                        value={code}
                        onChange={(event) => {
                            setCode(event.target.value);
                            setHasReviewed(false);
                        }}
                        spellCheck={false}
                        placeholder="Paste your code here..."
                        className="w-full min-h-[360px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-5 text-sm text-gray-300 placeholder:text-gray-700 outline-none focus:border-primary/40 font-mono leading-6"
                    />

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-xs text-gray-600">
                            {language} · {code.length} characters
                        </p>

                        <button
                            type="button"
                            onClick={handleReview}
                            disabled={!code.trim() || isReviewing}
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <Play className="w-4 h-4" />

                            {isReviewing ? "Reviewing..." : "Review Code"}
                        </button>
                    </div>
                </div>
            </section>

            {!hasReviewed && !isReviewing && (
                <section className="mt-8 bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                        <Code2 className="w-7 h-7 text-primary" />
                    </div>

                    <h2 className="text-xl font-semibold text-white mt-5">
                        Ready for a Code Review
                    </h2>

                    <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2 leading-6">
                        Submit your code to receive a structured review.
                        The real AI analysis will be connected during the
                        backend stage.
                    </p>
                </section>
            )}

            {isReviewing && (
                <section className="mt-8 bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto" />

                    <h2 className="text-lg font-semibold text-white mt-5">
                        Reviewing your code...
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        The review will appear here.
                    </p>
                </section>
            )}

            {hasReviewed && (
                <section className="mt-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
                        <div>
                            <p className="text-primary text-sm font-semibold mb-2">
                                AI REVIEW RESULT
                            </p>

                            <h2 className="text-2xl font-bold text-white">
                                Code Review
                            </h2>

                            <p className="text-sm text-gray-500 mt-2">
                                Review generated for your {language} code.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/15">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-xs font-medium text-gray-300">
                                Review complete
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {reviewSections.map((section) => {
                            const Icon = section.icon;

                            return (
                                <div
                                    key={section.id}
                                    className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>

                                        <h3 className="text-base font-semibold text-white">
                                            {section.title}
                                        </h3>
                                    </div>

                                    {section.content && (
                                        <p className="text-sm text-gray-400 leading-7 mt-5">
                                            {section.content}
                                        </p>
                                    )}

                                    {section.points && (
                                        <div className="mt-5 space-y-3">
                                            {section.points.map((point) => (
                                                <div
                                                    key={point}
                                                    className="flex items-start gap-3"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />

                                                    <p className="text-sm text-gray-400 leading-6">
                                                        {point}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-5 bg-[#20242B] border border-[#30353E] rounded-2xl p-5">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Frontend demo review
                                </p>

                                <p className="text-sm text-gray-500 mt-1 leading-6">
                                    These findings are demonstration data.
                                    Later, the backend will generate the
                                    review from the actual code you submit.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}