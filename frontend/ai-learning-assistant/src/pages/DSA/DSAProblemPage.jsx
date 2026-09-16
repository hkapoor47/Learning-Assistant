import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    ChevronDown,
    Clock3,
    Code2,
    Lightbulb,
    Play,
    RotateCcw,
    Sparkles,
    Terminal,
    XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const problems = {
    "two-sum": {
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Arrays",
        description:
            "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.",
        examples: [
            {
                input: "nums = [2, 7, 11, 15], target = 9",
                output: "[0, 1]",
            },
            {
                input: "nums = [3, 2, 4], target = 6",
                output: "[1, 2]",
            },
        ],
        constraints: [
            "2 ≤ nums.length ≤ 10⁴",
            "-10⁹ ≤ nums[i] ≤ 10⁹",
            "-10⁹ ≤ target ≤ 10⁹",
            "Exactly one valid answer exists.",
        ],
    },
};

const starterCode = `function twoSum(nums, target) {
    // Write your solution here

}`;

const testCases = [
    {
        id: 1,
        input: "nums = [2, 7, 11, 15], target = 9",
        expected: "[0, 1]",
    },
    {
        id: 2,
        input: "nums = [3, 2, 4], target = 6",
        expected: "[1, 2]",
    },
    {
        id: 3,
        input: "nums = [3, 3], target = 6",
        expected: "[0, 1]",
    },
];

