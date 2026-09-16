import { useState } from "react";
import {
    ArrowLeft,
    FileText,
    Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import YouTubeUrlForm from "../../components/youtube/YouTubeUrlForm";
import YouTubeStudyMaterial from "../../components/youtube/YouTubeStudyMaterial";

export default function YouTubeLearningPage() {
    const navigate = useNavigate();

    const [videoUrl, setVideoUrl] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const handleGenerate = async (url) => {
        setVideoUrl(url);
        setIsGenerating(true);
        setHasGenerated(false);

        await new Promise((resolve) =>
            setTimeout(resolve, 1000)
        );

        setHasGenerated(true);
        setIsGenerating(false);
    };

    const handleDownloadPdf = () => {
        alert(
            "PDF generation will be connected after the YouTube transcript and AI backend are implemented."
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-200 transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            <div className="mb-8">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Video className="w-7 h-7 text-primary" />
                    </div>

                    <div>
                        <p className="text-primary text-sm font-semibold mb-2">
                            LEARN FROM YOUTUBE
                        </p>

                        <h1 className="text-3xl font-bold text-white">
                            YouTube Learning
                        </h1>

                        <p className="text-gray-500 mt-2 max-w-2xl leading-6">
                            Turn educational YouTube videos into concise
                            study material that you can read, revise, and
                            download as a PDF.
                        </p>
                    </div>
                </div>
            </div>

            <YouTubeUrlForm
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
            />

            {!hasGenerated && !isGenerating && (
                <div className="mt-8 bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                        <FileText className="w-8 h-8 text-primary" />
                    </div>

                    <h2 className="text-xl font-semibold text-white mt-5">
                        Create Your Study Material
                    </h2>

                    <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2 leading-6">
                        Paste an educational YouTube link above. The AI will
                        eventually turn the video's transcript into structured
                        study notes and a downloadable PDF.
                    </p>
                </div>
            )}

            {isGenerating && (
                <div className="mt-8 bg-[#181B21] border border-[#292D36] rounded-2xl p-10 text-center">
                    <div className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto" />

                    <h2 className="text-lg font-semibold text-white mt-5">
                        Preparing your study material...
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        The real transcript and AI processing will be connected
                        in the backend stage.
                    </p>
                </div>
            )}

            {hasGenerated && (
                <YouTubeStudyMaterial
                    videoUrl={videoUrl}
                    onDownloadPdf={handleDownloadPdf}
                />
            )}
        </div>
    );
}