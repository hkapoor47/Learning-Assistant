import { useState } from "react";
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
        id: "actions",
        label: "AI Actions",
        icon: Sparkles,
    },
    {
        id: "flashcards",
        label: "Flashcards",
        icon: BookOpen,
    },
    {
        id: "quizzes",
        label: "Quizzes",
        icon: Brain,
    },
];

export default function DocumentDetailPage() {
    const [activeTab, setActiveTab] = useState("content");
    const [message, setMessage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(100);

    const totalPages = 13;

    const handlePreviousPage = () => {
        setCurrentPage((page) => Math.max(1, page - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((page) => Math.min(totalPages, page + 1));
    };

    const handleZoomOut = () => {
        setZoom((value) => Math.max(50, value - 10));
    };

    const handleZoomIn = () => {
        setZoom((value) => Math.min(150, value + 10));
    };

    const handleResetZoom = () => {
        setZoom(100);
    };

    return (
        <div className="max-w-7xl mx-auto">

            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="mb-6">

                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Documents
                </button>

                <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Machine Learning Notes
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            PDF Document · 2.4 MB · 13 pages
                        </p>
                    </div>

                </div>
            </div>


            {/* =====================================================
                WORKSPACE TABS
            ====================================================== */}
            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-2 mb-6">

                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">

                    {tabs.map(({ id, label, icon: Icon }) => (

                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                activeTab === id
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


            {/* =====================================================
                CONTENT TAB
            ====================================================== */}
            {activeTab === "content" && (

                <div className="bg-[#20242B] border border-[#30353E] rounded-2xl overflow-hidden">

                    {/* Viewer Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#30353E]">

                        <div>
                            <p className="text-sm font-medium text-white">
                                Document Viewer
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                Read your uploaded document
                            </p>
                        </div>

                    </div>


                    {/* PDF VIEWER */}
                    <div className="h-[650px] bg-[#15181E] flex items-center justify-center">

                        <div className="w-full h-full flex flex-col">


                            {/* PDF TOOLBAR */}
                            <div className="h-12 bg-[#292E36] border-b border-[#3A404A] flex items-center justify-center gap-3 text-sm">

                                {/* Previous Page */}
                                <button
                                    type="button"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="w-8 h-8 rounded-lg text-gray-400 hover:bg-[#343941] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Previous page"
                                >
                                    ‹
                                </button>


                                {/* Page Number */}
                                <span className="text-gray-400 min-w-[90px] text-center">
                                    Page {currentPage} / {totalPages}
                                </span>


                                {/* Zoom Out */}
                                <button
                                    type="button"
                                    onClick={handleZoomOut}
                                    disabled={zoom === 50}
                                    className="w-8 h-8 rounded-lg text-gray-400 hover:bg-[#343941] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Zoom out"
                                >
                                    −
                                </button>


                                {/* Zoom Percentage */}
                                <button
                                    type="button"
                                    onClick={handleResetZoom}
                                    className="px-2.5 h-8 rounded-lg text-gray-400 hover:bg-[#343941] hover:text-white transition-colors"
                                    title="Reset zoom"
                                >
                                    {zoom}%
                                </button>


                                {/* Zoom In */}
                                <button
                                    type="button"
                                    onClick={handleZoomIn}
                                    disabled={zoom === 150}
                                    className="w-8 h-8 rounded-lg text-gray-400 hover:bg-[#343941] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Zoom in"
                                >
                                    +
                                </button>


                                {/* Next Page */}
                                <button
                                    type="button"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="w-8 h-8 rounded-lg text-gray-400 hover:bg-[#343941] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    aria-label="Next page"
                                >
                                    ›
                                </button>

                            </div>


                            {/* PDF CONTENT */}
                            <div className="flex-1 flex items-center justify-center overflow-auto p-6">

                                <div
                                    className="w-full max-w-3xl min-h-[500px] bg-white shadow-2xl p-10 md:p-14 text-gray-900 transition-transform duration-200 origin-top"
                                    style={{
                                        transform: `scale(${zoom / 100})`,
                                    }}
                                >

                                    <h2 className="text-3xl font-bold mb-8">
                                        Machine Learning
                                    </h2>

                                    <h3 className="text-xl font-semibold mb-4">
                                        Introduction to Machine Learning
                                    </h3>

                                    <p className="text-sm leading-7">
                                        Machine learning is a branch of artificial
                                        intelligence that enables computers to learn
                                        patterns from data and make predictions or
                                        decisions without being explicitly programmed
                                        for every task.
                                    </p>

                                    <p className="text-sm leading-7 mt-5">
                                        Machine learning algorithms can be trained
                                        using different approaches including
                                        supervised learning, unsupervised learning
                                        and reinforcement learning.
                                    </p>

                                    <h3 className="text-xl font-semibold mt-10 mb-4">
                                        Types of Machine Learning
                                    </h3>

                                    <p className="text-sm leading-7">
                                        The major types of machine learning include
                                        supervised learning, unsupervised learning,
                                        and reinforcement learning. Each approach
                                        is used for different kinds of learning tasks.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}


            {/* =====================================================
                CHAT TAB
            ====================================================== */}
            {activeTab === "chat" && (

                <div className="bg-[#20242B] border border-[#30353E] rounded-2xl overflow-hidden">

                    {/* Chat Header */}
                    <div className="px-6 py-5 border-b border-[#30353E]">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Ask about this document
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    Your AI assistant can answer questions from this PDF.
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Chat Body */}
                    <div className="min-h-[500px] flex flex-col">

                        <div className="flex-1 p-6 space-y-5">

                            <div className="flex gap-3">

                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>

                                <div className="bg-[#181B21] border border-[#30353E] rounded-2xl rounded-tl-md px-4 py-3 max-w-2xl">

                                    <p className="text-sm text-gray-300 leading-6">
                                        Hi! I can answer questions about this
                                        document. Ask me about any concept,
                                        definition, or topic from your PDF.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Chat Input */}
                        <div className="p-5 border-t border-[#30353E]">

                            <div className="flex items-center gap-3 bg-[#181B21] border border-[#30353E] rounded-xl p-2">

                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Ask something about this document..."
                                    className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 outline-none"
                                />

                                <button
                                    type="button"
                                    className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-purple-500 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}


            {/* =====================================================
                AI ACTIONS TAB
            ====================================================== */}
            {activeTab === "actions" && (

                <div className="bg-[#20242B] border border-[#30353E] rounded-2xl overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-5 border-b border-[#30353E]">

                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <WandSparkles className="w-5 h-5 text-primary" />
                            </div>

                            <div>

                                <h2 className="font-semibold text-white">
                                    AI Actions
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    Generate useful study material from this document.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Actions */}
                    <div className="p-6 space-y-5">


                        {/* Generate Summary */}
                        <div className="bg-[#181B21] border border-[#30353E] rounded-2xl p-5 hover:bg-[#292E36] hover:border-[#3A404A] transition-all">

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex gap-4">

                                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <BookOpen className="w-5 h-5 text-blue-400" />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-white">
                                            Generate Summary
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Get a concise summary of the entire document.
                                        </p>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                                >
                                    Generate
                                </button>

                            </div>

                        </div>


                        {/* Explain Topic */}
                        <div className="bg-[#181B21] border border-[#30353E] rounded-2xl p-5 hover:bg-[#292E36] hover:border-[#3A404A] transition-all">

                            <div className="flex gap-4">

                                <div className="w-11 h-11 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                                </div>

                                <div className="flex-1">

                                    <h3 className="font-semibold text-white">
                                        Explain a Concept
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Enter a topic from the document to get a
                                        detailed explanation.
                                    </p>


                                    <div className="flex gap-3 mt-4">

                                        <input
                                            type="text"
                                            placeholder="e.g. Supervised Learning"
                                            className="flex-1 bg-[#20242B] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-primary/50"
                                        />

                                        <button
                                            type="button"
                                            className="px-5 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                                        >
                                            Explain
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Key Points */}
                        <div className="bg-[#181B21] border border-[#30353E] rounded-2xl p-5 hover:bg-[#292E36] hover:border-[#3A404A] transition-all">

                            <div className="flex items-center gap-4">

                                <div className="w-11 h-11 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-5 h-5 text-green-400" />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">
                                        Key Points
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Extract the most important points from this PDF.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}


            {/* =====================================================
                FLASHCARDS TAB
            ====================================================== */}
            {activeTab === "flashcards" && (

                <div className="bg-[#20242B] border border-[#30353E] rounded-2xl p-8 text-center">

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">

                        <BookOpen className="w-7 h-7 text-primary" />

                    </div>

                    <h2 className="text-xl font-semibold text-white mt-5">
                        Generate Flashcards
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                        Create AI-powered flashcards specifically from this document.
                    </p>

                    <button
                        type="button"
                        className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                    >
                        Generate Flashcards
                    </button>

                </div>
            )}


            {/* =====================================================
                QUIZ TAB
            ====================================================== */}
            {activeTab === "quizzes" && (

                <div className="bg-[#20242B] border border-[#30353E] rounded-2xl p-8 text-center">

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">

                        <Brain className="w-7 h-7 text-primary" />

                    </div>

                    <h2 className="text-xl font-semibold text-white mt-5">
                        Generate Quiz
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                        Generate an AI quiz based only on the content of this PDF.
                    </p>

                    <button
                        type="button"
                        className="mt-6 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                    >
                        Generate Quiz
                    </button>

                </div>
            )}

        </div>
    );
}