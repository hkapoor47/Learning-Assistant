import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
    Volume2,
    Pause,
    Play,
    Square,
    LoaderCircle,
} from "lucide-react";
import { createWorker } from "tesseract.js";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PdfViewer({ file }) {
    const [numPages, setNumPages] = useState(0);
    const [pageWidth, setPageWidth] = useState(700);

    const [pdfDocument, setPdfDocument] = useState(null);
    const [pdfText, setPdfText] = useState("");

    const [isReading, setIsReading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const [isOCRRunning, setIsOCRRunning] = useState(false);
    const [ocrProgress, setOcrProgress] = useState(0);

    const speechChunksRef = useRef([]);
    const speechIndexRef = useRef(0);

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

    // Reset everything when another PDF is opened
    useEffect(() => {
        window.speechSynthesis.cancel();

        setPdfDocument(null);
        setNumPages(0);
        setPdfText("");

        setIsReading(false);
        setIsPaused(false);

        setIsOCRRunning(false);
        setOcrProgress(0);

        speechChunksRef.current = [];
        speechIndexRef.current = 0;
    }, [file]);

    // Stop speech when leaving the PDF page
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // Load PDF
    const handleDocumentLoad = async (pdf) => {
        setPdfDocument(pdf);
        setNumPages(pdf.numPages);

        // First try normal PDF text extraction.
        // This works for normal typed PDFs.
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

    // Split large text into smaller chunks.
    // This makes browser speech much more reliable for long PDFs.
    const splitTextIntoChunks = (text) => {
        const cleanText = text
            .replace(/\s+/g, " ")
            .trim();

        if (!cleanText) {
            return [];
        }

        const sentences = cleanText.match(
            /[^.!?]+[.!?]+|[^.!?]+$/g
        ) || [];

        const chunks = [];
        let currentChunk = "";

        sentences.forEach((sentence) => {
            const trimmedSentence = sentence.trim();

            if (!trimmedSentence) {
                return;
            }

            if (
                (currentChunk + " " + trimmedSentence).length <= 220
            ) {
                currentChunk +=
                    (currentChunk ? " " : "") +
                    trimmedSentence;
            } else {
                if (currentChunk) {
                    chunks.push(currentChunk);
                }

                currentChunk = trimmedSentence;
            }
        });

        if (currentChunk) {
            chunks.push(currentChunk);
        }

        return chunks;
    };

    // Speak the next chunk
    const speakNextChunk = () => {
        const chunks = speechChunksRef.current;
        const index = speechIndexRef.current;

        if (!chunks.length || index >= chunks.length) {
            setIsReading(false);
            setIsPaused(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(
            chunks[index]
        );

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => {
            setIsReading(true);
            setIsPaused(false);
        };

        utterance.onend = () => {
            speechIndexRef.current += 1;

            if (!window.speechSynthesis.paused) {
                speakNextChunk();
            }
        };

        utterance.onerror = (event) => {
            if (event.error === "canceled") {
                return;
            }

            console.error("Speech error:", event);

            setIsReading(false);
            setIsPaused(false);
        };

        window.speechSynthesis.speak(utterance);
    };

    // Start speaking text
    const startSpeech = (text) => {
        const chunks = splitTextIntoChunks(text);

        if (!chunks.length) {
            alert("No readable text was found in this PDF.");
            return;
        }

        window.speechSynthesis.cancel();

        speechChunksRef.current = chunks;
        speechIndexRef.current = 0;

        setIsReading(true);
        setIsPaused(false);

        speakNextChunk();
    };

    // OCR scanned/handwritten PDF
    const runOCR = async () => {
        if (!pdfDocument) {
            return;
        }

        setIsOCRRunning(true);
        setOcrProgress(0);

        let worker = null;

        try {
            worker = await createWorker("eng");

            let extractedText = "";

            for (
                let pageNumber = 1;
                pageNumber <= pdfDocument.numPages;
                pageNumber++
            ) {
                const page = await pdfDocument.getPage(pageNumber);

                const viewport = page.getViewport({
                    scale: 2,
                });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: context,
                    viewport,
                }).promise;

                // Improve image before OCR
const imageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
);

const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Convert to grayscale
    const gray =
        0.299 * r +
        0.587 * g +
        0.114 * b;

    // Increase contrast
    const value = gray > 180 ? 255 : 0;

    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
}

context.putImageData(imageData, 0, 0);

const image = canvas.toDataURL("image/png");

const result = await worker.recognize(image, {
    tessedit_pageseg_mode: "6",
});

const pageText = result.data.text
    ?.replace(/\s+/g, " ")
    .trim() || "";

                if (pageText) {
                    extractedText +=
                        `Page ${pageNumber}. ${pageText}\n\n`;
                }

                const progress =
                    Math.round(
                        (pageNumber / pdfDocument.numPages) * 100
                    );

                setOcrProgress(progress);
            }

            const finalText = extractedText.trim();

            setPdfText(finalText);

            if (!finalText) {
                alert(
                    "OCR could not detect readable text in this PDF."
                );
                return;
            }

            // Start reading automatically after OCR
            startSpeech(finalText);
        } catch (error) {
            console.error("OCR failed:", error);

            alert(
                "Unable to read this PDF. Please try again."
            );
        } finally {
            if (worker) {
                await worker.terminate();
            }

            setIsOCRRunning(false);
            setOcrProgress(0);
        }
    };

    const handleReadAloud = () => {
        // If OCR is already running, do nothing
        if (isOCRRunning) {
            return;
        }

        // Normal typed PDF
        if (pdfText.trim()) {
            startSpeech(pdfText);
            return;
        }

        // Scanned / handwritten PDF
        runOCR();
    };

    const togglePause = () => {
        if (!window.speechSynthesis.speaking) {
            return;
        }

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

        speechChunksRef.current = [];
        speechIndexRef.current = 0;
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

            {/* Read Aloud Controls */}
            <div className="sticky top-2 z-30 h-0 flex justify-end pointer-events-none">
                <div className="flex flex-col gap-2 pointer-events-auto">

                    {!isReading &&
                        !isPaused &&
                        !isOCRRunning && (
                            <button
                                type="button"
                                onClick={handleReadAloud}
                                title="Read Aloud"
                                className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-lg shadow-black/30 hover:bg-purple-500 transition-all cursor-pointer"
                            >
                                <Volume2 className="w-5 h-5" />
                            </button>
                        )}

                    {isOCRRunning && (
                        <div
                            title={`Reading PDF... ${ocrProgress}%`}
                            className="w-10 h-10 rounded-lg bg-[#20242B] border border-[#3A404A] text-primary flex items-center justify-center shadow-lg"
                        >
                            <LoaderCircle className="w-5 h-5 animate-spin" />
                        </div>
                    )}

                    {(isReading || isPaused) && !isOCRRunning && (
                        <>
                            <button
                                type="button"
                                onClick={togglePause}
                                title={
                                    isPaused
                                        ? "Resume"
                                        : "Pause"
                                }
                                className="w-10 h-10 rounded-lg bg-[#20242B] border border-[#3A404A] text-gray-200 flex items-center justify-center shadow-lg hover:bg-[#292E36] transition-all cursor-pointer"
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
                                className="w-10 h-10 rounded-lg bg-[#20242B] border border-[#3A404A] text-gray-300 flex items-center justify-center shadow-lg hover:bg-[#292E36] transition-all cursor-pointer"
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