export default function DSAProblemPage() {
    const problem = problems["two-sum"];

    const [code, setCode] = useState(starterCode);
    const [activeTab, setActiveTab] = useState("description");
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [runResult, setRunResult] = useState(null);
    const [selectedTest, setSelectedTest] = useState(0);

    const handleRun = () => {
        setIsRunning(true);
        setRunResult(null);

        setTimeout(() => {
            setIsRunning(false);

            const hasTwoSumLogic =
                code.includes("Map") ||
                code.includes("map") ||
                code.includes("target -") ||
                code.includes("target-") ||
                code.includes("complement");

            if (hasTwoSumLogic && code.length > 100) {
                setRunResult({
                    success: true,
                    message: "All test cases passed.",
                });
            } else {
                setRunResult({
                    success: false,
                    message:
                        "Some test cases failed. Check your approach and try again.",
                });
            }
        }, 1000);
    };

    const handleReset = () => {
        setCode(starterCode);
        setRunResult(null);
        setShowHint(false);
        setShowSolution(false);
    };

    return (
        <div className="max-w-[1500px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div>
                    <Link
                        to="/dsa"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to DSA Lab
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-white">
                                {problem.title}
                            </h1>

                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-primary">
                                    {problem.topic}
                                </span>

                                <span className="text-gray-700">•</span>

                                <span className="text-xs text-gray-500">
                                    {problem.difficulty}
                                </span>

                                <span className="text-gray-700">•</span>

                                <span className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock3 className="w-3.5 h-3.5" />
                                    ~15 min
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2.5 rounded-xl bg-[#181B21] border border-[#292D36] text-sm text-gray-400 hover:bg-[#20242B] hover:text-gray-200 transition-colors flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>

                    <button className="px-4 py-2.5 rounded-xl bg-[#181B21] border border-[#292D36] text-sm text-gray-400 hover:bg-[#20242B] hover:text-gray-200 transition-colors flex items-center gap-2">
                        <ArrowRight className="w-4 h-4" />
                        Next Problem
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(380px,0.9fr)_minmax(500px,1.1fr)] gap-5">
                {/* LEFT — Problem */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-[#292D36]">
                        <button
                            onClick={() => setActiveTab("description")}
                            className={`px-5 py-4 text-sm font-medium transition-colors ${
                                activeTab === "description"
                                    ? "text-white border-b-2 border-primary"
                                    : "text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            Description
                        </button>

                        <button
                            onClick={() => setActiveTab("discussion")}
                            className={`px-5 py-4 text-sm font-medium transition-colors ${
                                activeTab === "discussion"
                                    ? "text-white border-b-2 border-primary"
                                    : "text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            Approach
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === "description" ? (
                            <>
                                <p className="text-gray-300 leading-7 text-sm">
                                    {problem.description}
                                </p>

                                {/* Examples */}
                                <section className="mt-7">
                                    <h2 className="text-sm font-semibold text-white mb-4">
                                        Examples
                                    </h2>

                                    <div className="space-y-4">
                                        {problem.examples.map(
                                            (example, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-[#101216] border border-[#292D36] rounded-xl p-4"
                                                >
                                                    <p className="text-xs text-gray-500 mb-2">
                                                        Example {index + 1}
                                                    </p>

                                                    <p className="text-sm text-gray-300 font-mono">
                                                        Input:{" "}
                                                        {example.input}
                                                    </p>

                                                    <p className="text-sm text-gray-300 font-mono mt-2">
                                                        Output:{" "}
                                                        {example.output}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </section>

                                {/* Constraints */}
                                <section className="mt-7">
                                    <h2 className="text-sm font-semibold text-white mb-3">
                                        Constraints
                                    </h2>

                                    <ul className="space-y-2">
                                        {problem.constraints.map(
                                            (constraint) => (
                                                <li
                                                    key={constraint}
                                                    className="text-sm text-gray-500"
                                                >
                                                    • {constraint}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </section>
                            </>
                        ) : (
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    Think before you code
                                </h2>

                                <p className="text-sm text-gray-500 leading-6 mt-3">
                                    For this problem, you need to efficiently
                                    determine whether a previously seen number
                                    can be paired with the current number to
                                    reach the target.
                                </p>

                                <div className="mt-6 space-y-3">
                                    <div className="bg-[#101216] border border-[#292D36] rounded-xl p-4">
                                        <p className="text-xs text-primary font-semibold">
                                            STEP 1
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            Think about what information you
                                            need to remember while iterating
                                            through the array.
                                        </p>
                                    </div>

                                    <div className="bg-[#101216] border border-[#292D36] rounded-xl p-4">
                                        <p className="text-xs text-primary font-semibold">
                                            STEP 2
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            Try to avoid checking every pair
                                            repeatedly.
                                        </p>
                                    </div>

                                    <div className="bg-[#101216] border border-[#292D36] rounded-xl p-4">
                                        <p className="text-xs text-primary font-semibold">
                                            STEP 3
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            Consider whether a hash-based data
                                            structure can reduce the lookup
                                            time.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT — Code */}
                <div className="flex flex-col gap-5">
                    {/* Editor */}
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                        <div className="h-12 px-4 border-b border-[#292D36] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-gray-500" />

                                <span className="text-sm text-gray-300">
                                    Solution
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="px-2.5 py-1 rounded-md bg-[#20242B] text-xs text-gray-500">
                                    JavaScript
                                </div>

                                <ChevronDown className="w-4 h-4 text-gray-600" />
                            </div>
                        </div>

                        {/* Fake editor */}
                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#101216] border-r border-[#292D36] text-gray-700 font-mono text-xs text-right pr-3 pt-5 select-none">
                                {code.split("\n").map((_, index) => (
                                    <div
                                        key={index}
                                        className="leading-6"
                                    >
                                        {index + 1}
                                    </div>
                                ))}
                            </div>

                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck={false}
                                className="w-full min-h-[430px] bg-[#101216] text-gray-300 font-mono text-sm leading-6 resize-none outline-none pl-16 pr-5 py-5"
                            />
                        </div>

                        {/* Editor Footer */}
                        <div className="px-4 py-3 border-t border-[#292D36] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowHint(!showHint)}
                                    className="px-3 py-2 rounded-lg bg-[#20242B] border border-[#30353E] text-xs text-gray-400 hover:text-gray-200 hover:bg-[#292E36] transition-colors flex items-center gap-2"
                                >
                                    <Lightbulb className="w-4 h-4" />
                                    {showHint ? "Hide Hint" : "Get Hint"}
                                </button>

                                <button
                                    onClick={() =>
                                        setShowSolution(!showSolution)
                                    }
                                    className="px-3 py-2 rounded-lg bg-[#20242B] border border-[#30353E] text-xs text-gray-400 hover:text-gray-200 hover:bg-[#292E36] transition-colors"
                                >
                                    {showSolution
                                        ? "Hide Solution"
                                        : "View Solution"}
                                </button>
                            </div>

                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-60 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                                {isRunning ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Running...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Run Code
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Hint */}
                    {showHint && (
                        <div className="bg-[#181B21] border border-primary/20 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Lightbulb className="w-4 h-4 text-primary" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        Hint
                                    </h3>

                                    <p className="text-sm text-gray-500 leading-6 mt-1">
                                        For every number, calculate the value
                                        you need to find. Store numbers you
                                        have already visited so you can check
                                        for that value in constant time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Solution */}
                    {showSolution && (
                        <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-[#292D36] flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-primary" />

                                <h3 className="text-sm font-semibold text-white">
                                    Suggested Solution
                                </h3>
                            </div>

                            <pre className="p-5 bg-[#101216] text-gray-400 text-sm leading-6 overflow-x-auto font-mono">
{`function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    return [];
}`}
                            </pre>

                            <div className="px-5 py-4 border-t border-[#292D36]">
                                <p className="text-xs text-gray-600">
                                    Time Complexity: O(n) · Space Complexity:
                                    O(n)
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Test Cases */}
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#292D36]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-white">
                                    Test Cases
                                </h3>

                                <span className="text-xs text-gray-600">
                                    {testCases.length} cases
                                </span>
                            </div>
                        </div>

                        <div className="flex overflow-x-auto border-b border-[#292D36]">
                            {testCases.map((test, index) => (
                                <button
                                    key={test.id}
                                    onClick={() => setSelectedTest(index)}
                                    className={`px-5 py-3 text-xs whitespace-nowrap border-r border-[#292D36] transition-colors ${
                                        selectedTest === index
                                            ? "text-white bg-[#20242B]"
                                            : "text-gray-600 hover:text-gray-300"
                                    }`}
                                >
                                    Case {test.id}
                                </button>
                            ))}
                        </div>

                        <div className="p-5">
                            <div className="bg-[#101216] rounded-xl p-4">
                                <p className="text-xs text-gray-600 mb-2">
                                    Input
                                </p>

                                <p className="text-sm text-gray-400 font-mono">
                                    {testCases[selectedTest].input}
                                </p>
                            </div>

                            <div className="bg-[#101216] rounded-xl p-4 mt-3">
                                <p className="text-xs text-gray-600 mb-2">
                                    Expected Output
                                </p>

                                <p className="text-sm text-gray-400 font-mono">
                                    {testCases[selectedTest].expected}
                                </p>
                            </div>

                            {runResult && (
                                <div
                                    className={`mt-4 rounded-xl p-4 border ${
                                        runResult.success
                                            ? "border-green-500/20 bg-green-500/5"
                                            : "border-red-500/20 bg-red-500/5"
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {runResult.success ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-400" />
                                        )}

                                        <p
                                            className={`text-sm font-medium ${
                                                runResult.success
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            {runResult.message}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Flow */}
            <div className="mt-6 bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
                    {[
                        "Understand",
                        "Think",
                        "Get Hint",
                        "Code",
                        "Run",
                        "Analyze",
                    ].map((step, index) => (
                        <div
                            key={step}
                            className="flex items-center gap-3"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-[#20242B] border border-[#30353E] flex items-center justify-center text-xs text-gray-500">
                                    {index + 1}
                                </div>

                                <span className="text-xs text-gray-500">
                                    {step}
                                </span>
                            </div>

                            {index < 5 && (
                                <ArrowRight className="w-3.5 h-3.5 text-gray-700 hidden md:block" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}