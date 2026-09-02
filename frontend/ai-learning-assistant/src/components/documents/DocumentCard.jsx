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
        <div className="group bg-[#20242B] rounded-2xl border border-[#30353E] p-5 hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300">

            {/* Top */}
            <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                </div>

                <button
                    type="button"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <MoreVertical className="w-5 h-5 text-gray-500 group-hover:text-gray-300" />
                </button>
            </div>

            {/* Name */}
            <div className="mt-5">
                <h3 className="font-semibold text-gray-100 truncate">
                    {name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                    PDF Document
                </p>
            </div>

            {/* Information */}
            <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <HardDrive className="w-4 h-4 text-gray-500" />
                    <span>{size}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{date}</span>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-5 pt-4 border-t border-[#292D36]">
                <button
                    type="button"
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-purple-300 transition-colors"
                >
                    Open Document
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>
    );
}