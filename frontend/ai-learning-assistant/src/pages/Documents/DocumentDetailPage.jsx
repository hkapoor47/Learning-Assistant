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
function findRelevantDocumentText(documentText, question) {
    if (!documentText?.trim()) {
        return null;
    }

    const cleanText = documentText
        .replace(/\s+/g, " ")
        .trim();

    const words = question
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 2);

    if (words.length === 0) {
        return cleanText.slice(0, 1200);
    }

    const sentences = cleanText
        .split(/(?<=[.!?])\s+/)
        .filter(Boolean);

    const scoredSentences = sentences
        .map((sentence) => {
            const lowerSentence = sentence.toLowerCase();

            const score = words.reduce((total, word) => {
                return total + (lowerSentence.includes(word) ? 1 : 0);
            }, 0);

            return {
                sentence,
                score,
            };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

    if (scoredSentences.length === 0) {
        return null;
    }

    return scoredSentences
        .slice(0, 4)
        .map((item) => item.sentence)
        .join(" ");
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

   const handleSendMessage = async (text = message) => {
    const trimmedText = text.trim();

    if (!trimmedText || isTyping) {
        return;
    }

    setMessage("");

    setMessages((prev) => [
        ...prev,
        {
            id: Date.now(),
            role: "user",
            content: trimmedText,
        },
    ]);

    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const relevantText = findRelevantDocumentText(
        document.text,
        trimmedText
    );

    let assistantResponse;

    if (!document.text?.trim()) {
        assistantResponse =
            "I don't have extracted text from this document yet. Please upload the PDF again so I can read its content.";
    } else if (!relevantText) {
        assistantResponse =
            "I couldn't find a relevant section in this document for that question. Try asking about a specific topic, concept, or keyword from the PDF.";
    } else {
        assistantResponse =
            `I found this relevant information in the document:\n\n${relevantText}`;
    }

    setMessages((prev) => [
        ...prev,
        {
            id: Date.now() + 1,
            role: "assistant",
            content: assistantResponse,
        },
    ]);

    setIsTyping(false);
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

    const handleAction = async (action) => {
    if (isGenerating) {
        return;
    }

    setActiveAction(action);
    setIsGenerating(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!document.text?.trim()) {
        setResult({
            title: "Document content unavailable",
            content:
                "I don't have extracted text from this document yet. Please upload the PDF again so I can read its content.",
        });

        setIsGenerating(false);
        return;
    }

    const documentText = document.text
        .replace(/\s+/g, " ")
        .trim();

    let resultTitle;
    let resultContent;

    if (action === "summary") {
        resultTitle = "Document Summary";

        resultContent =
            `This document contains approximately ${documentText.length.toLocaleString()} characters of extracted content.\n\n` +
            `The beginning of the document covers:\n\n${documentText.slice(
                0,
                1800
            )}`;
    }

    if (action === "explain") {
        resultTitle = "Document Explanation";

        resultContent =
            `Here is the relevant beginning of the document explained in a simple way:\n\n${documentText.slice(
                0,
                1800
            )}`;
    }

    if (action === "key-points") {
        resultTitle = "Key Points";

        const sentences = documentText
            .split(/(?<=[.!?])\s+/)
            .filter((sentence) => sentence.trim().length > 30);

        const keyPoints = sentences
            .slice(0, 8)
            .map((sentence) => `• ${sentence.trim()}`)
            .join("\n\n");

        resultContent =
            keyPoints ||
            documentText.slice(0, 1800);
    }

    setResult({
        title: resultTitle,
        content: resultContent,
    });

    setIsGenerating(false);
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

   const generateFlashcards = async () => {
    if (isGenerating) {
        return;
    }

    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!document.text?.trim()) {
        setCards([
            {
                id: 1,
                question: "Document content unavailable",
                answer:
                    "Please upload the PDF again so its text can be extracted before generating flashcards.",
            },
        ]);

        setCurrentIndex(0);
        setIsFlipped(false);
        setIsGenerating(false);
        return;
    }

    const documentText = document.text
        .replace(/\s+/g, " ")
        .trim();

    const sentences = documentText
        .split(/(?<=[.!?])\s+/)
        .filter((sentence) => sentence.trim().length > 40);

    const generatedCards = sentences
        .slice(0, 5)
        .map((sentence, index) => ({
            id: Date.now() + index,
            question: `What does the document explain about this concept?`,
            answer: sentence.trim(),
        }));

    if (generatedCards.length === 0) {
        setCards([
            {
                id: 1,
                question: "What is covered in this document?",
                answer: documentText.slice(0, 1200),
            },
        ]);
    } else {
        setCards(generatedCards);
    }

    setCurrentIndex(0);
    setIsFlipped(false);
    setIsGenerating(false);
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

    const generateQuiz = async () => {
    if (isGenerating) {
        return;
    }

    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!document.text?.trim()) {
        setQuestions([]);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setSubmitted(false);
        setScore(0);
        setIsGenerating(false);
        return;
    }

    const documentText = document.text
        .replace(/\s+/g, " ")
        .trim();

    const sentences = documentText
        .split(/(?<=[.!?])\s+/)
        .filter((sentence) => sentence.trim().length > 50);

    const generatedQuestions = sentences
        .slice(0, 5)
        .map((sentence, index) => {
            const words = sentence.trim().split(/\s+/);

            const correctAnswer =
                words.length > 12
                    ? words.slice(0, 12).join(" ") + "..."
                    : sentence.trim();

            return {
                id: Date.now() + index,
                question: `Which statement is supported by the document?`,
                options: [
                    correctAnswer,
                    "This information is not discussed in the document.",
                    "The document presents a different concept.",
                    "The document does not provide this information.",
                ],
                answer: 0,
            };
        });

    setQuestions(generatedQuestions);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setIsGenerating(false);
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