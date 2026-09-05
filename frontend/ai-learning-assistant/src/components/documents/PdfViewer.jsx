import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PdfViewer({ file }) {
    const [numPages, setNumPages] = useState(0);
    const [pageWidth, setPageWidth] = useState(700);

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
        <div className="h-full overflow-y-auto bg-[#15181E] p-4 md:p-6">
            <Document
                file={file}
                onLoadSuccess={({ numPages }) => {
                    setNumPages(numPages);
                }}
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