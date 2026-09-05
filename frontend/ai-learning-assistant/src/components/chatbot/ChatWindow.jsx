import { useEffect, useRef, useState } from "react";
import {
    Bot,
    MessageCircle,
    X,
} from "lucide-react";

import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

export default function ChatWindow() {
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "assistant",
            content:
                "Hi! I'm your personal AI learning assistant. Ask me anything about your studies, concepts, or learning plan.",
        },
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    const handleSend = async (message) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                role: "user",
                content: message,
            },
        ]);

        setIsTyping(true);

        await new Promise((resolve) =>
            setTimeout(resolve, 800)
        );

        setMessages((prev) => [
            ...prev,
            {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    "I'm currently running in frontend demo mode. Once we connect the backend and AI service, I'll be able to give you real answers and help you study.",
            },
        ]);

        setIsTyping(false);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] h-[520px] bg-[#181B21] border border-[#30353E] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="h-16 shrink-0 px-4 flex items-center justify-between border-b border-[#292D36] bg-[#13151A]">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Personal AI
                                </p>
                                <p className="text-xs text-gray-500">
                                    Your learning assistant
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#292E36] transition-colors"
                            aria-label="Close chatbot"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                role={message.role}
                                content={message.content}
                            />
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-[#292E36] rounded-2xl rounded-bl-md px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <ChatInput
                        onSend={handleSend}
                        disabled={isTyping}
                    />
                </div>
            )}

            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-purple-500/20 hover:bg-purple-500 hover:scale-105 transition-all duration-200"
                    aria-label="Open Personal AI"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}
        </>
    );
}