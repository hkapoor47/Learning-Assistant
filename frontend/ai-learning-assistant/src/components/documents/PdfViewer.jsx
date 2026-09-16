import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Volume2, Pause, Play, Square } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PdfViewer({ file }) {
    const [numPages, setNumPages] = useState(0);
    const [pageWidth, setPageWidth] = useState(700);

    const [pdfText, setPdfText] = useState("");
    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            const availableWidth = window.innerWidth * 0.55;

            setPageWidth(
                Math.min(
                    Math.max(availableWidth, 420),
                    850
                )
            );
        };

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleDocumentLoad = async (pdf) => {
        setNumPages(pdf.numPages);

        try {
            let fullText = "";

            for (
                let pageNumber = 1;
                pageNumber <= pdf.numPages;
                pageNumber++
            ) {
                const page = await pdf.getPage(pageNumber);
                const textContent = await page.getTextContent();

                const pageText = textContent.items
                    .map((item) => item.str)
                    .join(" ");

                fullText += pageText + "\n\n";
            }

            setPdfText(fullText.trim());
        } catch (error) {
            console.error("PDF text extraction failed:", error);
            setPdfText("");
        }
    };

    const startReading = () => {
        if (!pdfText) {
            alert(
                "No readable text was found in this PDF. Scanned or handwritten PDFs need OCR."
            );
            return;
        }

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(pdfText);

        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onstart = () => {
            setIsReading(true);
            setIsPaused(false);
        };

        speech.onend = () => {
            setIsReading(false);
            setIsPaused(false);
        };

        speech.onerror = () => {
            setIsReading(false);
            setIsPaused(false);
        };

        window.speechSynthesis.speak(speech);
    };

    const togglePause = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        } else {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const stopReading = () => {
        window.speechSynthesis.cancel();
        setIsReading(false);
        setIsPaused(false);
    };

    if (!file) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 font-medium">
                        No PDF selected
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                        Upload a PDF to view it here.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full overflow-y-auto bg-[#15181E] p-4 md:p-6">

            {/* Small Read Aloud Controls */}
            <div className="sticky top-2 z-30 h-0 flex justify-end pointer-events-none">
                <div className="flex flex-col gap-2 pointer-events-auto">

                    {!isReading && !isPaused && (
                        <button
    type="button"
    onClick={startReading}
    title="Read Aloud"
    className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-black/30 hover:bg-purple-500 transition-all cursor-pointer"
>
                            <Volume2 className="w-5 h-5" />
                        </button>
                    )}

                    {(isReading || isPaused) && (
                        <>
                            <button
                                type="button"
                                onClick={togglePause}
                                title={isPaused ? "Resume" : "Pause"}
                                className="w-10 h-10 rounded-lg bg-[#20242B] border border-[#3A404A] text-gray-200 flex items-center justify-center shadow-lg hover:bg-[#292E36] transition-all"
                            >
                                {isPaused ? (
                                    <Play className="w-4 h-4" />
                                ) : (
                                    <Pause className="w-4 h-4" />
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={stopReading}
                                title="Stop"
                                className="w-10 h-10 rounded-lg bg-[#20242B] border border-[#3A404A] text-gray-300 flex items-center justify-center shadow-lg hover:bg-[#292E36] transition-all"
                            >
                                <Square className="w-4 h-4" />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <Document
                file={file}
                onLoadSuccess={handleDocumentLoad}
                loading={
                    <div className="flex items-center justify-center py-24">
                        <p className="text-sm text-gray-500">
                            Loading PDF...
                        </p>
                    </div>
                }
                error={
                    <div className="flex items-center justify-center py-24">
                        <div className="text-center">
                            <p className="text-red-400 font-medium">
                                Unable to load this PDF
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                                Please try uploading the file again.
                            </p>
                        </div>
                    </div>
                }
            >
                <div className="flex flex-col items-center gap-6">
                    {Array.from(
                        { length: numPages },
                        (_, index) => (
                            <div
                                key={`page_${index + 1}`}
                                className="bg-white shadow-2xl"
                            >
                                <Page
                                    pageNumber={index + 1}
                                    width={pageWidth}
                                    renderTextLayer
                                    renderAnnotationLayer
                                />
                            </div>
                        )
                    )}
                </div>
            </Document>
        </div>
    );
}