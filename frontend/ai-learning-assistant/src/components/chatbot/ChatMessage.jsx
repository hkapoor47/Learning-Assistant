export default function ChatMessage({ role, content }) {
    const isUser = role === "user";

    return (
        <div
            className={`flex ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    isUser
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-[#292E36] text-gray-200 rounded-bl-md"
                }`}
            >
                {content}
            </div>
        </div>
    );
}