import {
    FileText,
    BookOpen,
    Brain,
} from "lucide-react";

const ICONS = {
    documents: FileText,
    flashcards: BookOpen,
    quizzes: Brain,
};

export default function StatCard({ title, value, icon }) {
    const Icon = ICONS[icon] || FileText;

    return (
        <div className="group relative overflow-hidden bg-[#20242B] border border-[#30353E] rounded-2xl p-6 hover:bg-[#292E36] hover:border-[#3A404A] transition-all duration-300">
            {/* Glow */}
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />

            <div className="relative flex items-center justify-between">

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="text-4xl font-bold text-white mt-3">
                        {value}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                        Updated recently
                    </p>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                </div>

            </div>
        </div>
    );
}