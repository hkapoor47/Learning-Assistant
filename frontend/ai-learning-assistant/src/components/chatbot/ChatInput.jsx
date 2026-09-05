import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend, disabled = false }) {
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || disabled) {
            return;
        }

        onSend(trimmedMessage);
        setMessage("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 p-3 border-t border-[#292D36] bg-[#181B21]"
        >
            <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                rows={1}
                disabled={disabled}
                className="flex-1 resize-none bg-[#20242B] border border-[#30353E] rounded-xl px-3 py-2.5 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
            />

            <button
                type="submit"
                disabled={!message.trim() || disabled}
                className="w-10 h-10 shrink-0 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-purple-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send message"
            >
                <Send className="w-4 h-4" />
            </button>
        </form>
    );
}
