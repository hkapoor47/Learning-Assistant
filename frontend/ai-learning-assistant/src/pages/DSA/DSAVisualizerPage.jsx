import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Pause,
    Play,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const algorithms = {
    "Bubble Sort": {
        type: "sort",
        description:
            "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.",
        complexity: "O(n²)",
    },
    "Selection Sort": {
        type: "sort",
        description:
            "Selection Sort repeatedly finds the smallest remaining element and places it at the correct position.",
        complexity: "O(n²)",
    },
    "Binary Search": {
        type: "search",
        description:
            "Binary Search repeatedly divides a sorted search space in half to find the target.",
        complexity: "O(log n)",
    },
};

const initialArray = [64, 34, 25, 12, 22, 11, 90];

export default function DSAVisualizerPage() {
    const [selectedAlgorithm, setSelectedAlgorithm] =
        useState("Bubble Sort");

    const [array, setArray] = useState(initialArray);

    const [currentStep, setCurrentStep] = useState(0);

    const [isPlaying, setIsPlaying] = useState(false);

    const [comparing, setComparing] = useState([]);

    const [sortedIndexes, setSortedIndexes] = useState([]);

    const algorithm = algorithms[selectedAlgorithm];

    const reset = () => {
        setArray([...initialArray]);
        setCurrentStep(0);
        setIsPlaying(false);
        setComparing([]);
        setSortedIndexes([]);
    };

    const nextStep = () => {
        if (algorithm.type !== "sort") {
            setCurrentStep((prev) => prev + 1);
            return;
        }

        const newArray = [...array];

        const pass = Math.floor(currentStep / (newArray.length - 1));
        const comparison =
            currentStep % (newArray.length - 1);

        const left = comparison;
        const right = comparison + 1;

        if (right >= newArray.length - pass) {
            setCurrentStep((prev) => prev + 1);
            return;
        }

        setComparing([left, right]);

        if (newArray[left] > newArray[right]) {
            [newArray[left], newArray[right]] = [
                newArray[right],
                newArray[left],
            ];

            setArray(newArray);
        }

        if (
            currentStep >=
            (newArray.length - 1) * (newArray.length - 2)
        ) {
            setSortedIndexes(
                Array.from(
                    { length: newArray.length },
                    (_, index) => index
                )
            );
            setIsPlaying(false);
        }

        setCurrentStep((prev) => prev + 1);
    };

    const previousStep = () => {
        reset();
        setTimeout(() => {
            const steps = Math.max(0, currentStep - 1);

            for (let i = 0; i < steps; i++) {
                // Visual-only step navigation.
            }

            setCurrentStep(steps);
        }, 0);
    };

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setInterval(() => {
            nextStep();
        }, 700);

        return () => clearInterval(timer);
    }, [isPlaying, currentStep, array]);

    return (
        <div className="max-w-7xl mx-auto">
            <Link
                to="/dsa"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to DSA Lab
            </Link>

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <p className="text-primary text-xs font-semibold tracking-wide">
                            ALGORITHM LAB
                        </p>

                        <h1 className="text-2xl font-bold text-white">
                            Algorithm Visualizer
                        </h1>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-3 max-w-2xl">
                    Understand algorithms visually by stepping through every
                    operation instead of just reading about them.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
                {/* Algorithm List */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-4 h-fit">
                    <p className="text-xs text-gray-600 uppercase tracking-wide mb-3">
                        Algorithms
                    </p>

                    <div className="space-y-2">
                        {Object.keys(algorithms).map((name) => (
                            <button
                                key={name}
                                type="button"
                                onClick={() => {
                                    setSelectedAlgorithm(name);
                                    reset();
                                }}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                                    selectedAlgorithm === name
                                        ? "bg-primary/10 border border-primary/20 text-white"
                                        : "text-gray-500 hover:text-gray-300 hover:bg-[#20242B]"
                                }`}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Visualizer */}
                <div className="space-y-5">
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-[#292D36] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    {selectedAlgorithm}
                                </h2>

                                <p className="text-sm text-gray-600 mt-1">
                                    {algorithm.description}
                                </p>
                            </div>

                            <div className="px-3 py-2 rounded-lg bg-[#20242B] text-xs text-gray-400">
                                Time: {algorithm.complexity}
                            </div>
                        </div>

                        {/* Array */}
                        <div className="min-h-[390px] flex items-end justify-center gap-3 px-6 py-12">
                            {array.map((value, index) => {
                                const active =
                                    comparing.includes(index);

                                const sorted =
                                    sortedIndexes.includes(index);

                                const maxValue = Math.max(...array);

                                const height =
                                    (value / maxValue) * 250;

                                return (
                                    <div
                                        key={`${value}-${index}`}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <span className="text-xs text-gray-500">
                                            {value}
                                        </span>

                                        <div
                                            className={`w-10 md:w-14 rounded-t-lg transition-all duration-300 ${
                                                active
                                                    ? "bg-primary"
                                                    : sorted
                                                    ? "bg-green-500/70"
                                                    : "bg-[#30353E]"
                                            }`}
                                            style={{
                                                height: `${height}px`,
                                            }}
                                        />

                                        <span className="text-[10px] text-gray-700">
                                            {index}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Controls */}
                        <div className="px-5 py-4 border-t border-[#292D36] flex flex-wrap items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={reset}
                                className="px-4 py-2.5 rounded-xl bg-[#20242B] border border-[#30353E] text-sm text-gray-400 hover:text-white hover:bg-[#292E36] transition-colors flex items-center gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset
                            </button>

                            <button
                                type="button"
                                onClick={previousStep}
                                className="w-10 h-10 rounded-xl bg-[#20242B] border border-[#30353E] text-gray-400 hover:text-white hover:bg-[#292E36] flex items-center justify-center"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsPlaying((prev) => !prev)
                                }
                                className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 flex items-center gap-2"
                            >
                                {isPlaying ? (
                                    <>
                                        <Pause className="w-4 h-4" />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-4 h-4" />
                                        Play
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={nextStep}
                                className="w-10 h-10 rounded-xl bg-[#20242B] border border-[#30353E] text-gray-400 hover:text-white hover:bg-[#292E36] flex items-center justify-center"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Current Step */}
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-600">
                                    CURRENT STEP
                                </p>

                                <h3 className="text-base font-semibold text-white mt-1">
                                    {comparing.length === 2
                                        ? `Comparing ${array[comparing[0]]} and ${array[comparing[1]]}`
                                        : "Ready to visualize"}
                                </h3>
                            </div>

                            <div className="text-xs text-gray-600">
                                Step {currentStep}
                            </div>
                        </div>

                        <div className="mt-4 h-2 bg-[#20242B] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{
                                    width: `${Math.min(
                                        100,
                                        (currentStep / 30) * 100
                                    )}%`,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}