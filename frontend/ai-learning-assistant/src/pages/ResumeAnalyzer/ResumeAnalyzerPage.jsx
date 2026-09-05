import { useMemo, useState } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    Check,
    CheckCircle2,
    FileText,
    Lightbulb,
    Link2,
    RefreshCcw,
    Sparkles,
    Target,
    Upload,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const demoResume = {
    name: "Alex Johnson",
    role: "Frontend Developer",
    summary:
        "Frontend developer experienced in building responsive web applications using React and JavaScript.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
    experience: [
        {
            role: "Frontend Developer",
            company: "Tech Solutions",
            duration: "2023 – Present",
            bullets: [
                "Worked on frontend development for web applications.",
                "Built reusable components using React.",
                "Worked with APIs and collaborated with the development team.",
            ],
        },
    ],
};

const demoAnalysis = {
    matchScore: 78,
    atsScore: 84,
    keywordScore: 71,
    experienceScore: 82,

    missingSkills: ["TypeScript", "Docker", "AWS"],

    matchedSkills: ["React", "JavaScript", "HTML", "CSS"],

    missingKeywords: [
        "REST APIs",
        "responsive design",
        "deployment",
        "testing",
    ],

    strengths: [
        "Relevant React experience",
        "Good frontend technology coverage",
        "Experience with reusable components",
    ],

    issues: [
        "Resume bullets are too generic.",
        "Several achievements do not include measurable impact.",
        "The professional summary could be more targeted to the role.",
        "Some job-description keywords are missing.",
    ],

    suggestions: [
        {
            id: 1,
            section: "Experience",
            current:
                "Worked on frontend development for web applications.",
            suggested:
                "Developed responsive React applications using reusable UI components and modern frontend practices.",
        },
        {
            id: 2,
            section: "Experience",
            current:
                "Worked with APIs and collaborated with the development team.",
            suggested:
                "Integrated REST APIs and collaborated with cross-functional teams to deliver production-ready web features.",
        },
        {
            id: 3,
            section: "Summary",
            current:
                "Frontend developer experienced in building responsive web applications using React and JavaScript.",
            suggested:
                "Frontend Developer with hands-on experience building responsive React applications, integrating REST APIs, and developing reusable UI components.",
        },
    ],
};

const defaultJobDescription = `We are looking for a Frontend Developer with experience in React, JavaScript, TypeScript, REST APIs, responsive design, testing, AWS, and Docker.

Responsibilities:
- Build responsive web applications.
- Develop reusable React components.
- Integrate REST APIs.
- Write maintainable and tested code.
- Collaborate with cross-functional teams.
- Deploy and maintain frontend applications.`;

