import { useRef, useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useDocuments } from "../../context/DocumentContext";

export default function UploadDocumentModal() {
    const { addDocument } = useDocuments();

    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);

    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        if (selectedFile.type !== "application/pdf") {
            alert("Please select a PDF file.");
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = () => {
        if (!file) return;

        addDocument(file);

        setFile(null);
        setIsOpen(false);

        // Reset the input so the same file can be selected again later.
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <>
            {/* Upload Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/10"
            >
                <Upload className="w-4 h-4" />
                Upload Document
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={closeModal}
                    />

                    {/* Modal */}
                    <div className="relative w-full max-w-lg bg-[#181B21] border border-[#292D36] rounded-2xl shadow-2xl p-6">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    Upload Document
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Upload a PDF to start learning with AI.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-[#292E36] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* File Picker */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-[#292D36] rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all"
                        >
                            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Upload className="w-6 h-6 text-primary" />
                            </div>

                            <p className="mt-4 font-medium text-gray-200">
                                Click to choose a PDF
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                                PDF files only
                            </p>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/pdf,.pdf"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* Selected File */}
                        {file && (
                            <div className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-[#1D2129] border border-[#292D36]">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-200 truncate">
                                        {file.name}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>

                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-4 py-2.5 rounded-xl border border-[#292D36] text-gray-400 font-medium hover:bg-[#292E36] hover:text-white transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleUpload}
                                disabled={!file}
                                className="px-5 py-2.5 rounded-xl bg-primary text-white font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-purple-500 transition-colors"
                            >
                                Upload
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}