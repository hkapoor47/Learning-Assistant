import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle2,
    FileText,
    Sparkles,
    Target,
    ShieldCheck,
    AlertTriangle,
    Plus,
    X,
    Download,
} from "lucide-react";

const defaultJobDescription = `Frontend Developer

We are looking for a frontend developer with experience in React, JavaScript, TypeScript, REST APIs, Git, responsive UI development, testing, and modern deployment workflows. Experience with Docker, AWS, PostgreSQL, CI/CD, accessibility, and performance optimization is preferred.`;

const demoResume = {
    name: "Aarav Sharma",
    title: "Frontend Developer",
    summary:
        "Frontend developer experienced in building responsive web applications with React and JavaScript.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Git", "REST APIs"],
    experience: [
        "Built responsive web interfaces using React and JavaScript.",
        "Worked with REST APIs and reusable UI components.",
    ],
};

const demoAnalysis = {
    match: 81,
    ats: 93,
    skillsMatch: 75,
    keywordMatch: 72,
    matchedSkills: ["React", "JavaScript", "REST APIs", "Git", "Responsive UI"],
    missingSkills: ["TypeScript", "Testing", "CI/CD", "Docker", "AWS"],
    required: ["React", "JavaScript", "TypeScript", "REST APIs", "Git", "Testing"],
    preferred: ["Docker", "AWS", "PostgreSQL", "CI/CD", "Accessibility", "Performance"],
    problems: [
        "Professional summary is clear but not targeted to the job description.",
        "Experience bullets describe responsibilities but do not show measurable outcomes.",
        "The resume does not surface TypeScript or testing experience prominently.",
        "Skills are present but could be grouped into ATS-friendly categories.",
    ],
    suggestions: [
        {
            id: "summary",
            title: "Target the professional summary",
            original:
                "Frontend developer experienced in building responsive web applications with React and JavaScript.",
            improved:
                "Frontend Developer with experience building responsive web applications using React, JavaScript, REST APIs, and Git, with a focus on reusable UI and user experience.",
        },
        {
            id: "experience",
            title: "Strengthen an experience bullet",
            original:
                "Built responsive web interfaces using React and JavaScript.",
            improved:
                "Developed responsive React interfaces with reusable components and JavaScript, improving consistency across core user flows.",
        },
        {
            id: "api",
            title: "Make API experience easier to scan",
            original:
                "Worked with REST APIs and reusable UI components.",
            improved:
                "Integrated REST APIs with reusable React components to connect frontend workflows with application data.",
        },
    ],
};

const skillGroups = [
    ["Frontend", ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Responsive UI"]],
    ["Backend / API", ["REST APIs", "Node.js"]],
    ["Quality", ["Testing", "Accessibility", "Performance"]],
    ["DevOps", ["Git", "CI/CD", "Docker", "AWS"]],
    ["Database", ["PostgreSQL"]],
];

function ScoreCard({ label, value, helper, icon: Icon }) {
    return (
        <div className="bg-[#20242B] border border-[#30353E] rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-white">{value}%</span>
            </div>
            <p className="text-sm font-semibold text-gray-200 mt-4">{label}</p>
            <p className="text-xs text-gray-600 mt-1">{helper}</p>
        </div>
    );
}

function Section({ title, description, children }) {
    return (
        <section className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-7">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                {description && (
                    <p className="text-sm text-gray-500 mt-1">{description}</p>
                )}
            </div>
            {children}
        </section>
    );
}

