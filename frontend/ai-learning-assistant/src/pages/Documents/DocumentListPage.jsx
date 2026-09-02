import { Search, FileText } from "lucide-react";
import DocumentCard from "../../components/documents/DocumentCard";
import UploadDocumentModal from "../../components/documents/UploadDocumentModal";

const documents = [
    {
        id: 1,
        name: "Machine Learning Notes.pdf",
        size: "2.4 MB",
        date: "Sep 2, 2026",
    },
    {
        id: 2,
        name: "Python Fundamentals.pdf",
        size: "1.8 MB",
        date: "Sep 1, 2026",
    },
    {
        id: 3,
        name: "Database Management Systems.pdf",
        size: "3.2 MB",
        date: "Aug 30, 2026",
    },
    {
        id: 4,
        name: "Artificial Intelligence.pdf",
        size: "4.1 MB",
        date: "Aug 28, 2026",
    },
];

export default function DocumentListPage() {
    return (
        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                         My Documents
                   </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your study materials and PDFs
                    </p>
                </div>

                <UploadDocumentModal />
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                <input
                    type="text"
                    placeholder="Search documents..."
                    className="w-full bg-[#181B21] border border-[#292D36] text-gray-200 placeholder:text-gray-600 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
                />
            </div>

            {/* Document count */}
            <div className="flex items-center gap-2 mb-5">
                <FileText className="w-5 h-5 text-primary" />

                <p className="text-sm font-medium text-gray-400">
                    {documents.length} Documents
                </p>
            </div>

            {/* Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {documents.map((document) => (
                    <DocumentCard
                       key={document.id}
                       id={document.id}
                       name={document.name}
                       size={document.size}
                       date={document.date}
                     />
                ))}
            </div>

        </div>
    );
}