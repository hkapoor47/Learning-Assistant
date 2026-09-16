import { useState } from "react";
import {
    ArrowLeft,
    Brain,
    CheckCircle2,
    Lightbulb,
    Send,
    Sparkles,
    Target,
    XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const suggestions = [
    "Why am I getting this error?",
    "Give me a hint for Two Sum",
    "How can I improve my approach?",
    "Explain time complexity",
];

export default function DSACoachPage() {
    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            type: "coach",
            text: "Hey! I'm your DSA Coach. I can help you understand problems, give progressive hints, review your approach, and explain mistakes without immediately revealing the solution.",
        },
    ]);

    const sendMessage = (text = message) => {
        const cleanMessage = text.trim();

        if (!cleanMessage) return;

        setMessages((prev) => [
            ...prev,
            {
                type: "user",
                text: cleanMessage,
            },
            {
                type: "coach",
                text: getCoachResponse(cleanMessage),
            },
        ]);

        setMessage("");
    };

    const getCoachResponse = (input) => {
        const lower = input.toLowerCase();

        if (lower.includes("hint")) {
            return "Start by asking what value you need for the current number to reach the target. Then think about how you could quickly check whether that value has already appeared.";
        }

        if (lower.includes("complexity")) {
            return "For the optimized Two Sum approach, each number is processed once and the lookup structure provides fast average-time checks. That gives O(n) time and O(n) additional space.";
        }

        if (
            lower.includes("error") ||
            lower.includes("wrong")
        ) {
            return "First inspect the failing test case. Check the returned indices, boundary conditions, and whether your data structure is storing the information you expect.";
        }

        if (lower.includes("improve")) {
            return "Try identifying repeated work in your current solution. If the same information is being searched repeatedly, consider storing it so future lookups become faster.";
        }

        return "Good question. Break the problem into three parts: what information you need, how you can store it, and how you can use that information while processing the input.";
    };

    return (
        <div className="max-w-6xl mx-auto">
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
                        <Brain className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <p className="text-primary text-xs font-semibold tracking-wide">
                            PERSONAL DSA GUIDE
                        </p>

                        <h1 className="text-2xl font-bold text-white">
                            AI DSA Coach
                        </h1>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-3">
                    Learn from your mistakes instead of simply getting the
                    answer.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Target className="w-4 h-4 text-primary" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-600">
                                    CURRENT FOCUS
                                </p>

                                <p className="text-sm font-semibold text-white mt-1">
                                    Arrays
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-600">
                                        Topic mastery
                                    </span>

                                    <span className="text-gray-500">
                                        72%
                                    </span>
                                </div>

                                <div className="h-1.5 bg-[#20242B] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{ width: "72%" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
                        <p className="text-xs text-gray-600 uppercase tracking-wide mb-3">
                            Quick Actions
                        </p>

                        <div className="space-y-2">
                            {suggestions.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => sendMessage(item)}
                                    className="w-full text-left px-3 py-2.5 rounded-lg bg-[#20242B] text-xs text-gray-500 hover:text-gray-200 hover:bg-[#292E36] transition-colors"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden min-h-[650px] flex flex-col">
                    <div className="px-5 py-4 border-b border-[#292D36] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    DSA Coach
                                </p>

                                <p className="text-xs text-gray-600 mt-0.5">
                                    Guided learning mode
                                </p>
                            </div>
                        </div>

                        <span className="flex items-center gap-1.5 text-xs text-green-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            Online
                        </span>
                    </div>

                    <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                        {messages.map((item, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    item.type === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                                        item.type === "user"
                                            ? "bg-primary text-white"
                                            : "bg-[#20242B] border border-[#30353E] text-gray-400"
                                    }`}
                                >
                                    {item.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coaching Cards */}
                    <div className="px-5 pb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-[#101216] border border-[#292D36] rounded-xl p-3">
                            <Lightbulb className="w-4 h-4 text-primary" />

                            <p className="text-xs text-gray-400 mt-2">
                                Progressive Hints
                            </p>
                        </div>

                        <div className="bg-[#101216] border border-[#292D36] rounded-xl p-3">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />

                            <p className="text-xs text-gray-400 mt-2">
                                Approach Review
                            </p>
                        </div>

                        <div className="bg-[#101216] border border-[#292D36] rounded-xl p-3">
                            <XCircle className="w-4 h-4 text-red-400" />

                            <p className="text-xs text-gray-400 mt-2">
                                Mistake Analysis
                            </p>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-[#292D36]">
                        <div className="flex items-center gap-2 bg-[#101216] border border-[#30353E] rounded-xl p-2">
                            <input
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                placeholder="Ask your DSA Coach..."
                                className="flex-1 bg-transparent outline-none text-sm text-gray-300 placeholder:text-gray-700 px-2"
                            />

                            <button
                                type="button"
                                onClick={() => sendMessage()}
                                className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}