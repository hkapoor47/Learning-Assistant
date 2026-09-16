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

const problem = {
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
};

const starterCode = `function twoSum(nums, target) {
    // Write your solution here

}`;

const solutionCode = `function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }

    return [];
}`;

const testCases = [
    {
        id: 1,
        nums: [2, 7, 11, 15],
        target: 9,
        expected: [0, 1],
    },
    {
        id: 2,
        nums: [3, 2, 4],
        target: 6,
        expected: [1, 2],
    },
    {
        id: 3,
        nums: [3, 3],
        target: 6,
        expected: [0, 1],
    },
];

const hints = [
    {
        number: 1,
        title: "Start with the relationship",
        text: "For each number, ask yourself: what other number would I need to reach the target?",
    },
    {
        number: 2,
        title: "Avoid checking every pair",
        text: "Instead of comparing the current number with every other number, think about a data structure that can remember numbers you have already visited.",
    },
    {
        number: 3,
        title: "Think HashMap",
        text: "Store each visited number together with its index. For the current value, calculate target − current value and check whether that complement is already stored.",
    },
];

const normalizeResult = (result) => {
    if (!Array.isArray(result)) {
        return null;
    }

    return result.map(Number);
};

const arraysEqual = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b)) {
        return false;
    }

    if (a.length !== b.length) {
        return false;
    }

    return a.every((value, index) => value === b[index]);
};

