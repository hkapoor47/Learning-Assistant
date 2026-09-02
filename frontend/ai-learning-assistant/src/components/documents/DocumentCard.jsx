import {
    FileText,
    MoreVertical,
    Calendar,
    HardDrive,
    ArrowRight,
} from "lucide-react";

export default function DocumentCard({
    name = "Machine Learning Notes.pdf",
    size = "2.4 MB",
    date = "Sep 2, 2026",
}) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200">
            
            {/* Top */}
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                </div>

                <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* Name */}
            <div className="mt-5">
                <h3 className="font-semibold text-gray-900 truncate">
                    {name}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                    PDF Document
                </p>
            </div>

            {/* Information */}
            <div className="mt-5 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <HardDrive className="w-4 h-4" />
                    <span>{size}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                >
                    Open Document
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}