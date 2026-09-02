import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

/**
 * @param {string} filePath
 * @returns {Promise<{text:string, numPages:number}>}
 */

export const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);
        // v2 API takes an options object, not a positional buffer
        const parser = new PDFParse({ data: new Uint8Array(dataBuffer) });
        const data = await parser.getText();
        await parser.destroy();

        return {
            text: data.text,
            // v2's result exposes page count as `total`, not `numPages`
            numPages: data.total,
            info: data.info,
        };
    } catch (error) {
        console.error("PDF parsing:", error);
        throw new Error("Failed to extract text from PDF");
    }
};