export default function DSAProblemPage() {
    const [code, setCode] = useState(starterCode);

    const [activeTab, setActiveTab] = useState("description");

    const [hintLevel, setHintLevel] = useState(0);

    const [showSolution, setShowSolution] = useState(false);

    const [isRunning, setIsRunning] = useState(false);

    const [testResults, setTestResults] = useState([]);

    const [selectedTest, setSelectedTest] = useState(0);

    const [runSummary, setRunSummary] = useState(null);

    const runJavaScriptCode = () => {
        setIsRunning(true);
        setRunSummary(null);
        setTestResults([]);

        setTimeout(() => {
            try {
                const functionMatch = code.match(
                    /function\s+twoSum\s*\(\s*nums\s*,\s*target\s*\)\s*\{([\s\S]*)\}/
                );

                if (!functionMatch) {
                    throw new Error(
                        "Could not find a valid twoSum function."
                    );
                }

                const functionBody = functionMatch[1];

                const userFunction = new Function(
                    "nums",
                    "target",
                    functionBody
                );

                const results = testCases.map((test) => {
                    try {
                        const result = userFunction(
                            [...test.nums],
                            test.target
                        );

                        const normalized = normalizeResult(result);

                        const passed = arraysEqual(
                            normalized,
                            test.expected
                        );

                        return {
                            ...test,
                            actual: normalized,
                            passed,
                            error: null,
                        };
                    } catch (error) {
                        return {
                            ...test,
                            actual: null,
                            passed: false,
                            error: error.message,
                        };
                    }
                });

                setTestResults(results);

                const passedCount = results.filter(
                    (result) => result.passed
                ).length;

                setRunSummary({
                    passed: passedCount,
                    total: results.length,
                    success: passedCount === results.length,
                });
            } catch (error) {
                setRunSummary({
                    passed: 0,
                    total: testCases.length,
                    success: false,
                    error: error.message,
                });
            } finally {
                setIsRunning(false);
            }
        }, 400);
    };

    const handleNextHint = () => {
        if (hintLevel < hints.length) {
            setHintLevel((previous) => previous + 1);
        }
    };

    const handleHideHints = () => {
        setHintLevel(0);
    };

    const handleReset = () => {
        setCode(starterCode);
        setTestResults([]);
        setRunSummary(null);
        setHintLevel(0);
        setShowSolution(false);
    };

    const currentResult = testResults[selectedTest];

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
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2.5 rounded-xl bg-[#181B21] border border-[#292D36] text-sm text-gray-400 hover:bg-[#20242B] hover:text-gray-200 transition-colors flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                    </button>

                    <button
                        type="button"
                        className="px-4 py-2.5 rounded-xl bg-[#181B21] border border-[#292D36] text-sm text-gray-400 hover:bg-[#20242B] hover:text-gray-200 transition-colors flex items-center gap-2"
                    >
                        <ArrowRight className="w-4 h-4" />
                        Next Problem
                    </button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(380px,0.9fr)_minmax(500px,1.1fr)] gap-5">
                {/* LEFT */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-[#292D36]">
                        <button
                            type="button"
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
                            type="button"
                            onClick={() => setActiveTab("approach")}
                            className={`px-5 py-4 text-sm font-medium transition-colors ${
                                activeTab === "approach"
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
                                    Try to solve the problem yourself before
                                    revealing the hints.
                                </p>

                                <div className="space-y-3 mt-6">
                                    <div className="bg-[#101216] border border-[#292D36] rounded-xl p-4">
                                        <p className="text-xs text-primary font-semibold">
                                            THINK
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            What information would help you
                                            avoid checking every possible pair?
                                        </p>
                                    </div>

                                    <div className="bg-[#101216] border border-[#292D36] rounded-xl p-4">
                                        <p className="text-xs text-primary font-semibold">
                                            OPTIMIZE
                                        </p>

                                        <p className="text-sm text-gray-400 mt-2">
                                            Try to solve the problem in one
                                            pass through the array.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-5">
                    {/* Code Editor */}
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

                        <div className="relative">
                            <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#101216] border-r border-[#292D36] text-gray-700 font-mono text-xs text-right pr-3 pt-5 select-none pointer-events-none">
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
                                onChange={(event) =>
                                    setCode(event.target.value)
                                }
                                spellCheck={false}
                                className="w-full min-h-[430px] bg-[#101216] text-gray-300 font-mono text-sm leading-6 resize-none outline-none pl-16 pr-5 py-5"
                            />
                        </div>

                        {/* Editor Controls */}
                        <div className="px-4 py-3 border-t border-[#292D36] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleNextHint}
                                    disabled={hintLevel === hints.length}
                                    className="px-3 py-2 rounded-lg bg-[#20242B] border border-[#30353E] text-xs text-gray-400 hover:text-gray-200 hover:bg-[#292E36] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                                >
                                    <Lightbulb className="w-4 h-4" />

                                    {hintLevel === 0
                                        ? "Get Hint"
                                        : hintLevel === hints.length
                                        ? "All Hints Shown"
                                        : "Next Hint"}
                                </button>

                                {hintLevel > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleHideHints}
                                        className="px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-gray-300 transition-colors"
                                    >
                                        Hide
                                    </button>
                                )}

                                <button
                                    type="button"
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
                                type="button"
                                onClick={runJavaScriptCode}
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

                    {/* Progressive Hints */}
                    {hintLevel > 0 && (
                        <div className="bg-[#181B21] border border-primary/20 rounded-2xl overflow-hidden">
                            <div className="px-5 py-4 border-b border-[#292D36] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Lightbulb className="w-4 h-4 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-white">
                                            DSA Hints
                                        </h3>

                                        <p className="text-xs text-gray-600 mt-0.5">
                                            Hint {hintLevel} of{" "}
                                            {hints.length}
                                        </p>
                                    </div>
                                </div>

                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>

                            <div className="p-5 space-y-3">
                                {hints.slice(0, hintLevel).map((hint) => (
                                    <div
                                        key={hint.number}
                                        className="bg-[#101216] border border-[#292D36] rounded-xl p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-7 h-7 rounded-full bg-[#20242B] border border-[#30353E] flex items-center justify-center text-xs text-primary shrink-0">
                                                {hint.number}
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-gray-300">
                                                    {hint.title}
                                                </p>

                                                <p className="text-sm text-gray-500 leading-6 mt-1">
                                                    {hint.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {hintLevel < hints.length && (
                                    <button
                                        type="button"
                                        onClick={handleNextHint}
                                        className="w-full py-2.5 rounded-xl bg-[#20242B] border border-[#30353E] text-sm text-gray-400 hover:text-white hover:bg-[#292E36] transition-colors"
                                    >
                                        Show Hint {hintLevel + 1}
                                    </button>
                                )}

                                {hintLevel === hints.length && (
                                    <div className="flex items-center gap-2 text-xs text-gray-600 pt-1">
                                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                                        You have reached the strongest hint.
                                        Try coding the solution yourself.
                                    </div>
                                )}
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
                                {solutionCode}
                            </pre>

                            <div className="px-5 py-4 border-t border-[#292D36]">
                                <div className="flex flex-wrap gap-5 text-xs text-gray-600">
                                    <span>
                                        Time Complexity:{" "}
                                        <span className="text-gray-400">
                                            O(n)
                                        </span>
                                    </span>

                                    <span>
                                        Space Complexity:{" "}
                                        <span className="text-gray-400">
                                            O(n)
                                        </span>
                                    </span>
                                </div>
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
                            {testCases.map((test, index) => {
                                const result = testResults[index];

                                return (
                                    <button
                                        key={test.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedTest(index)
                                        }
                                        className={`px-5 py-3 text-xs whitespace-nowrap border-r border-[#292D36] transition-colors flex items-center gap-2 ${
                                            selectedTest === index
                                                ? "text-white bg-[#20242B]"
                                                : "text-gray-600 hover:text-gray-300"
                                        }`}
                                    >
                                        {result?.passed ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                        ) : result ? (
                                            <XCircle className="w-3.5 h-3.5 text-red-400" />
                                        ) : null}

                                        Case {test.id}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="p-5">
                            <div className="bg-[#101216] rounded-xl p-4">
                                <p className="text-xs text-gray-600 mb-2">
                                    Input
                                </p>

                                <p className="text-sm text-gray-400 font-mono">
                                    nums = [
                                    {testCases[selectedTest].nums.join(
                                        ", "
                                    )}
                                    ], target ={" "}
                                    {testCases[selectedTest].target}
                                </p>
                            </div>

                            <div className="bg-[#101216] rounded-xl p-4 mt-3">
                                <p className="text-xs text-gray-600 mb-2">
                                    Expected Output
                                </p>

                                <p className="text-sm text-gray-400 font-mono">
                                    [
                                    {testCases[selectedTest].expected.join(
                                        ", "
                                    )}
                                    ]
                                </p>
                            </div>

                            {currentResult && (
                                <div
                                    className={`mt-3 bg-[#101216] rounded-xl p-4 border ${
                                        currentResult.passed
                                            ? "border-green-500/20"
                                            : "border-red-500/20"
                                    }`}
                                >
                                    <p className="text-xs text-gray-600 mb-2">
                                        Your Output
                                    </p>

                                    {currentResult.error ? (
                                        <p className="text-sm text-red-400 font-mono">
                                            {currentResult.error}
                                        </p>
                                    ) : (
                                        <p
                                            className={`text-sm font-mono ${
                                                currentResult.passed
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            [
                                            {currentResult.actual?.join(
                                                ", "
                                            )}
                                            ]
                                        </p>
                                    )}
                                </div>
                            )}

                            {runSummary && (
                                <div
                                    className={`mt-4 rounded-xl p-4 border ${
                                        runSummary.success
                                            ? "border-green-500/20 bg-green-500/5"
                                            : "border-red-500/20 bg-red-500/5"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {runSummary.success ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-400" />
                                        )}

                                        <div>
                                            <p
                                                className={`text-sm font-semibold ${
                                                    runSummary.success
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }`}
                                            >
                                                {runSummary.success
                                                    ? "All test cases passed"
                                                    : `${runSummary.passed}/${runSummary.total} test cases passed`}
                                            </p>

                                            {runSummary.error && (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {runSummary.error}
                                                </p>
                                            )}
                                        </div>
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