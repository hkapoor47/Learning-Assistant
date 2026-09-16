import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export async function extractPdfText(file) {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjs.getDocument({
        data: arrayBuffer,
    }).promise;

    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const content = await page.getTextContent();

        const pageText = content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");

        pages.push(`--- Page ${pageNumber} ---\n${pageText}`);
    }

    return pages.join("\n\n").trim();
}