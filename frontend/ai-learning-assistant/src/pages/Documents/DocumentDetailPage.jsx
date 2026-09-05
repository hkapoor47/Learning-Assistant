import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    FileText,
    MessageCircle,
    Sparkles,
    BookOpen,
    Brain,
    Send,
    WandSparkles,
    Lightbulb,
} from "lucide-react";

import { useDocuments } from "../../context/DocumentContext";
import PdfViewer from "../../components/documents/PdfViewer";

const tabs = [
    {
        id: "content",
        label: "Content",
        icon: FileText,
    },
    {
        id: "chat",
        label: "Chat",
        icon: MessageCircle,
    },
    {
        id: "ai-actions",
        label: "AI Actions",
        icon: Sparkles,
    },
    {
        id: "flashcards",
        label: "Flashcards",
        icon: BookOpen,
    },
    {
        id: "quiz",
        label: "Quiz",
        icon: Brain,
    },
];

export default function DocumentDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { getDocumentById } = useDocuments();

    const document = getDocumentById(id);

    const [activeTab, setActiveTab] = useState("content");
    const [message, setMessage] = useState("");

    if (!document) {
        return (
            <div className="max-w-7xl mx-auto">
                <button
                    type="button"
                    onClick={() => navigate("/documents")}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Documents
                </button>

                <div className="mt-10 bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <FileText className="w-12 h-12 text-gray-600 mx-auto" />

                    <h2 className="text-xl font-semibold text-white mt-4">
                        Document not found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        This document is no longer available.
                    </p>
                </div>
            </div>
        );
    }

    const handleSendMessage = () => {
        if (!message.trim()) return;

        setMessage("");
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    type="button"
                    onClick={() => navigate("/documents")}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-200 transition-colors mb-5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Documents
                </button>

                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-white truncate">
                            {document.name}
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            PDF Document · {document.size} · AI Learning Workspace
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-2 mb-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {tabs.map(({ id: tabId, label, icon: Icon }) => (
                        <button
                            key={tabId}
                            type="button"
                            onClick={() => setActiveTab(tabId)}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === tabId
                                    ? "bg-primary/15 text-primary border border-primary/20 shadow-sm"
                                    : "text-gray-500 border border-transparent hover:bg-[#292E36] hover:text-gray-200"
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            {activeTab === "content" && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                    {document.file ? (
                        <div className="h-[calc(100vh-270px)] min-h-[600px]">
                            <PdfViewer file={document.file} />
                        </div>
                    ) : (
                        <div className="min-h-[600px] flex flex-col items-center justify-center text-center p-8">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-primary" />
                            </div>

                            <h2 className="text-xl font-semibold text-white mt-5">
                                PDF preview unavailable
                            </h2>

                            <p className="text-gray-500 max-w-md mt-2">
                                This is a demo document. Upload your own PDF from
                                the Documents page to open it in the real PDF viewer.
                            </p>

                            <button
                                type="button"
                                onClick={() => navigate("/documents")}
                                className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors"
                            >
                                Go to Documents
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Chat */}
            {activeTab === "chat" && (
                <DocumentChat document={document} />
           )}

            {/* AI Actions */}
            {activeTab === "ai-actions" && (
                <DocumentAIActions document={document} />
           )}


            {/* Flashcards */}
            {activeTab === "flashcards" && (
                <DocumentFlashcards document={document} />
          )}

            {/* Quiz */}
            {activeTab === "quiz" && (
                <DocumentQuiz document={document} />
          )}
        </div>
    );
}

function DocumentChat({ document }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content: `Hi! I'm ready to help you understand "${document.name}". Ask me anything about this document.`,
        },
    ]);

    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef(null);

    const suggestedQuestions = [
        "Summarize this document",
        "What are the main topics?",
        "Explain the difficult concepts",
    ];

    // Automatically scroll to the newest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    const handleSendMessage = (text = message) => {
        const trimmedMessage = text.trim();

        if (!trimmedMessage || isTyping) {
            return;
        }

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: trimmedMessage,
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        setTimeout(() => {
            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    "I'm currently running in frontend demo mode. Once we connect the AI backend, I'll be able to analyze this PDF and answer questions using its actual content.",
            };

            setMessages((prev) => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 900);
    };

    return (
        <div className="h-[calc(100vh-270px)] min-h-[520px] bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden flex flex-col">

            {/* Chat Header */}
            <div className="px-6 py-5 border-b border-[#292D36] shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-white">
                            Ask about this document
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Ask questions and learn from your study material.
                        </p>
                    </div>
                </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">

                    {messages.map((item) => (
                        <div
                            key={item.id}
                            className={`flex ${
                                item.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div className="max-w-2xl">
                                <div className="flex items-start gap-3">

                                    {/* AI Avatar */}
                                    {item.role === "assistant" && (
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                            <Sparkles className="w-4 h-4 text-primary" />
                                        </div>
                                    )}

                                    {/* Message */}
                                    <div
                                        className={`px-4 py-3 rounded-2xl ${
                                            item.role === "user"
                                                ? "bg-primary text-white rounded-tr-md"
                                                : "bg-[#20242B] border border-[#30353E] text-gray-300 rounded-tl-md"
                                        }`}
                                    >
                                        <p className="text-sm leading-6">
                                            {item.content}
                                        </p>
                                    </div>

                                    {/* User Avatar */}
                                    {item.role === "user" && (
                                        <div className="w-9 h-9 rounded-xl bg-[#292E36] border border-[#30353E] flex items-center justify-center shrink-0">
                                            <span className="text-xs font-semibold text-gray-300">
                                                You
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                <Sparkles className="w-4 h-4 text-primary" />
                            </div>

                            <div className="bg-[#20242B] border border-[#30353E] rounded-2xl rounded-tl-md px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />

                                    <span
                                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                                        style={{
                                            animationDelay: "150ms",
                                        }}
                                    />

                                    <span
                                        className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                                        style={{
                                            animationDelay: "300ms",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Auto-scroll target */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && !isTyping && (
                    <div className="mt-8">
                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-3">
                            Try asking
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {suggestedQuestions.map((question) => (
                                <button
                                    key={question}
                                    type="button"
                                    onClick={() =>
                                        handleSendMessage(question)
                                    }
                                    className="px-3 py-2 rounded-xl bg-[#20242B] border border-[#30353E] text-sm text-gray-400 hover:bg-[#292E36] hover:text-gray-200 hover:border-[#3A404A] transition-all"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Fixed Chat Input */}
            <div className="p-4 border-t border-[#292D36] shrink-0 bg-[#181B21]">
                <div className="flex items-end gap-3">
                    <textarea
                        value={message}
                        onChange={(event) =>
                            setMessage(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter" &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        placeholder="Ask something about this document..."
                        rows={1}
                        disabled={isTyping}
                        className="flex-1 resize-none bg-[#20242B] border border-[#30353E] text-gray-200 placeholder:text-gray-600 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all disabled:opacity-50"
                    />

                    <button
                        type="button"
                        onClick={() => handleSendMessage()}
                        disabled={!message.trim() || isTyping}
                        className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-xs text-gray-600 mt-2 px-1">
                    Press Enter to send · Shift + Enter for a new line
                </p>
            </div>
        </div>
    );
}

function DocumentAIActions({ document }) {
    const [activeAction, setActiveAction] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState(null);

    const actions = [
        {
            id: "summary",
            title: "Summarize",
            description:
                "Get a concise overview of the important ideas in this document.",
            icon: WandSparkles,
        },
        {
            id: "explain",
            title: "Explain Topic",
            description:
                "Break down difficult concepts into simple, easy-to-understand explanations.",
            icon: Lightbulb,
        },
        {
            id: "key-points",
            title: "Key Points",
            description:
                "Extract the most important points you should remember from this document.",
            icon: Sparkles,
        },
    ];

    const handleAction = (actionId) => {
        setActiveAction(actionId);
        setIsGenerating(true);
        setResult(null);

        setTimeout(() => {
            if (actionId === "summary") {
                setResult({
                    title: "Document Summary",
                    content: `This is a frontend demo summary for "${document.name}". Once the AI backend is connected, this section will analyze the actual PDF content and generate a document-specific summary.`,
                });
            }

            if (actionId === "explain") {
                setResult({
                    title: "Topic Explanation",
                    content: `Choose a topic from "${document.name}" and the AI will explain it step-by-step in simple language. The actual document content will be used once the AI backend is connected.`,
                });
            }

            if (actionId === "key-points") {
                setResult({
                    title: "Key Points",
                    points: [
                        "Important concepts from the document",
                        "Core definitions and terminology",
                        "Major ideas you should remember",
                        "Useful points for exam preparation",
                    ],
                });
            }

            setIsGenerating(false);
        }, 1000);
    };

    const clearResult = () => {
        setActiveAction(null);
        setResult(null);
    };

    return (
        <div>

            {/* Header */}
            <div className="mb-6">
                <p className="text-primary text-sm font-semibold mb-2">
                    LEARN FASTER
                </p>

                <h2 className="text-2xl font-bold text-white">
                    AI Actions
                </h2>

                <p className="text-gray-500 mt-2">
                    Transform your document into useful study material.
                </p>
            </div>

            {/* Action Cards */}
            {!result && !isGenerating && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {actions.map((action) => {
                        const Icon = action.icon;

                        return (
                            <button
                                key={action.id}
                                type="button"
                                onClick={() => handleAction(action.id)}
                                className="group text-left bg-[#20242B] border border-[#30353E] rounded-2xl p-6 hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300"
                            >
                                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>

                                <h3 className="text-lg font-semibold text-white mt-5">
                                    {action.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-2 leading-6">
                                    {action.description}
                                </p>

                                <div className="mt-5 pt-4 border-t border-[#30353E]">
                                    <span className="text-sm font-medium text-primary group-hover:text-purple-300 transition-colors">
                                        Generate →
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Loading */}
            {isGenerating && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl min-h-[420px] flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mt-5">
                        Generating...
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        AI is preparing your study material.
                    </p>

                    <div className="flex items-center gap-1.5 mt-5">
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                </div>
            )}

            {/* Result */}
            {result && !isGenerating && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">

                    {/* Result Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[#292D36]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    {result.title}
                                </h3>

                                <p className="text-xs text-gray-500 mt-1">
                                    Generated for {document.name}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={clearResult}
                            className="px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-[#292E36] transition-colors"
                        >
                            Back
                        </button>
                    </div>

                    {/* Result Content */}
                    <div className="p-6">
                        {result.content && (
                            <div className="max-w-3xl">
                                <p className="text-gray-300 text-sm leading-7">
                                    {result.content}
                                </p>
                            </div>
                        )}

                        {result.points && (
                            <div className="max-w-3xl space-y-3">
                                {result.points.map((point, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 bg-[#20242B] border border-[#30353E] rounded-xl p-4"
                                    >
                                        <div className="w-6 h-6 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-semibold text-primary">
                                                {index + 1}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-300 leading-6">
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 pt-5 border-t border-[#292D36]">
                            <button
                                type="button"
                                onClick={clearResult}
                                className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors"
                            >
                                Try Another Action
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
function DocumentFlashcards({ document }) {
    const [cards, setCards] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const generateFlashcards = () => {
        setIsGenerating(true);
        setIsFlipped(false);
        setCurrentIndex(0);

        setTimeout(() => {
            setCards([
                {
                    question: "What is the main purpose of this topic?",
                    answer:
                        "The main purpose is to understand the fundamental concepts and how they are applied in practice.",
                },
                {
                    question: "What are the key concepts to remember?",
                    answer:
                        "Focus on the important definitions, relationships between concepts, and the practical applications discussed in the material.",
                },
                {
                    question: "Why is this concept important?",
                    answer:
                        "It provides a foundation for understanding more advanced topics and helps connect theoretical ideas with practical problems.",
                },
                {
                    question: "What should you remember for an exam?",
                    answer:
                        "Remember the core definitions, important principles, differences between related concepts, and examples.",
                },
                {
                    question: "How can this topic be applied?",
                    answer:
                        "The concepts can be applied to solve problems, analyze situations, and understand real-world systems related to the subject.",
                },
            ]);

            setIsGenerating(false);
        }, 1000);
    };

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

    const resetCards = () => {
        setCards([]);
        setCurrentIndex(0);
        setIsFlipped(false);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <p className="text-primary text-sm font-semibold mb-2">
                    ACTIVE RECALL
                </p>

                <h2 className="text-2xl font-bold text-white">
                    Document Flashcards
                </h2>

                <p className="text-gray-500 mt-2">
                    Generate flashcards from your study material and test your
                    memory.
                </p>
            </div>

            {/* Initial State */}
            {cards.length === 0 && !isGenerating && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                        <BookOpen className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mt-5">
                        Generate Flashcards
                    </h3>

                    <p className="text-sm text-gray-500 max-w-md mx-auto mt-2 leading-6">
                        Create study flashcards based on this document. AI
                        generation will use the actual PDF content once the
                        backend is connected.
                    </p>

                    <button
                        type="button"
                        onClick={generateFlashcards}
                        className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors"
                    >
                        Generate Flashcards
                    </button>
                </div>
            )}

            {/* Loading */}
            {isGenerating && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl min-h-[500px] flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mt-5">
                        Generating Flashcards...
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        Preparing your study cards.
                    </p>

                    <div className="flex items-center gap-1.5 mt-5">
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                </div>
            )}

            {/* Flashcard Study View */}
            {cards.length > 0 && !isGenerating && (
                <div>
                    {/* Progress */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-500">
                            Card {currentIndex + 1} of {cards.length}
                        </p>

                        <button
                            type="button"
                            onClick={resetCards}
                            className="text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            Generate Again
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 bg-[#292D36] rounded-full overflow-hidden mb-6">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{
                                width: `${
                                    ((currentIndex + 1) / cards.length) * 100
                                }%`,
                            }}
                        />
                    </div>

                    {/* Card */}
                    <button
                        type="button"
                        onClick={() => setIsFlipped((prev) => !prev)}
                        className="w-full min-h-[360px] bg-[#20242B] border border-[#30353E] rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#292E36] hover:border-[#3A404A] transition-all"
                    >
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold">
                            {isFlipped ? "ANSWER" : "QUESTION"}
                        </p>

                        <div className="max-w-2xl mt-8">
                            <p className="text-2xl font-semibold text-white leading-relaxed">
                                {isFlipped
                                    ? cards[currentIndex].answer
                                    : cards[currentIndex].question}
                            </p>
                        </div>

                        <p className="text-sm text-gray-600 mt-10">
                            Click the card to{" "}
                            {isFlipped ? "see the question" : "reveal the answer"}
                        </p>
                    </button>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <button
                            type="button"
                            onClick={previousCard}
                            disabled={currentIndex === 0}
                            className="px-5 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            onClick={nextCard}
                            disabled={currentIndex === cards.length - 1}
                            className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Next Card
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
function DocumentQuiz({ document }) {
    const [questions, setQuestions] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const generateQuiz = () => {
        setIsGenerating(true);
        setSubmitted(false);
        setSelectedAnswers({});
        setCurrentQuestion(0);
        setScore(0);

        setTimeout(() => {
            setQuestions([
                {
                    id: 1,
                    question: "What is the main purpose of studying this topic?",
                    options: [
                        "Understanding fundamental concepts",
                        "Memorizing unrelated information",
                        "Avoiding practical applications",
                        "Learning only terminology",
                    ],
                    answer: 0,
                },
                {
                    id: 2,
                    question: "Which approach is generally most useful when learning a difficult concept?",
                    options: [
                        "Skip the concept",
                        "Understand it step-by-step",
                        "Memorize everything immediately",
                        "Ignore examples",
                    ],
                    answer: 1,
                },
                {
                    id: 3,
                    question: "What should you focus on when reviewing study material?",
                    options: [
                        "Only the title",
                        "Only the examples",
                        "Key concepts and relationships",
                        "Only the page numbers",
                    ],
                    answer: 2,
                },
                {
                    id: 4,
                    question: "Why are practice questions useful?",
                    options: [
                        "They test understanding and recall",
                        "They replace studying completely",
                        "They make notes unnecessary",
                        "They only test memorization",
                    ],
                    answer: 0,
                },
                {
                    id: 5,
                    question: "What is a good way to prepare for an exam?",
                    options: [
                        "Avoid reviewing difficult topics",
                        "Study everything once",
                        "Review important concepts and practice",
                        "Only read the introduction",
                    ],
                    answer: 2,
                },
            ]);

            setIsGenerating(false);
        }, 1000);
    };

    const selectAnswer = (optionIndex) => {
        if (submitted) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [currentQuestion]: optionIndex,
        }));
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const submitQuiz = () => {
        let calculatedScore = 0;

        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.answer) {
                calculatedScore += 1;
            }
        });

        setScore(calculatedScore);
        setSubmitted(true);
    };

    const resetQuiz = () => {
        setQuestions([]);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(0);
    };

    const current = questions[currentQuestion];

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <p className="text-primary text-sm font-semibold mb-2">
                    TEST YOUR KNOWLEDGE
                </p>

                <h2 className="text-2xl font-bold text-white">
                    Document Quiz
                </h2>

                <p className="text-gray-500 mt-2">
                    Test your understanding of this study material.
                </p>
            </div>

            {/* Initial State */}
            {questions.length === 0 && !isGenerating && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                        <Brain className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mt-5">
                        Generate Quiz
                    </h3>

                    <p className="text-sm text-gray-500 max-w-md mx-auto mt-2 leading-6">
                        Create a quiz based on this document. Questions will
                        use the actual PDF content once the AI backend is
                        connected.
                    </p>

                    <button
                        type="button"
                        onClick={generateQuiz}
                        className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors"
                    >
                        Generate Quiz
                    </button>
                </div>
            )}

            {/* Loading */}
            {isGenerating && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl min-h-[500px] flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                    </div>

                    <h3 className="text-lg font-semibold text-white mt-5">
                        Generating Quiz...
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                        Preparing questions from your study material.
                    </p>

                    <div className="flex items-center gap-1.5 mt-5">
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                </div>
            )}

            {/* Quiz */}
            {questions.length > 0 && !isGenerating && !submitted && (
                <div>
                    {/* Quiz Top Bar */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-500">
                            Question {currentQuestion + 1} of{" "}
                            {questions.length}
                        </p>

                        <button
                            type="button"
                            onClick={resetQuiz}
                            className="text-sm text-gray-500 hover:text-white transition-colors"
                        >
                            Restart
                        </button>
                    </div>

                    {/* Progress */}
                    <div className="h-1.5 bg-[#292D36] rounded-full overflow-hidden mb-6">
                        <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{
                                width: `${
                                    ((currentQuestion + 1) /
                                        questions.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>

                    {/* Question Card */}
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-8">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                                <span className="text-sm font-semibold text-primary">
                                    {currentQuestion + 1}
                                </span>
                            </div>

                            <h3 className="text-xl font-semibold text-white leading-8">
                                {current.question}
                            </h3>
                        </div>

                        {/* Options */}
                        <div className="mt-8 space-y-3">
                            {current.options.map((option, index) => {
                                const isSelected =
                                    selectedAnswers[currentQuestion] ===
                                    index;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => selectAnswer(index)}
                                        className={`w-full flex items-center gap-4 text-left p-4 rounded-xl border transition-all ${
                                            isSelected
                                                ? "bg-primary/10 border-primary/40 text-white"
                                                : "bg-[#20242B] border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:border-[#3A404A] hover:text-gray-200"
                                        }`}
                                    >
                                        <div
                                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                                                isSelected
                                                    ? "bg-primary border-primary text-white"
                                                    : "bg-[#181B21] border-[#30353E] text-gray-500"
                                            }`}
                                        >
                                            {String.fromCharCode(65 + index)}
                                        </div>

                                        <span className="text-sm font-medium">
                                            {option}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            type="button"
                            onClick={previousQuestion}
                            disabled={currentQuestion === 0}
                            className="px-5 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            Previous
                        </button>

                        {currentQuestion === questions.length - 1 ? (
                            <button
                                type="button"
                                onClick={submitQuiz}
                                disabled={
                                    selectedAnswers[currentQuestion] ===
                                    undefined
                                }
                                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Submit Quiz
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={nextQuestion}
                                disabled={
                                    selectedAnswers[currentQuestion] ===
                                    undefined
                                }
                                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Next Question
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Result */}
            {submitted && (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                    <div className="p-8 text-center border-b border-[#292D36]">
                        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
                            <Brain className="w-9 h-9 text-primary" />
                        </div>

                        <p className="text-sm text-gray-500 mt-5">
                            Your Score
                        </p>

                        <h3 className="text-5xl font-bold text-white mt-2">
                            {score}/{questions.length}
                        </h3>

                        <p className="text-primary font-medium mt-3">
                            {Math.round(
                                (score / questions.length) * 100
                            )}
                            %
                        </p>
                    </div>

                    {/* Question Review */}
                    <div className="p-6">
                        <h4 className="text-lg font-semibold text-white mb-4">
                            Review Answers
                        </h4>

                        <div className="space-y-3">
                            {questions.map((question, index) => {
                                const isCorrect =
                                    selectedAnswers[index] ===
                                    question.answer;

                                return (
                                    <div
                                        key={question.id}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-[#20242B] border border-[#30353E]"
                                    >
                                        <div
                                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                                isCorrect
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-red-500/10 text-red-400"
                                            }`}
                                        >
                                            {isCorrect ? "✓" : "×"}
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-200">
                                                {question.question}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Correct answer:{" "}
                                                {question.options[
                                                    question.answer
                                                ]}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                type="button"
                                onClick={generateQuiz}
                                className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors"
                            >
                                Retake Quiz
                            </button>

                            <button
                                type="button"
                                onClick={resetQuiz}
                                className="px-5 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:text-white transition-colors"
                            >
                                New Quiz
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}