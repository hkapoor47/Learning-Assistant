import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Sparkles,
    User,
    BriefcaseBusiness,
    Code2,
    GraduationCap,
    FolderGit2,
    Award,
    Plus,
    X,
    CheckCircle2,
    Pencil,
    FileText,
    Download,
    ChevronDown,
} from "lucide-react";

const initialForm = {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    targetRole: "",
    about: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
    certifications: "",
    achievements: "",
    jobDescription: "",
};

const defaultSuggestions = [
    {
        id: "summary",
        title: "Professional Summary",
        content:
            "Create a concise summary focused on your target role, strongest technical skills, relevant projects, and practical experience.",
        accepted: true,
    },
    {
        id: "skills",
        title: "ATS-Friendly Skills",
        content:
            "Group your real skills by category so ATS systems and recruiters can scan them easily.",
        accepted: true,
    },
    {
        id: "experience",
        title: "Experience & Impact",
        content:
            "Turn responsibilities into achievement-focused bullet points using actions, technologies, and measurable results where available.",
        accepted: true,
    },
    {
        id: "projects",
        title: "Relevant Projects",
        content:
            "Highlight projects that demonstrate skills relevant to your target role and include the technologies used.",
        accepted: true,
    },
];

const skillSuggestions = [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Python",
    "Node.js",
    "REST APIs",
    "Git",
    "SQL",
    "PostgreSQL",
    "Testing",
    "Docker",
    "AWS",
    "CI/CD",
];

