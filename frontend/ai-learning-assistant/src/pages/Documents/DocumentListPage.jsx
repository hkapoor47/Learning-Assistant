import { useMemo, useState } from "react";
import { Search, FileText } from "lucide-react";

import DocumentCard from "../../components/documents/DocumentCard";
import UploadDocumentModal from "../../components/documents/UploadDocumentModal";
import { useDocuments } from "../../context/DocumentContext";

export default function DocumentListPage() {
    const { documents } = useDocuments();
    const [search, setSearch] = useState("");

    const filteredDocuments = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return documents;
        }

        return documents.filter((document) =>
            document.name.toLowerCase().includes(query)
        );
    }, [documents, search]);

    return (
        <div className="max-w-7xl mx-auto">

          
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <p className="text-primary text-sm font-semibold mb-2">
                        YOUR STUDY MATERIAL
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Documents
                    </h1>

                    {/* <p className="text-gray-500 mt-2">
                        Open your study materials and start learning.
                    </p> */}
                </div>

                <UploadDocumentModal />
            </div>

           
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search documents..."
                    className="w-full bg-[#181B21] border border-[#292D36] text-gray-200 placeholder:text-gray-600 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />
            </div>

            
            <div className="flex items-center gap-2 mb-5">
                <FileText className="w-5 h-5 text-primary" />

                <p className="text-sm font-medium text-gray-400">
                    {filteredDocuments.length}{" "}
                    {filteredDocuments.length === 1
                        ? "Document"
                        : "Documents"}
                </p>
            </div>

           
            {filteredDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDocuments.map((document) => (
                        <DocumentCard
                            key={document.id}
                            id={document.id}
                            name={document.name}
                            size={document.size}
                            date={document.date}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-12 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                        <FileText className="w-7 h-7 text-primary" />
                    </div>

                    <h2 className="text-lg font-semibold text-white mt-5">
                        No documents found
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        {search
                            ? "Try a different search term."
                            : "Upload your first PDF to get started."}
                    </p>
                </div>
            )}
        </div>
    );
}