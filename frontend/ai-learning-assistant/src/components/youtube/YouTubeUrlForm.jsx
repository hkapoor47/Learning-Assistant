import { Link2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function YouTubeUrlForm({ onGenerate, isGenerating }) {
    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            return;
        }

        onGenerate(trimmedUrl);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6"
        >
            <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Link2 className="w-5 h-5 text-primary" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Add a YouTube Video
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Paste a YouTube link and turn its content into study
                        material.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-3">
                <input
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 bg-[#20242B] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-gray-200 placeholder:text-gray-600 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />

                <button
                    type="submit"
                    disabled={!url.trim() || isGenerating}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <Sparkles className="w-4 h-4" />

                    {isGenerating
                        ? "Preparing..."
                        : "Generate Study Material"}
                </button>
            </div>

            <p className="text-xs text-gray-600 mt-3">
                YouTube videos need an available transcript or captions for
                processing.
            </p>
        </form>
    );
}