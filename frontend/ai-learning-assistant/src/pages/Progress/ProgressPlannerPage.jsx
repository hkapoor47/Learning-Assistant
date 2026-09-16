import { useState } from "react";
import {
    ArrowLeft,
    Check,
    Circle,
    Plus,
    Target,
    TrendingUp,
    BookOpen,
    Brain,
    Clock,
    ListChecks,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

const weeklyActivity = [
    { day: "Mon", sessions: 3 },
    { day: "Tue", sessions: 5 },
    { day: "Wed", sessions: 2 },
    { day: "Thu", sessions: 6 },
    { day: "Fri", sessions: 4 },
    { day: "Sat", sessions: 7 },
    { day: "Sun", sessions: 3 },
];

const initialTasks = [
    {
        id: 1,
        title: "Complete Machine Learning Quiz",
        completed: false,
    },
    {
        id: 2,
        title: "Review Python Flashcards",
        completed: true,
    },
    {
        id: 3,
        title: "Read Database Management PDF",
        completed: false,
    },
    {
        id: 4,
        title: "Practice 10 DSA Questions",
        completed: false,
    },
];

const subjects = [
    {
        name: "Machine Learning",
        progress: 72,
    },
    {
        name: "Python",
        progress: 85,
    },
    {
        name: "Database Management",
        progress: 54,
    },
    {
        name: "Artificial Intelligence",
        progress: 61,
    },
];

export default function ProgressPlannerPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTask, setNewTask] = useState("");

    const toggleTask = (id) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const addTask = () => {
        if (!newTask.trim()) return;

        setTasks((currentTasks) => [
            ...currentTasks,
            {
                id: Date.now(),
                title: newTask.trim(),
                completed: false,
            },
        ]);

        setNewTask("");
        setShowAddTask(false);
    };

    const completedTasks = tasks.filter((task) => task.completed).length;

    return (
        <div className="min-h-full pb-10">
            {/* Header */}
            <div className="mb-8">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm mb-5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <p className="text-primary text-sm font-semibold mb-2">
                    LEARNING TRACKER
                </p>

                <h1 className="text-3xl font-bold text-white">
                    Progress & Planner
                </h1>

                <p className="text-gray-500 mt-2 max-w-2xl">
                    Track your weekly learning activity, manage your study
                    tasks, and see how you are progressing.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-primary" />
                        </div>

                        <span className="text-xs text-green-400">
                            +12% this week
                        </span>
                    </div>

                    <p className="text-gray-500 text-sm">
                        Overall Progress
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-1">
                        68%
                    </h2>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-primary" />
                    </div>

                    <p className="text-gray-500 text-sm">
                        Study Sessions
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-1">
                        30
                    </h2>

                    <p className="text-gray-600 text-xs mt-1">
                        This week
                    </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                        <Brain className="w-5 h-5 text-primary" />
                    </div>

                    <p className="text-gray-500 text-sm">
                        Quiz Accuracy
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-1">
                        78%
                    </h2>

                    <p className="text-gray-600 text-xs mt-1">
                        62 / 80 correct
                    </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                        <BookOpen className="w-5 h-5 text-primary" />
                    </div>

                    <p className="text-gray-500 text-sm">
                        Flashcards Studied
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-1">
                        86
                    </h2>

                    <p className="text-gray-600 text-xs mt-1">
                        This week
                    </p>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Weekly Activity */}
                <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Weekly Activity
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Your learning activity over the last 7 days.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            Study sessions
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-3 px-2">
                        {weeklyActivity.map((item) => {
                            const height = `${(item.sessions / 7) * 100}%`;

                            return (
                                <div
                                    key={item.day}
                                    className="flex-1 h-full flex flex-col items-center justify-end gap-3"
                                >
                                    <div className="w-full max-w-10 h-full flex items-end">
                                        <div
                                            className="w-full rounded-t-lg bg-primary/70 hover:bg-primary transition-colors"
                                            style={{ height }}
                                            title={`${item.sessions} sessions`}
                                        />
                                    </div>

                                    <span className="text-xs text-gray-500">
                                        {item.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Weekly Goal */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                            <Target className="w-5 h-5 text-primary" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                Weekly Goal
                            </h2>

                            <p className="text-xs text-gray-500">
                                Keep your momentum going
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-2">
                        Study for 10 sessions
                    </p>

                    <div className="h-2 bg-[#292D36] rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: "70%" }}
                        />
                    </div>

                    <div className="flex justify-between text-xs">
                        <span className="text-gray-400">
                            7 / 10 sessions
                        </span>

                        <span className="text-primary">
                            3 remaining
                        </span>
                    </div>

                    <div className="mt-6 pt-5 border-t border-border">
                        <p className="text-xs text-gray-600">
                            Complete 3 more study sessions to reach your
                            weekly goal.
                        </p>
                    </div>
                </div>

                {/* To-Do List */}
                <div className="xl:col-span-2 bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <div className="flex items-center gap-2">
                                <ListChecks className="w-5 h-5 text-primary" />

                                <h2 className="text-lg font-semibold text-white">
                                    Today's Tasks
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                                {completedTasks} of {tasks.length} tasks
                                completed.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowAddTask(true)}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-gray-300 hover:bg-[#292D36] hover:text-white transition-colors text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            Add Task
                        </button>
                    </div>

                    {/* Add Task */}
                    {showAddTask && (
                        <div className="mb-4 p-4 rounded-xl bg-[#20242B] border border-border">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) =>
                                        setNewTask(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            addTask();
                                        }
                                    }}
                                    placeholder="Enter a study task..."
                                    autoFocus
                                    className="flex-1 bg-[#181B21] border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 outline-none focus:border-primary"
                                />

                                <button
                                    onClick={addTask}
                                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                                >
                                    Add
                                </button>

                                <button
                                    onClick={() => {
                                        setShowAddTask(false);
                                        setNewTask("");
                                    }}
                                    className="w-10 flex items-center justify-center rounded-lg border border-border text-gray-500 hover:bg-[#292D36] hover:text-white transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        {tasks.map((task) => (
                            <button
                                key={task.id}
                                onClick={() => toggleTask(task.id)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-[#20242B] transition-colors"
                            >
                                {task.completed ? (
                                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                ) : (
                                    <Circle className="w-5 h-5 text-gray-600 shrink-0" />
                                )}

                                <span
                                    className={`text-sm ${
                                        task.completed
                                            ? "text-gray-600 line-through"
                                            : "text-gray-300"
                                    }`}
                                >
                                    {task.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Subject Progress */}
                <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white">
                        Subject Progress
                    </h2>

                    <p className="text-sm text-gray-500 mt-1 mb-6">
                        Your current learning progress.
                    </p>

                    <div className="space-y-5">
                        {subjects.map((subject) => (
                            <div key={subject.name}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-300">
                                        {subject.name}
                                    </span>

                                    <span className="text-xs text-gray-500">
                                        {subject.progress}%
                                    </span>
                                </div>

                                <div className="h-2 bg-[#292D36] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary rounded-full"
                                        style={{
                                            width: `${subject.progress}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Info */}
            <div className="mt-6 bg-card border border-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Keep learning consistently
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                            Your progress will become more accurate once
                            real learning activity is connected to the
                            backend.
                        </p>
                    </div>

                    <div className="text-sm text-primary">
                        7 day streak
                    </div>
                </div>
            </div>
        </div>
    );
}