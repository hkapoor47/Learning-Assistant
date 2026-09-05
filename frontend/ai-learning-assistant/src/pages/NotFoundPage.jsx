import { ArrowLeft, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0F1115] flex items-center justify-center px-6">
            <div className="max-w-lg w-full text-center">
                <div className="mx-auto w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Compass className="w-9 h-9 text-primary" />
                </div>

                <p className="text-primary text-sm font-semibold uppercase tracking-wider mt-7">
                    404 ERROR
                </p>

                <h1 className="text-5xl font-bold text-white mt-3">
                    Page not found
                </h1>

                <p className="text-gray-500 leading-7 mt-4">
                    The page you're looking for doesn't exist or may have
                    moved somewhere else.
                </p>

                <div className="flex items-center justify-center gap-3 mt-7">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#30353E] text-sm font-medium text-gray-400 hover:bg-[#20242B] hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 transition-colors"
                    >
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}