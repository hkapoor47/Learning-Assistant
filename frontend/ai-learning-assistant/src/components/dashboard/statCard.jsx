import { FileText, BookOpen, Brain } from "lucide-react";

const ICONS = {
    documents: FileText,
    flashcards: BookOpen,
    quizzes: Brain,
};

export default function StatCard({ title, value, icon }) {
    const Icon = ICONS[icon] || FileText;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="text-3xl font-bold text-gray-900 mt-2">
                        {value}
                    </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
            </div>
        </div>
    );
}