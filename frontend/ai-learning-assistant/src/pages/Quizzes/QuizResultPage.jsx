import { Link, useLocation, useParams } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Trophy,
} from "lucide-react";

export default function QuizResultPage() {
    const { id } = useParams();
    const location = useLocation();

    const {
        quiz,
        selectedAnswers = {},
        score = 0,
    } = location.state || {};

    // Fallback in case the page is refreshed directly
    if (!quiz) {
        return (
            <div className="max-w-3xl mx-auto text-center py-20">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-primary" />
                </div>

                <h1 className="text-2xl font-bold text-white mt-6">
                    Quiz Result Not Found
                </h1>

                <p className="text-gray-500 mt-2">
                    Please take the quiz again to see your results.
                </p>

                <Link
                    to="/quizzes"
                    className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Quizzes
                </Link>
            </div>
        );
    }

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const incorrect = totalQuestions - score;

    const getResultMessage = () => {
        if (percentage >= 90) {
            return "Excellent work! You have a strong understanding of this topic.";
        }

        if (percentage >= 70) {
            return "Good job! Review the questions you missed to strengthen your understanding.";
        }

        if (percentage >= 50) {
            return "You're making progress. A little more revision will help improve your score.";
        }

        return "Keep practicing. Review the explanations below and try the quiz again.";
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Back */}
            <div className="mb-8">
                <Link
                    to="/quizzes"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Quizzes
                </Link>
            </div>

            {/* Result Header */}
            <div className="bg-[#20242B] border border-[#30353E] rounded-2xl p-8 md:p-10 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-primary" />
                </div>

                <p className="text-primary text-sm font-semibold mt-5">
                    QUIZ COMPLETE
                </p>

                <h1 className="text-3xl font-bold text-white mt-2">
                    {quiz.title}
                </h1>

                <div className="mt-8">
                    <p className="text-6xl font-bold text-white">
                        {percentage}%
                    </p>

                    <p className="text-gray-500 mt-2">
                        {score} out of {totalQuestions} correct
                    </p>
                </div>

                <p className="max-w-xl mx-auto text-sm text-gray-400 mt-6 leading-relaxed">
                    {getResultMessage()}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
                    <div className="bg-[#181B21] border border-[#292D36] rounded-xl p-4">
                        <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />

                        <p className="text-2xl font-bold text-white mt-2">
                            {score}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Correct
                        </p>
                    </div>

                    <div className="bg-[#181B21] border border-[#292D36] rounded-xl p-4">
                        <XCircle className="w-5 h-5 text-red-400 mx-auto" />

                        <p className="text-2xl font-bold text-white mt-2">
                            {incorrect}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Incorrect
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                    <Link
                        to={`/quizzes/${id}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/10"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Retake Quiz
                    </Link>

                    <Link
                        to="/quizzes"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#30353E] text-gray-400 font-medium hover:bg-[#292E36] hover:text-white transition-colors"
                    >
                        All Quizzes
                    </Link>
                </div>
            </div>

            {/* Answer Review */}
            <div className="mt-8">
                <div className="mb-5">
                    <h2 className="text-xl font-semibold text-white">
                        Review Answers
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Review your answers and understand the correct solutions.
                    </p>
                </div>

                <div className="space-y-5">
                    {quiz.questions.map((question, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === question.answer;
                        const hasAnswered = userAnswer !== undefined;

                        return (
                            <div
                                key={index}
                                className="bg-[#20242B] border border-[#30353E] rounded-2xl p-6"
                            >
                                {/* Question Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500">
                                            QUESTION {index + 1}
                                        </p>

                                        <h3 className="text-base md:text-lg font-semibold text-gray-100 mt-2 leading-relaxed">
                                            {question.question}
                                        </h3>
                                    </div>

                                    {isCorrect ? (
                                        <div className="flex items-center gap-1.5 text-green-400 text-sm font-medium shrink-0">
                                            <CheckCircle2 className="w-5 h-5" />
                                            Correct
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-red-400 text-sm font-medium shrink-0">
                                            <XCircle className="w-5 h-5" />
                                            Incorrect
                                        </div>
                                    )}
                                </div>

                                {/* User Answer */}
                                <div className="mt-6">
                                    <p className="text-xs font-medium text-gray-500 mb-2">
                                        YOUR ANSWER
                                    </p>

                                    <div
                                        className={`p-4 rounded-xl border ${
                                            isCorrect
                                                ? "bg-green-500/5 border-green-500/20"
                                                : "bg-red-500/5 border-red-500/20"
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {isCorrect ? (
                                                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                                            )}

                                            <p className="text-sm text-gray-300">
                                                {hasAnswered
                                                    ? question.options[userAnswer]
                                                    : "Not answered"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Correct Answer */}
                                {!isCorrect && (
                                    <div className="mt-4">
                                        <p className="text-xs font-medium text-gray-500 mb-2">
                                            CORRECT ANSWER
                                        </p>

                                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />

                                                <p className="text-sm text-gray-300">
                                                    {question.options[
                                                        question.answer
                                                    ]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Explanation */}
                                <div className="mt-5 pt-5 border-t border-[#30353E]">
                                    <p className="text-xs font-medium text-gray-500 mb-2">
                                        EXPLANATION
                                    </p>

                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        {question.explanation}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}