import {
    BookOpen,
    CheckCircle2,
    Download,
    FileText,
    Lightbulb,
    ListChecks,
    Sparkles,
} from "lucide-react";

export default function YouTubeStudyMaterial({
    videoUrl,
    onDownloadPdf,
}) {
    return (
        <div className="mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div>
                    <p className="text-primary text-sm font-semibold mb-2">
                        AI GENERATED MATERIAL
                    </p>

                    <h2 className="text-2xl font-bold text-white">
                        Study Material
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Your YouTube content can be transformed into
                        structured study material.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onDownloadPdf}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Download Study PDF
                </button>
            </div>

            <div className="bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-[#292D36]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-200">
                                YouTube Study Notes
                            </p>

                            <p className="text-xs text-gray-600 truncate mt-1">
                                {videoUrl}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    <section>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-white">
                                Summary
                            </h3>
                        </div>

                        <p className="text-sm text-gray-400 leading-7 mt-3">
                            Once the YouTube transcript is processed, the AI
                            will generate a concise summary of the important
                            ideas covered in the video.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-2">
                            <ListChecks className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-white">
                                Key Points
                            </h3>
                        </div>

                        <div className="mt-4 space-y-3">
                            {[
                                "Main concepts explained in the video",
                                "Important facts and ideas to remember",
                                "Relevant examples and explanations",
                                "Exam-focused information",
                            ].map((point) => (
                                <div
                                    key={point}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-400">
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-white">
                                Study Notes
                            </h3>
                        </div>

                        <div className="mt-4 bg-[#20242B] border border-[#30353E] rounded-xl p-5">
                            <p className="text-sm text-gray-400 leading-7">
                                Detailed structured notes will appear here
                                after the video transcript is processed.
                                These notes will be designed for studying
                                without needing to watch the entire video.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-white">
                                Important Concepts
                            </h3>
                        </div>

                        <p className="text-sm text-gray-500 mt-3">
                            AI will identify the concepts that are most useful
                            for revision and learning.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}