export default function ResumeAnalyzerPage() {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState(defaultJobDescription);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [hasAnalyzed, setHasAnalyzed] = useState(false);
    const [accepted, setAccepted] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [customSkills, setCustomSkills] = useState([]);
    const [builderStep, setBuilderStep] = useState(0);
    const [builderData, setBuilderData] = useState({
       skills: "",
       projects: "",
       experience: "",
       tools: "",
       certifications: "",
      achievements: "",
    });

    const [generatedResume, setGeneratedResume] = useState(null);

    const allRecommendedSkills = useMemo(
        () =>
            skillGroups.flatMap(([, skills]) => skills).filter(
                (skill) => !demoResume.skills.includes(skill)
            ),
        []
    );

    const analyzeResume = async () => {
        if (isAnalyzing) return;

        setIsAnalyzing(true);
        setHasAnalyzed(false);
        await new Promise((resolve) => setTimeout(resolve, 1100));
        setAccepted([]);
        setRejected([]);
        setIsAnalyzed(true);
        setIsAnalyzing(false);
    };

    // Alias kept separate so the button reads naturally in the UI.
    const setIsAnalyzed = (value) => {
        setHasAnalyzed(value);
    };

    const updateBuilderData = (field, value) => {
    setBuilderData((previous) => ({
        ...previous,
        [field]: value,
    }));
};

const generateATSResume = () => {
    setGeneratedResume({
        name: demoResume.name,
        title: demoResume.title,

        summary:
            "Frontend Developer with experience building responsive web applications using React, JavaScript, REST APIs, and Git. Focused on reusable UI development, clean implementation, and user-focused experiences.",

        skills: [
            ...demoResume.skills,
            ...customSkills,
        ].filter(
            (skill, index, array) => array.indexOf(skill) === index
        ),

        experience: builderData.experience
            ? builderData.experience
            : demoResume.experience,

        projects: builderData.projects
            ? builderData.projects
            : "Add your relevant projects here with the technologies used and measurable outcomes.",

        certifications: builderData.certifications,

        achievements: builderData.achievements,
    });

    setBuilderStep(2);
};


    const resetAnalysis = () => {
        setResumeFile(null);
        setJobDescription(defaultJobDescription);
        setHasAnalyzed(false);
        setAccepted([]);
        setRejected([]);
        setCustomSkills([]);
        setBuilderStep(0);
setBuilderData({
    skills: "",
    projects: "",
    experience: "",
    tools: "",
    certifications: "",
    achievements: "",
});
setGeneratedResume(null);
    };

    const toggleSuggestion = (id, action) => {
        const setter = action === "accept" ? setAccepted : setRejected;
        const otherSetter = action === "accept" ? setRejected : setAccepted;

        setter((previous) =>
            previous.includes(id)
                ? previous.filter((item) => item !== id)
                : [...previous, id]
        );
        otherSetter((previous) => previous.filter((item) => item !== id));
    };

    const addSkill = (skill) => {
        if (!customSkills.includes(skill)) {
            setCustomSkills((previous) => [...previous, skill]);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-7"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
            </Link>

            <div className="mb-8">
                <p className="text-primary text-sm font-semibold mb-2">
                    RESUME + ATS
                </p>
                <h1 className="text-3xl font-bold text-white">Resume Analyzer</h1>
                <p className="text-gray-500 mt-2 max-w-3xl">
                    Compare your resume with a job description, find missing skills and keywords, then improve the resume without inventing experience.
                </p>
            </div>

            {!hasAnalyzed && (
                <section className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-medium text-gray-300">
                                Resume
                            </label>

                            <label className="mt-3 min-h-[180px] flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-[#3A404A] bg-[#101216] hover:bg-[#15181E] cursor-pointer transition-colors">
                                <FileText className="w-8 h-8 text-primary" />
                                <p className="text-sm font-medium text-gray-200 mt-4">
                                    {resumeFile ? resumeFile.name : "Upload PDF or DOCX"}
                                </p>
                                <p className="text-xs text-gray-600 mt-2">
                                    Frontend demo accepts the file for UI flow.
                                </p>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={(event) =>
                                        setResumeFile(event.target.files?.[0] || null)
                                    }
                                />
                            </label>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300">
                                Job Description
                            </label>
                            <textarea
                                value={jobDescription}
                                onChange={(event) => setJobDescription(event.target.value)}
                                className="mt-3 w-full min-h-[180px] resize-y bg-[#101216] border border-[#30353E] rounded-2xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50 leading-6"
                                placeholder="Paste the job description here..."
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-[#292D36]">
                        <p className="text-xs text-gray-600">
                            Demo analysis now · real PDF parsing, ATS extraction, and AI rewriting come with the backend.
                        </p>
                        <button
                            type="button"
                            onClick={analyzeResume}
                            disabled={!jobDescription.trim() || isAnalyzing}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <Sparkles className="w-4 h-4" />
                            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                        </button>
                    </div>
                </section>
            )}

            {isAnalyzing && (
                <div className="mt-6 bg-[#181B21] border border-[#292D36] rounded-2xl min-h-[260px] flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    <h2 className="text-lg font-semibold text-white mt-4">
                        Comparing resume with the job description...
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Checking ATS structure, skills, keywords, and improvement opportunities.
                    </p>
                </div>
            )}

            {hasAnalyzed && !isAnalyzing && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <ScoreCard
                            label="Overall Match"
                            value={demoAnalysis.match}
                            helper="Resume vs job requirements"
                            icon={Target}
                        />
                        <ScoreCard
                            label="ATS Compatibility"
                            value={demoAnalysis.ats}
                            helper="Structure and keyword readability"
                            icon={ShieldCheck}
                        />
                        <ScoreCard
                            label="Skills Match"
                            value={demoAnalysis.skillsMatch}
                            helper="Required skill coverage"
                            icon={CheckCircle2}
                        />
                        <ScoreCard
                            label="Keyword Match"
                            value={demoAnalysis.keywordMatch}
                            helper="Relevant JD language"
                            icon={Sparkles}
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        <Section
                            title="Skills Analysis"
                            description="Separate matched skills from skills that need evidence before being added."
                        >
                            <div className="space-y-5">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                        Matched
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {demoAnalysis.matchedSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-400"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                        Missing / not evidenced
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {demoAnalysis.missingSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section
                            title="Keyword Coverage"
                            description="Keywords are recommendations, not permission to claim experience you do not have."
                        >
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                        Required
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {demoAnalysis.required.map((skill) => {
                                            const found = demoResume.skills.includes(skill);
                                            return (
                                                <div
                                                    key={skill}
                                                    className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-[#20242B] border border-[#30353E]"
                                                >
                                                    <span className="text-sm text-gray-300">{skill}</span>
                                                    {found ? (
                                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-red-400" />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                        Preferred
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {demoAnalysis.preferred.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/15 text-xs text-primary"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>

                    <Section
                        title="Resume Problems"
                        description="Issues to fix before targeting more jobs."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {demoAnalysis.problems.map((problem) => (
                                <div
                                    key={problem}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-[#20242B] border border-[#30353E]"
                                >
                                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                                    <p className="text-sm text-gray-300 leading-6">{problem}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section
                        title="AI Improvements"
                        description="Accept only suggestions that remain truthful to your real experience."
                    >
                        <div className="space-y-4">
                            {demoAnalysis.suggestions.map((suggestion) => {
                                const isAccepted = accepted.includes(suggestion.id);
                                const isRejected = rejected.includes(suggestion.id);

                                return (
                                    <div
                                        key={suggestion.id}
                                        className="rounded-2xl border border-[#30353E] bg-[#20242B] p-5"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-sm font-semibold text-white">
                                                    {suggestion.title}
                                                </h3>
                                                <div className="mt-4 space-y-3">
                                                    <div>
                                                        <p className="text-xs text-gray-600 mb-1">Current</p>
                                                        <p className="text-sm text-gray-500 leading-6">
                                                            {suggestion.original}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-primary mb-1">Suggested</p>
                                                        <p className="text-sm text-gray-200 leading-6">
                                                            {suggestion.improved}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {isAccepted && (
                                                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                                            )}
                                            {isRejected && (
                                                <X className="w-5 h-5 text-gray-600 shrink-0" />
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#30353E]">
                                            <button
                                                type="button"
                                                onClick={() => toggleSuggestion(suggestion.id, "accept")}
                                                className="px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary hover:bg-primary/15"
                                            >
                                                Use Suggestion
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => toggleSuggestion(suggestion.id, "reject")}
                                                className="px-3.5 py-2 rounded-xl border border-[#3A404A] text-sm text-gray-400 hover:text-white hover:bg-[#292E36]"
                                            >
                                                Keep Original
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Section>

                    <Section
                        title="ATS-Friendly Skills Builder"
                        
                        description="Add relevant skills only when you genuinely have them."
                    >
                        <div className="space-y-5">
                            {skillGroups.map(([group, skills]) => (
                                <div key={group}>
                                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                        {group}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => {
                                            const already =
                                                demoResume.skills.includes(skill) ||
                                                customSkills.includes(skill);
                                            return (
                                                <button
                                                    key={skill}
                                                    type="button"
                                                    onClick={() => addSkill(skill)}
                                                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors ${
                                                        already
                                                            ? "bg-primary/10 border-primary/20 text-primary"
                                                            : "bg-[#20242B] border-[#30353E] text-gray-400 hover:text-white hover:bg-[#292E36]"
                                                    }`}
                                                >
                                                    {already ? (
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    ) : (
                                                        <Plus className="w-4 h-4" />
                                                    )}
                                                    {skill}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15 text-sm text-gray-400">
                                Add a skill because you can support it with real experience, a project, coursework, certification, or another credible source—not just because it appears in the JD.
                            </div>
                        </div>
                    </Section>
                    <Section
    title="AI Resume Builder"
    description="Tell the AI what you actually know and have worked on. It will build an ATS-friendly resume without inventing experience."
>
    {builderStep === 0 && (
        <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/15">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-white">
                            Let's build your ATS resume
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 leading-6">
                            Your job description suggests some skills and keywords.
                            Tell me which ones you genuinely have experience with,
                            and I'll use only those in your resume.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-sm font-medium text-gray-300 mb-3">
                    Skills you may want to add
                </p>

                <div className="flex flex-wrap gap-2">
                    {demoAnalysis.missingSkills.map((skill) => (
                        <button
                            key={skill}
                            type="button"
                            onClick={() => addSkill(skill)}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors ${
                                customSkills.includes(skill)
                                    ? "bg-primary/10 border-primary/20 text-primary"
                                    : "bg-[#20242B] border-[#30353E] text-gray-400 hover:text-white"
                            }`}
                        >
                            {customSkills.includes(skill) ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}

                            {skill}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
                <p className="text-sm text-gray-400 leading-6">
                    Only select a skill if you can honestly support it with
                    experience, a project, coursework, certification, or another
                    credible source.
                </p>
            </div>

            <button
                type="button"
                onClick={() => setBuilderStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500"
            >
                <Sparkles className="w-4 h-4" />
                Continue to Resume Builder
            </button>
        </div>
    )}

    {builderStep === 1 && (
        <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-[#20242B] border border-[#30353E]">
                <h3 className="text-base font-semibold text-white">
                    Tell me about yourself
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-6">
                    Give real information. The AI will turn your answers into
                    professional ATS-friendly resume content.
                </p>
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300">
                    What skills do you actually have?
                </label>

                <textarea
                    value={builderData.skills}
                    onChange={(event) =>
                        updateBuilderData("skills", event.target.value)
                    }
                    placeholder="Example: React, JavaScript, TypeScript, Git, REST APIs..."
                    className="mt-2 w-full min-h-[110px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300">
                    What projects have you worked on?
                </label>

                <textarea
                    value={builderData.projects}
                    onChange={(event) =>
                        updateBuilderData("projects", event.target.value)
                    }
                    placeholder="Example: Built an AI learning platform using React and Node.js..."
                    className="mt-2 w-full min-h-[120px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300">
                    Work / Internship Experience
                </label>

                <textarea
                    value={builderData.experience}
                    onChange={(event) =>
                        updateBuilderData("experience", event.target.value)
                    }
                    placeholder="Tell me about your internships, jobs, responsibilities, and achievements..."
                    className="mt-2 w-full min-h-[120px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300">
                    Tools / Technologies
                </label>

                <textarea
                    value={builderData.tools}
                    onChange={(event) =>
                        updateBuilderData("tools", event.target.value)
                    }
                    placeholder="Example: VS Code, GitHub, Postman, Docker, AWS..."
                    className="mt-2 w-full min-h-[100px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300">
                    Certifications
                </label>

                <textarea
                    value={builderData.certifications}
                    onChange={(event) =>
                        updateBuilderData(
                            "certifications",
                            event.target.value
                        )
                    }
                    placeholder="Example: AWS Cloud Practitioner, Google Data Analytics..."
                    className="mt-2 w-full min-h-[90px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50"
                />
            </div>

            <div>
                <label className="text-sm font-medium text-gray-300">
                    Achievements
                </label>

                <textarea
                    value={builderData.achievements}
                    onChange={(event) =>
                        updateBuilderData(
                            "achievements",
                            event.target.value
                        )
                    }
                    placeholder="Example: Won hackathon, improved performance, solved 300+ DSA problems..."
                    className="mt-2 w-full min-h-[90px] resize-y bg-[#101216] border border-[#30353E] rounded-xl p-4 text-sm text-gray-300 outline-none focus:border-primary/50"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => setBuilderStep(0)}
                    className="px-5 py-2.5 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:text-white"
                >
                    Back
                </button>

                <button
                    type="button"
                    onClick={generateATSResume}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500"
                >
                    <Sparkles className="w-4 h-4" />
                    Generate ATS Resume
                </button>
            </div>
        </div>
    )}

    {builderStep === 2 && generatedResume && (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-base font-semibold text-white">
                        Your ATS Resume is Ready
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Review the generated content before downloading.
                    </p>
                </div>

                <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>

            <div className="bg-white text-gray-900 rounded-xl p-7 md:p-10 max-w-3xl mx-auto">
                <div className="border-b border-gray-200 pb-5">
                    <h3 className="text-2xl font-bold">
                        {generatedResume.name}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                        {generatedResume.title}
                    </p>
                </div>

                <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                        Professional Summary
                    </h4>

                    <p className="text-sm leading-6 mt-2">
                        {generatedResume.summary}
                    </p>
                </div>

                <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                        Skills
                    </h4>

                    <p className="text-sm leading-6 mt-2">
                        {generatedResume.skills.join(" · ")}
                    </p>
                </div>

                <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                        Experience
                    </h4>

                    <div className="mt-3 space-y-2">
                        {generatedResume.experience
                            .split("\n")
                            .filter(Boolean)
                            .map((item, index) => (
                                <p
                                    key={index}
                                    className="text-sm leading-6"
                                >
                                    • {item}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                        Projects
                    </h4>

                    <p className="text-sm leading-6 mt-2">
                        {generatedResume.projects}
                    </p>
                </div>

                {generatedResume.certifications && (
                    <div className="mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                            Certifications
                        </h4>

                        <p className="text-sm leading-6 mt-2">
                            {generatedResume.certifications}
                        </p>
                    </div>
                )}

                {generatedResume.achievements && (
                    <div className="mt-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                            Achievements
                        </h4>

                        <p className="text-sm leading-6 mt-2">
                            {generatedResume.achievements}
                        </p>
                    </div>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="button"
                    onClick={() => setBuilderStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:text-white"
                >
                    Edit Details
                </button>

                <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold opacity-50 cursor-not-allowed"
                >
                    <Download className="w-4 h-4" />
                    Download Resume
                </button>
            </div>
        </div>
    )}
</Section>

                    <Section
                        title="Optimized Resume Preview"
                        description="A clean ATS-oriented preview using accepted suggestions and selected skills."
                    >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
                            <div>
                                <p className="text-xs text-gray-500">
                                    Accepted improvements: {accepted.length} · Selected skills: {customSkills.length}
                                </p>
                            </div>
                            <button
                                type="button"
                                disabled
                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-sm text-gray-500 opacity-60 cursor-not-allowed"
                            >
                                <Download className="w-4 h-4" />
                                Download (Backend)
                            </button>
                        </div>

                        <div className="bg-white text-gray-900 rounded-xl p-7 md:p-10 max-w-3xl mx-auto shadow-2xl">
                            <div className="border-b border-gray-200 pb-5">
                                <h3 className="text-2xl font-bold">{demoResume.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{demoResume.title}</p>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                                    Summary
                                </h4>
                                <p className="text-sm leading-6 mt-2">
                                    {accepted.includes("summary")
                                        ? demoAnalysis.suggestions.find((item) => item.id === "summary").improved
                                        : demoResume.summary}
                                </p>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                                    Skills
                                </h4>
                                <p className="text-sm leading-6 mt-2">
                                    {[...demoResume.skills, ...customSkills]
                                        .filter((skill, index, array) => array.indexOf(skill) === index)
                                        .join(" · ")}
                                </p>
                            </div>

                            <div className="mt-6">
                                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
                                    Experience
                                </h4>

                                <div className="mt-3 space-y-2">
                                    {demoResume.experience.map((item, index) => {
                                        const key = index === 0 ? "experience" : "api";
                                        const suggestion = demoAnalysis.suggestions.find((entry) => entry.id === key);

                                        const content =
                                            accepted.includes(key) && suggestion
                                                ? suggestion.improved
                                                : item;

                                        return (
                                            <p key={item} className="text-sm leading-6">
                                                • {content}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Section>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-8">
                        <p className="text-xs text-gray-600">
                            {resumeFile ? `Uploaded: ${resumeFile.name}` : "Demo resume data is being used."}
                        </p>
                        <button
                            type="button"
                            onClick={resetAnalysis}
                            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500"
                        >
                            New Analysis
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