export default function ResumeAnalyzerPage() {
    const navigate = useNavigate();

    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] =
        useState(defaultJobDescription);

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);

    const [acceptedSuggestions, setAcceptedSuggestions] = useState([]);
    const [rejectedSuggestions, setRejectedSuggestions] = useState([]);

    const acceptedCount = acceptedSuggestions.length;

    const optimizedResume = useMemo(() => {
        const result = {
            ...demoResume,
            summary: demoResume.summary,
            experience: demoResume.experience.map((item) => ({
                ...item,
                bullets: [...item.bullets],
            })),
        };

        demoAnalysis.suggestions.forEach((suggestion) => {
            if (!acceptedSuggestions.includes(suggestion.id)) {
                return;
            }

            if (suggestion.section === "Summary") {
                result.summary = suggestion.suggested;
            }

            if (suggestion.section === "Experience") {
                if (suggestion.id === 1) {
                    result.experience[0].bullets[0] =
                        suggestion.suggested;
                }

                if (suggestion.id === 2) {
                    result.experience[0].bullets[2] =
                        suggestion.suggested;
                }
            }
        });

        return result;
    }, [acceptedSuggestions]);

    const handleResumeUpload = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setResumeFile(file);
        setHasAnalyzed(false);
        setAcceptedSuggestions([]);
        setRejectedSuggestions([]);
    };

    const handleAnalyze = async () => {
        if (!resumeFile || !jobDescription.trim() || isAnalyzing) {
            return;
        }

        setIsAnalyzing(true);
        setHasAnalyzed(false);

        setAcceptedSuggestions([]);
        setRejectedSuggestions([]);

        await new Promise((resolve) => setTimeout(resolve, 1200));

        setIsAnalyzing(false);
        setHasAnalyzed(true);
    };

    const handleAccept = (id) => {
        setAcceptedSuggestions((current) =>
            current.includes(id) ? current : [...current, id]
        );

        setRejectedSuggestions((current) =>
            current.filter((item) => item !== id)
        );
    };

    const handleReject = (id) => {
        setRejectedSuggestions((current) =>
            current.includes(id) ? current : [...current, id]
        );

        setAcceptedSuggestions((current) =>
            current.filter((item) => item !== id)
        );
    };

    const handleReset = () => {
        setResumeFile(null);
        setHasAnalyzed(false);
        setIsAnalyzing(false);
        setAcceptedSuggestions([]);
        setRejectedSuggestions([]);
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Back */}
            <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </button>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <Target className="w-6 h-6 text-primary" />
                    </div>

                    <div>
                        <p className="text-primary text-sm font-semibold mb-2">
                            CAREER OPTIMIZER
                        </p>

                        <h1 className="text-3xl font-bold text-white">
                            Resume Analyzer
                        </h1>

                        <p className="text-gray-500 mt-2 max-w-2xl leading-6">
                            Compare your resume with a job description,
                            identify gaps, and improve your resume with
                            targeted suggestions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Upload + Job Description */}
            {!hasAnalyzed && !isAnalyzing && (
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Resume */}
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Your Resume
                                </h2>

                                <p className="text-xs text-gray-600 mt-1">
                                    Upload your current resume.
                                </p>
                            </div>
                        </div>

                        <label
                            htmlFor="resume-upload"
                            className="block border border-dashed border-[#3A404A] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#20242B] hover:border-primary/40 transition-all"
                        >
                            <input
                                id="resume-upload"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeUpload}
                                className="hidden"
                            />

                            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto">
                                <Upload className="w-5 h-5 text-primary" />
                            </div>

                            {resumeFile ? (
                                <>
                                    <h3 className="text-sm font-semibold text-white mt-4">
                                        {resumeFile.name}
                                    </h3>

                                    <p className="text-xs text-gray-600 mt-1">
                                        {(resumeFile.size / 1024).toFixed(
                                            1
                                        )}{" "}
                                        KB
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-sm font-semibold text-white mt-4">
                                        Upload your resume
                                    </h3>

                                    <p className="text-xs text-gray-600 mt-2">
                                        PDF, DOC, or DOCX
                                    </p>
                                </>
                            )}
                        </label>

                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Your resume is only used for this analysis in the
                            frontend demo.
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                <Link2 className="w-5 h-5 text-primary" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Job Description
                                </h2>

                                <p className="text-xs text-gray-600 mt-1">
                                    Paste the role you're applying for.
                                </p>
                            </div>
                        </div>

                        <textarea
                            value={jobDescription}
                            onChange={(event) =>
                                setJobDescription(event.target.value)
                            }
                            rows={12}
                            placeholder="Paste the job description here..."
                            className="w-full resize-none bg-[#20242B] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 placeholder:text-gray-600 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all leading-6"
                        />
                    </div>
                </section>
            )}

            {/* Analyze Button */}
            {!hasAnalyzed && !isAnalyzing && (
                <div className="flex flex-col items-center mt-7">
                    <button
                        type="button"
                        onClick={handleAnalyze}
                        disabled={
                            !resumeFile ||
                            !jobDescription.trim() ||
                            isAnalyzing
                        }
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-lg shadow-purple-500/10"
                    >
                        <Sparkles className="w-4 h-4" />
                        Analyze Resume
                    </button>

                    {!resumeFile && (
                        <p className="text-xs text-gray-600 mt-3">
                            Upload your resume to start the analysis.
                        </p>
                    )}
                </div>
            )}

            {/* Loading */}
            {isAnalyzing && (
                <section className="bg-[#181B21] border border-[#292D36] rounded-2xl min-h-[420px] flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-primary animate-pulse" />
                    </div>

                    <h2 className="text-xl font-semibold text-white mt-5">
                        Analyzing your resume...
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Comparing your experience, skills, and keywords with
                        the job description.
                    </p>

                    <div className="flex items-center gap-1.5 mt-5">
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        />

                        <span
                            className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                </section>
            )}

            {/* Results */}
            {hasAnalyzed && !isAnalyzing && (
                <div>
                    {/* Top bar */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                        <div>
                            <p className="text-primary text-sm font-semibold mb-2">
                                ANALYSIS COMPLETE
                            </p>

                            <h2 className="text-2xl font-bold text-white">
                                Resume Match Report
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {resumeFile?.name || "Uploaded Resume"}{" "}
                                compared against your target role.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:bg-[#292E36] hover:text-white transition-colors"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            New Analysis
                        </button>
                    </div>

                    {/* Score cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <ScoreCard
                            label="Resume Match"
                            value={`${demoAnalysis.matchScore}%`}
                            icon={Target}
                        />

                        <ScoreCard
                            label="ATS Readiness"
                            value={`${demoAnalysis.atsScore}%`}
                            icon={CheckCircle2}
                        />

                        <ScoreCard
                            label="Keyword Match"
                            value={`${demoAnalysis.keywordScore}%`}
                            icon={Link2}
                        />

                        <ScoreCard
                            label="Experience Match"
                            value={`${demoAnalysis.experienceScore}%`}
                            icon={Sparkles}
                        />
                    </div>

                    {/* Main Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
                        {/* Strengths */}
                        <AnalysisCard
                            title="What Matches"
                            icon={CheckCircle2}
                        >
                            <div className="space-y-3">
                                {demoAnalysis.strengths.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3"
                                    >
                                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />

                                        <p className="text-sm text-gray-400 leading-6">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </AnalysisCard>

                        {/* Missing Skills */}
                        <AnalysisCard
                            title="Missing Skills"
                            icon={AlertTriangle}
                        >
                            <div className="flex flex-wrap gap-2">
                                {demoAnalysis.missingSkills.map((item) => (
                                    <span
                                        key={item}
                                        className="px-3 py-1.5 rounded-lg bg-red-500/5 border border-red-500/15 text-xs text-red-300"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </AnalysisCard>

                        {/* Missing Keywords */}
                        <AnalysisCard
                            title="Missing Keywords"
                            icon={Link2}
                        >
                            <div className="flex flex-wrap gap-2">
                                {demoAnalysis.missingKeywords.map(
                                    (item) => (
                                        <span
                                            key={item}
                                            className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/15 text-xs text-primary"
                                        >
                                            {item}
                                        </span>
                                    )
                                )}
                            </div>
                        </AnalysisCard>
                    </div>

                    {/* Problems */}
                    <section className="mt-5 bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-400" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    Resume Problems
                                </h3>

                                <p className="text-xs text-gray-600 mt-1">
                                    Areas that could reduce your chances with
                                    this job description.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {demoAnalysis.issues.map((issue) => (
                                <div
                                    key={issue}
                                    className="flex items-start gap-3 bg-[#20242B] border border-[#30353E] rounded-xl p-4"
                                >
                                    <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                    </div>

                                    <p className="text-sm text-gray-400 leading-6">
                                        {issue}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Edit suggestions */}
                    <section className="mt-5">
                        <div className="mb-5">
                            <p className="text-primary text-sm font-semibold mb-2">
                                AI SUGGESTIONS
                            </p>

                            <h3 className="text-2xl font-bold text-white">
                                Improve Your Resume
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Review each suggestion and choose what you want
                                to apply.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {demoAnalysis.suggestions.map((suggestion) => {
                                const accepted =
                                    acceptedSuggestions.includes(
                                        suggestion.id
                                    );

                                const rejected =
                                    rejectedSuggestions.includes(
                                        suggestion.id
                                    );

                                return (
                                    <SuggestionCard
                                        key={suggestion.id}
                                        suggestion={suggestion}
                                        accepted={accepted}
                                        rejected={rejected}
                                        onAccept={() =>
                                            handleAccept(suggestion.id)
                                        }
                                        onReject={() =>
                                            handleReject(suggestion.id)
                                        }
                                    />
                                );
                            })}
                        </div>
                    </section>

                    {/* Optimized preview */}
                    {acceptedCount > 0 && (
                        <section className="mt-6 bg-[#181B21] border border-[#292D36] rounded-2xl overflow-hidden">
                            <div className="px-6 py-5 border-b border-[#292D36] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-white">
                                            Optimized Resume Preview
                                        </h3>

                                        <p className="text-xs text-gray-600 mt-1">
                                            {acceptedCount} suggestion
                                            {acceptedCount === 1
                                                ? ""
                                                : "s"}{" "}
                                            applied.
                                        </p>
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/15 text-xs text-primary">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Updated
                                </span>
                            </div>

                            <div className="p-6">
                                <div className="bg-white text-gray-900 rounded-xl p-7 max-w-3xl mx-auto shadow-xl">
                                    <h2 className="text-2xl font-bold">
                                        {optimizedResume.name}
                                    </h2>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {optimizedResume.role}
                                    </p>

                                    <div className="h-px bg-gray-200 my-5" />

                                    <h3 className="text-sm font-bold uppercase tracking-wide">
                                        Professional Summary
                                    </h3>

                                    <p className="text-sm leading-6 mt-2">
                                        {optimizedResume.summary}
                                    </p>

                                    <h3 className="text-sm font-bold uppercase tracking-wide mt-6">
                                        Skills
                                    </h3>

                                    <p className="text-sm leading-6 mt-2">
                                        {optimizedResume.skills.join(
                                            " • "
                                        )}
                                    </p>

                                    <h3 className="text-sm font-bold uppercase tracking-wide mt-6">
                                        Experience
                                    </h3>

                                    <p className="text-sm font-semibold mt-2">
                                        {optimizedResume.experience[0].role}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {
                                            optimizedResume.experience[0]
                                                .company
                                        }{" "}
                                        ·{" "}
                                        {
                                            optimizedResume.experience[0]
                                                .duration
                                        }
                                    </p>

                                    <ul className="mt-3 space-y-2">
                                        {optimizedResume.experience[0].bullets.map(
                                            (bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="text-sm leading-6 pl-4 relative before:absolute before:left-0 before:content-['•']"
                                                >
                                                    {bullet}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Demo note */}
                    <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-[#20242B] border border-[#30353E]">
                        <Lightbulb className="w-4 h-4 text-primary mt-0.5 shrink-0" />

                        <p className="text-xs text-gray-500 leading-5">
                            This is the frontend demo version. The backend
                            will later extract your actual resume content,
                            analyze the real job description, calculate
                            matching scores, generate personalized rewrites,
                            and create the final optimized resume.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function ScoreCard({ label, value, icon: Icon }) {
    return (
        <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs text-gray-600">{label}</p>

                    <p className="text-2xl font-bold text-white mt-2">
                        {value}
                    </p>
                </div>

                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                </div>
            </div>
        </div>
    );
}

function AnalysisCard({ title, icon: Icon, children }) {
    return (
        <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                </div>

                <h3 className="font-semibold text-white">{title}</h3>
            </div>

            {children}
        </div>
    );
}

function SuggestionCard({
    suggestion,
    accepted,
    rejected,
    onAccept,
    onReject,
}) {
    return (
        <div
            className={`bg-[#181B21] border rounded-2xl overflow-hidden transition-all ${
                accepted
                    ? "border-primary/35"
                    : rejected
                      ? "border-red-500/20 opacity-70"
                      : "border-[#292D36]"
            }`}
        >
            <div className="px-6 py-4 border-b border-[#292D36] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                    <p className="text-xs text-primary uppercase tracking-wider font-semibold">
                        {suggestion.section}
                    </p>

                    <h4 className="text-base font-semibold text-white mt-1">
                        Suggested Improvement
                    </h4>
                </div>

                {accepted && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/15 text-xs text-primary">
                        <Check className="w-3.5 h-3.5" />
                        Applied
                    </span>
                )}

                {rejected && (
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/5 border border-red-500/15 text-xs text-red-300">
                        <X className="w-3.5 h-3.5" />
                        Rejected
                    </span>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Current */}
                <div className="p-6 border-b lg:border-b-0 lg:border-r border-[#292D36]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Current
                    </p>

                    <p className="text-sm text-gray-400 leading-6 mt-3">
                        {suggestion.current}
                    </p>
                </div>

                {/* Suggested */}
                <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        Suggested
                    </p>

                    <p className="text-sm text-gray-200 leading-6 mt-3">
                        {suggestion.suggested}
                    </p>
                </div>
            </div>

            <div className="px-6 py-4 border-t border-[#292D36] flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={onAccept}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                >
                    <Check className="w-4 h-4" />
                    Use Suggestion
                </button>

                <button
                    type="button"
                    onClick={onReject}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#30353E] text-gray-400 text-sm font-medium hover:bg-[#292E36] hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                    Keep Original
                </button>
            </div>
        </div>
    );
}
