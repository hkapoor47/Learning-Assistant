import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PdfViewer({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageWidth, setPageWidth] = useState(700);

    useEffect(() => {
        const updateWidth = () => {
            const width = Math.min(window.innerWidth * 0.55, 800);
            setPageWidth(Math.max(width, 500));
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("resize", updateWidth);
        };
    }, []);

    if (!file) {
        return (
            <div className="h-full flex items-center justify-center text-gray-500">
                No PDF selected.
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-[#15181E] p-6">
            <Document
                file={file}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                    <div className="flex justify-center py-20 text-gray-500">
                        Loading PDF...
                    </div>
                }
                error={
                    <div className="flex justify-center py-20 text-red-400">
                        Unable to load this PDF.
                    </div>
                }
            >
                <div className="flex flex-col items-center gap-6">
                    {Array.from(new Array(numPages || 0), (_, index) => (
                        <div
                            key={`page_${index + 1}`}
                            className="shadow-2xl"
                        >
                            <Page
                                pageNumber={index + 1}
                                width={pageWidth}
                                renderTextLayer
                                renderAnnotationLayer
                            />
                        </div>
                    ))}
                </div>
            </Document>
        </div>
    );
}