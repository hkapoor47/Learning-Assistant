import React from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    Brain,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Code2,
    Eye,
    Flame,
    Play,
    Sparkles,
    Target,
} from "lucide-react";

const DSAPracticePage = () => {
    const navigate = useNavigate();

    const modes = [
        {
            title: "Problem Solver",
            description:
                "Solve real DSA problems with hints, test cases, and step-by-step guidance.",
            icon: Code2,
            path: "/dsa/problem",
        },
        {
            title: "Algorithm Visualizer",
            description:
                "Understand algorithms by watching them execute step by step.",
            icon: Eye,
            path: "/dsa/visualizer",
        },
        {
            title: "AI DSA Coach",
            description:
                "Ask questions, understand concepts, and get guided help while learning.",
            icon: Brain,
            path: "/dsa/coach",
        },
        {
            title: "DSA Progress",
            description:
                "Track solved problems, accuracy, topics, and your learning progress.",
            icon: BarChart3,
            path: "/dsa/progress",
        },
    ];

    return (
        <div className="min-h-screen bg-[#0F1115] text-[#F5F5F5]">
            <div className="mx-auto max-w-[1380px] px-6 py-8 lg:px-10">
                {/* Back */}
                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-7 flex items-center gap-2 text-sm text-[#8E96A8] transition hover:text-white"
                >
                    <ArrowLeft size={17} />
                    Back to Dashboard
                </button>

                {/* HERO */}
                <section className="relative overflow-hidden rounded-2xl border border-[#292D36] bg-[#181B21] px-7 py-7 lg:px-9 lg:py-8">
                    {/* subtle glow */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left */}
                        <div className="max-w-2xl">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
                                    <Code2 size={17} className="text-[#A78BFA]" />
                                </div>

                                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A78BFA]">
                                    DSA Lab
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight lg:text-[38px]">
                                Practice DSA.{" "}
                                <span className="text-[#A78BFA]">
                                    Build problem-solving skills.
                                </span>
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8E96A8] lg:text-[15px]">
                                Solve coding problems, understand algorithms, visualize
                                execution, and improve through guided practice.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 lg:min-w-[360px]">
                            <div className="rounded-xl border border-[#292D36] bg-[#20242B]/70 px-5 py-4 text-center">
                                <div className="text-2xl font-bold">42</div>
                                <div className="mt-1 text-xs text-[#737B8C]">
                                    Solved
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#292D36] bg-[#20242B]/70 px-5 py-4 text-center">
                                <div className="text-2xl font-bold">68%</div>
                                <div className="mt-1 text-xs text-[#737B8C]">
                                    Accuracy
                                </div>
                            </div>

                            <div className="rounded-xl border border-[#292D36] bg-[#20242B]/70 px-5 py-4 text-center">
                                <div className="text-2xl font-bold">7</div>
                                <div className="mt-1 text-xs text-[#737B8C]">
                                    Topics
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTINUE PRACTICE */}
                <section className="mt-8">
                    <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                            Continue Practice
                        </p>

                        <h2 className="mt-1 text-xl font-semibold">
                            Pick up where you left off
                        </h2>
                    </div>

                    <div className="group rounded-2xl border border-[#292D36] bg-[#181B21] p-5 transition duration-200 hover:border-[#3A404A] hover:bg-[#1D2128]">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#3A3155] bg-[#8B5CF6]/10">
                                    <Target size={21} className="text-[#A78BFA]" />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-base font-semibold">
                                            Two Pointer — Pair Sum
                                        </h3>

                                        <span className="rounded-md bg-[#20242B] px-2 py-1 text-xs text-[#8E96A8]">
                                            Arrays
                                        </span>

                                        <span className="rounded-md bg-[#20242B] px-2 py-1 text-xs text-[#8E96A8]">
                                            Medium
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-[#737B8C]">
                                        Continue solving your current DSA challenge.
                                    </p>

                                    <div className="mt-4 flex items-center gap-3">
                                        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#292D36]">
                                            <div className="h-full w-[65%] rounded-full bg-[#8B5CF6]" />
                                        </div>

                                        <span className="text-xs text-[#737B8C]">
                                            65% complete
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/dsa/problem")}
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7C4FE5]"
                            >
                                Continue
                                <ArrowRight size={17} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* MODES */}
                <section className="mt-9">
                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                            Learn & Practice
                        </p>

                        <h2 className="mt-1 text-xl font-semibold">
                            Choose Your Mode
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {modes.map((mode) => {
                            const Icon = mode.icon;

                            return (
                                <button
                                    key={mode.title}
                                    onClick={() => navigate(mode.path)}
                                    className="group relative overflow-hidden rounded-2xl border border-[#292D36] bg-[#181B21] p-6 text-left transition duration-200 hover:border-[#3A404A] hover:bg-[#1D2128]"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A3155] bg-[#8B5CF6]/10">
                                            <Icon
                                                size={21}
                                                className="text-[#A78BFA]"
                                            />
                                        </div>

                                        <ArrowRight
                                            size={19}
                                            className="text-[#596171] transition group-hover:translate-x-1 group-hover:text-[#A78BFA]"
                                        />
                                    </div>

                                    <h3 className="mt-5 text-base font-semibold">
                                        {mode.title}
                                    </h3>

                                    <p className="mt-2 max-w-md text-sm leading-6 text-[#737B8C]">
                                        {mode.description}
                                    </p>

                                    <div className="mt-5 text-xs font-medium text-[#8E96A8] transition group-hover:text-[#A78BFA]">
                                        Open {mode.title}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* DAILY CHALLENGE */}
                <section className="mt-9 pb-8">
                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                            Daily Challenge
                        </p>

                        <h2 className="mt-1 text-xl font-semibold">
                            Keep your streak going
                        </h2>
                    </div>

                    <div className="rounded-2xl border border-[#292D36] bg-[#181B21] p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20242B]">
                                    <Flame
                                        size={21}
                                        className="text-[#A78BFA]"
                                    />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-base font-semibold">
                                            Valid Parentheses
                                        </h3>

                                        <span className="rounded-md bg-[#20242B] px-2 py-1 text-xs text-[#8E96A8]">
                                            Stack
                                        </span>

                                        <span className="flex items-center gap-1 text-xs text-[#737B8C]">
                                            <Clock3 size={13} />
                                            ~15 min
                                        </span>
                                    </div>

                                    <p className="mt-2 text-sm text-[#737B8C]">
                                        Test your understanding of stacks with today's
                                        challenge.
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-xs text-[#737B8C]">
                                        <CalendarDays size={14} />
                                        Daily practice
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/dsa/problem")}
                                className="flex items-center justify-center gap-2 rounded-xl border border-[#3A404A] bg-[#20242B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#292E36]"
                            >
                                <Play size={16} />
                                Start Challenge
                            </button>
                        </div>
                    </div>
                </section>

                {/* Small learning reminder */}
                <div className="flex items-center justify-center gap-2 pb-4 text-xs text-[#596171]">
                    <CheckCircle2 size={14} />
                    Solve consistently. Understand deeply. Improve gradually.
                </div>
            </div>
        </div>
    );
};

export default DSAPracticePage;