function Section({ title, description, icon: Icon, children }) {
    return (
        <section className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-7">
            <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white">
                        {title}
                    </h2>

                    {description && (
                        <p className="text-sm text-gray-500 mt-1 leading-5">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {children}
        </section>
    );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#101216] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/50 transition-colors"
            />
        </div>
    );
}

function TextArea({
    label,
    value,
    onChange,
    placeholder,
    rows = 5,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>

            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full resize-y bg-[#101216] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-gray-300 placeholder:text-gray-600 outline-none focus:border-primary/50 transition-colors leading-6"
            />
        </div>
    );
}

function SkillPill({ skill, selected, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-colors ${
                selected
                    ? "bg-primary/10 border-primary/25 text-primary"
                    : "bg-[#20242B] border-[#30353E] text-gray-400 hover:text-white hover:bg-[#292E36]"
            }`}
        >
            {selected ? (
                <CheckCircle2 className="w-4 h-4" />
            ) : (
                <Plus className="w-4 h-4" />
            )}

            {skill}
        </button>
    );
}

export default function ResumeBuilderPage() {
    const [form, setForm] = useState(initialForm);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [customSkills, setCustomSkills] = useState([]);
    const [customSkillInput, setCustomSkillInput] = useState("");

    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [hasGenerated, setHasGenerated] = useState(false);

    const [suggestions, setSuggestions] = useState(defaultSuggestions);

    const [generatedSummary, setGeneratedSummary] = useState("");

    const updateField = (field, value) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const toggleSkill = (skill) => {
        setSelectedSkills((previous) =>
            previous.includes(skill)
                ? previous.filter((item) => item !== skill)
                : [...previous, skill]
        );
    };

    const addCustomSkill = () => {
        const skill = customSkillInput.trim();

        if (!skill) return;

        if (
            !selectedSkills.includes(skill) &&
            !customSkills.includes(skill)
        ) {
            setCustomSkills((previous) => [...previous, skill]);
            setSelectedSkills((previous) => [...previous, skill]);
        }

        setCustomSkillInput("");
    };

    const removeCustomSkill = (skill) => {
        setCustomSkills((previous) =>
            previous.filter((item) => item !== skill)
        );

        setSelectedSkills((previous) =>
            previous.filter((item) => item !== skill)
        );
    };

    const generateSuggestions = async () => {
        if (isGenerating) return;

        setIsGenerating(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const name = form.name.trim() || "Professional";
        const role = form.targetRole.trim() || "professional";

        const skills =
            selectedSkills.length > 0
                ? selectedSkills.slice(0, 8).join(", ")
                : "relevant technical and professional skills";

        const summary = `${name} is a ${role} with experience and practical knowledge in ${skills}. Focused on building reliable solutions, applying technical skills to real-world projects, and continuously improving through hands-on learning and development.`;

        setGeneratedSummary(summary);

        setSuggestions([
            {
                id: "summary",
                title: "Professional Summary",
                content: summary,
                accepted: true,
            },
            {
                id: "skills",
                title: "ATS-Friendly Skills",
                content:
                    selectedSkills.length > 0
                        ? `Organize your skills around your target role: ${selectedSkills.join(
                              ", "
                          )}.`
                        : "Add the skills you genuinely have and organize them into clear ATS-friendly categories.",
                accepted: true,
            },
            {
                id: "experience",
                title: "Experience & Impact",
                content:
                    form.experience.trim()
                        ? "Your experience can be rewritten into concise achievement-focused bullets using actions, technologies, and measurable outcomes where the information supports them."
                        : "Add your internship, work, freelance, or relevant practical experience. Do not add experience you do not actually have.",
                accepted: true,
            },
            {
                id: "projects",
                title: "Relevant Projects",
                content:
                    form.projects.trim()
                        ? "Your projects can be presented with the problem solved, your contribution, technologies used, and measurable results where available."
                        : "Add relevant academic, personal, or portfolio projects that demonstrate skills for your target role.",
                accepted: true,
            },
        ]);

        setHasGenerated(true);
        setStep(3);
        setIsGenerating(false);
    };

    const toggleSuggestion = (id) => {
        setSuggestions((previous) =>
            previous.map((suggestion) =>
                suggestion.id === id
                    ? {
                          ...suggestion,
                          accepted: !suggestion.accepted,
                      }
                    : suggestion
            )
        );
    };

    const selectedSuggestionIds = useMemo(
        () =>
            suggestions
                .filter((suggestion) => suggestion.accepted)
                .map((suggestion) => suggestion.id),
        [suggestions]
    );

    const finalSkills = useMemo(
        () => [...new Set(selectedSkills)],
        [selectedSkills]
    );

    const canContinueFromStepOne =
        form.name.trim() &&
        form.email.trim() &&
        form.targetRole.trim();

    const resetBuilder = () => {
        setForm(initialForm);
        setSelectedSkills([]);
        setCustomSkills([]);
        setCustomSkillInput("");
        setStep(1);
        setHasGenerated(false);
        setGeneratedSummary("");
        setSuggestions(defaultSuggestions);
    };

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <div className="flex items-center justify-between gap-4 mb-7">
                <Link
                    to="/resume-analyzer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Resume Analyzer
                </Link>

                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                    <span
                        className={
                            step >= 1 ? "text-primary" : "text-gray-600"
                        }
                    >
                        1. Details
                    </span>

                    <span>•</span>

                    <span
                        className={
                            step >= 2 ? "text-primary" : "text-gray-600"
                        }
                    >
                        2. Skills
                    </span>

                    <span>•</span>

                    <span
                        className={
                            step >= 3 ? "text-primary" : "text-gray-600"
                        }
                    >
                        3. AI Suggestions
                    </span>

                    <span>•</span>

                    <span
                        className={
                            step >= 4 ? "text-primary" : "text-gray-600"
                        }
                    >
                        4. Resume
                    </span>
                </div>
            </div>

            <div className="mb-8">
                <p className="text-primary text-sm font-semibold mb-2">
                    AI + ATS
                </p>

                <h1 className="text-3xl font-bold text-white">
                    AI Resume Builder
                </h1>

                <p className="text-gray-500 mt-2 max-w-3xl">
                    Tell the AI what you actually know, what you have built,
                    and what role you want. It will help organize your
                    information into an ATS-friendly resume without inventing
                    experience.
                </p>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
                <div className="space-y-6">
                    <Section
                        title="Personal Information"
                        description="Add the contact details you want to show on your resume."
                        icon={User}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                label="Full Name *"
                                value={form.name}
                                onChange={(value) =>
                                    updateField("name", value)
                                }
                                placeholder="e.g. Aarav Sharma"
                            />

                            <Input
                                label="Email *"
                                value={form.email}
                                onChange={(value) =>
                                    updateField("email", value)
                                }
                                placeholder="you@example.com"
                                type="email"
                            />

                            <Input
                                label="Phone"
                                value={form.phone}
                                onChange={(value) =>
                                    updateField("phone", value)
                                }
                                placeholder="+91 98765 43210"
                            />

                            <Input
                                label="Location"
                                value={form.location}
                                onChange={(value) =>
                                    updateField("location", value)
                                }
                                placeholder="Delhi, India"
                            />

                            <Input
                                label="LinkedIn"
                                value={form.linkedin}
                                onChange={(value) =>
                                    updateField("linkedin", value)
                                }
                                placeholder="linkedin.com/in/yourname"
                            />

                            <Input
                                label="GitHub / Portfolio"
                                value={form.github}
                                onChange={(value) =>
                                    updateField("github", value)
                                }
                                placeholder="github.com/yourname"
                            />
                        </div>
                    </Section>

                    <Section
                        title="Professional Direction"
                        description="Tell the builder what kind of role you are targeting."
                        icon={BriefcaseBusiness}
                    >
                        <div className="space-y-5">
                            <Input
                                label="Target Job Title *"
                                value={form.targetRole}
                                onChange={(value) =>
                                    updateField("targetRole", value)
                                }
                                placeholder="e.g. Frontend Developer"
                            />

                            <TextArea
                                label="Tell the AI about yourself"
                                value={form.about}
                                onChange={(value) =>
                                    updateField("about", value)
                                }
                                rows={6}
                                placeholder={`Example:

I am a final-year B.Tech student.
I know React, JavaScript, HTML and CSS.
I built a student learning assistant using React.
I completed a frontend internship.
I am applying for frontend developer roles.`}
                            />

                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />

                                    <div>
                                        <p className="text-sm font-semibold text-white">
                                            Tell the AI only what is true
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1 leading-5">
                                            The builder should use your actual
                                            skills, projects, education and
                                            experience. It should never add a
                                            technology just because it appears
                                            in a job description.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Experience, Projects & Education"
                        description="You can write rough notes. The builder will organize them later."
                        icon={FileText}
                    >
                        <div className="space-y-5">
                            <TextArea
                                label="Experience"
                                value={form.experience}
                                onChange={(value) =>
                                    updateField("experience", value)
                                }
                                rows={6}
                                placeholder={`Example:

Frontend Intern — ABC Technologies
June 2026 – August 2026
Worked on React UI components and integrated REST APIs.
Improved page responsiveness and reusable components.`}
                            />

                            <TextArea
                                label="Projects"
                                value={form.projects}
                                onChange={(value) =>
                                    updateField("projects", value)
                                }
                                rows={6}
                                placeholder={`Example:

AI Learning Assistant
Built a React-based learning platform for PDFs, flashcards and quizzes.
Technologies: React, JavaScript, Tailwind CSS.`}
                            />

                            <TextArea
                                label="Education"
                                value={form.education}
                                onChange={(value) =>
                                    updateField("education", value)
                                }
                                rows={4}
                                placeholder="B.Tech Computer Science — XYZ University — 2023–2027"
                            />

                            <TextArea
                                label="Certifications"
                                value={form.certifications}
                                onChange={(value) =>
                                    updateField("certifications", value)
                                }
                                rows={3}
                                placeholder="Certification name — Organization — Year"
                            />

                            <TextArea
                                label="Achievements"
                                value={form.achievements}
                                onChange={(value) =>
                                    updateField("achievements", value)
                                }
                                rows={3}
                                placeholder="Hackathons, awards, leadership, competitions, etc."
                            />
                        </div>
                    </Section>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            disabled={!canContinueFromStepOne}
                            onClick={() => setStep(2)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            Continue to Skills
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <div className="space-y-6">
                    <Section
                        title="Your Skills"
                        description="Select skills you genuinely know. You can also add your own."
                        icon={Code2}
                    >
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                    Suggested skills
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {skillSuggestions.map((skill) => (
                                        <SkillPill
                                            key={skill}
                                            skill={skill}
                                            selected={selectedSkills.includes(
                                                skill
                                            )}
                                            onClick={() =>
                                                toggleSkill(skill)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>

                            {customSkills.length > 0 && (
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-600 mb-3">
                                        Your custom skills
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {customSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary"
                                            >
                                                {skill}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeCustomSkill(
                                                            skill
                                                        )
                                                    }
                                                    className="hover:text-white"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    value={customSkillInput}
                                    onChange={(event) =>
                                        setCustomSkillInput(
                                            event.target.value
                                        )
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            addCustomSkill();
                                        }
                                    }}
                                    placeholder="Add another skill..."
                                    className="flex-1 bg-[#101216] border border-[#30353E] rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary/50"
                                />

                                <button
                                    type="button"
                                    onClick={addCustomSkill}
                                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#3A404A] text-sm text-gray-300 hover:text-white hover:bg-[#292E36]"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Skill
                                </button>
                            </div>

                            <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/15">
                                <p className="text-sm text-gray-400 leading-6">
                                    Only select a skill if you can honestly
                                    support it with a project, internship,
                                    coursework, certification, professional
                                    experience, or another credible source.
                                </p>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Optional Job Description"
                        description="Adding the JD lets the future AI backend tailor the resume to the role."
                        icon={BriefcaseBusiness}
                    >
                        <TextArea
                            label="Job Description"
                            value={form.jobDescription}
                            onChange={(value) =>
                                updateField("jobDescription", value)
                            }
                            rows={8}
                            placeholder="Paste the job description here..."
                        />
                    </Section>

                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-5 py-3 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:text-white hover:bg-[#292E36]"
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            onClick={generateSuggestions}
                            disabled={isGenerating}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 disabled:opacity-40 transition-colors"
                        >
                            <Sparkles className="w-4 h-4" />

                            {isGenerating
                                ? "Generating Suggestions..."
                                : "Generate AI Suggestions"}
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
                <div className="space-y-6">
                    <Section
                        title="AI Resume Suggestions"
                        description="Review what the AI recommends before creating your resume."
                        icon={Sparkles}
                    >
                        <div className="space-y-4">
                            {suggestions.map((suggestion) => (
                                <div
                                    key={suggestion.id}
                                    className={`rounded-2xl border p-5 transition-colors ${
                                        suggestion.accepted
                                            ? "border-primary/25 bg-primary/5"
                                            : "border-[#30353E] bg-[#20242B]"
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#20242B] border border-[#30353E] flex items-center justify-center">
                                                {suggestion.accepted ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                ) : (
                                                    <Pencil className="w-4 h-4 text-gray-500" />
                                                )}
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-white">
                                                    {suggestion.title}
                                                </h3>

                                                <p className="text-sm text-gray-400 mt-2 leading-6">
                                                    {suggestion.content}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleSuggestion(
                                                    suggestion.id
                                                )
                                            }
                                            className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium ${
                                                suggestion.accepted
                                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                    : "bg-[#292E36] text-gray-400 border border-[#3A404A]"
                                            }`}
                                        >
                                            {suggestion.accepted
                                                ? "Use"
                                                : "Skipped"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <div className="p-5 rounded-2xl bg-[#181B21] border border-[#292D36]">
                        <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-primary mt-0.5" />

                            <div>
                                <h3 className="text-sm font-semibold text-white">
                                    Before generating
                                </h3>

                                <p className="text-sm text-gray-500 mt-1 leading-6">
                                    Check every suggestion. If something is
                                    not true about your experience, skip or
                                    edit it. The final resume should represent
                                    you accurately.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-5 py-3 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:text-white hover:bg-[#292E36]"
                        >
                            Back to Skills
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(4)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            Build ATS Resume
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-gray-400">
                                Your ATS-friendly resume preview
                            </p>

                            <p className="text-xs text-gray-600 mt-1">
                                Accepted AI sections:{" "}
                                {selectedSuggestionIds.length}
                            </p>
                        </div>

                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-sm text-gray-500 opacity-60 cursor-not-allowed"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    </div>

                    <div className="bg-white text-gray-900 rounded-xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="border-b border-gray-300 pb-5">
                            <h1 className="text-3xl font-bold">
                                {form.name || "Your Name"}
                            </h1>

                            <p className="text-base text-gray-700 mt-1">
                                {form.targetRole || "Target Job Title"}
                            </p>

                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-3">
                                {form.email && <span>{form.email}</span>}
                                {form.phone && <span>{form.phone}</span>}
                                {form.location && (
                                    <span>{form.location}</span>
                                )}
                                {form.linkedin && (
                                    <span>{form.linkedin}</span>
                                )}
                                {form.github && (
                                    <span>{form.github}</span>
                                )}
                            </div>
                        </div>

                        {/* Summary */}
                        {selectedSuggestionIds.includes("summary") && (
                            <div className="mt-7">
                                <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                    Professional Summary
                                </h2>

                                <p className="text-sm leading-6 mt-3">
                                    {generatedSummary ||
                                        form.about ||
                                        "Professional summary will appear here."}
                                </p>
                            </div>
                        )}

                        {/* Skills */}
                        {selectedSuggestionIds.includes("skills") && (
                            <div className="mt-7">
                                <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                    Skills
                                </h2>

                                <p className="text-sm leading-6 mt-3">
                                    {finalSkills.length > 0
                                        ? finalSkills.join(" • ")
                                        : "Add your skills"}
                                </p>
                            </div>
                        )}

                        {/* Experience */}
                        {selectedSuggestionIds.includes("experience") &&
                            form.experience.trim() && (
                                <div className="mt-7">
                                    <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                        Experience
                                    </h2>

                                    <div className="text-sm leading-6 mt-3 whitespace-pre-line">
                                        {form.experience}
                                    </div>
                                </div>
                            )}

                        {/* Projects */}
                        {selectedSuggestionIds.includes("projects") &&
                            form.projects.trim() && (
                                <div className="mt-7">
                                    <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                        Projects
                                    </h2>

                                    <div className="text-sm leading-6 mt-3 whitespace-pre-line">
                                        {form.projects}
                                    </div>
                                </div>
                            )}

                        {/* Education */}
                        {form.education.trim() && (
                            <div className="mt-7">
                                <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                    Education
                                </h2>

                                <div className="text-sm leading-6 mt-3 whitespace-pre-line">
                                    {form.education}
                                </div>
                            </div>
                        )}

                        {/* Certifications */}
                        {form.certifications.trim() && (
                            <div className="mt-7">
                                <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                    Certifications
                                </h2>

                                <div className="text-sm leading-6 mt-3 whitespace-pre-line">
                                    {form.certifications}
                                </div>
                            </div>
                        )}

                        {/* Achievements */}
                        {form.achievements.trim() && (
                            <div className="mt-7">
                                <h2 className="text-sm font-bold uppercase tracking-[0.16em]">
                                    Achievements
                                </h2>

                                <div className="text-sm leading-6 mt-3 whitespace-pre-line">
                                    {form.achievements}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-3 pb-5">
                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="px-5 py-3 rounded-xl border border-[#30353E] text-sm text-gray-400 hover:text-white hover:bg-[#292E36]"
                        >
                            Edit Suggestions
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-purple-500 transition-colors"
                        >
                            <Sparkles className="w-4 h-4" />
                            Start New Resume
                        </button>
                    </div>
                </div>
            )}

            {!hasGenerated && step === 1 && (
                <div className="hidden">
                    {resetBuilder}
                </div>
            )}
        </div>
    );
}