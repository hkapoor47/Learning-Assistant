import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Flag,
} from "lucide-react";

const quizData = {
    1: {
        title: "Machine Learning — Hard",
        difficulty: "Hard",
        questions: [
            {
                question:
                    "A model gets 99% training accuracy and 71% validation accuracy. After adding L2 regularization, training accuracy drops to 95% while validation accuracy rises to 84%. What is the strongest interpretation?",
                options: [
                    "The regularized model has reduced overfitting.",
                    "The validation set is now identical to the training set.",
                    "The model must have become underfit because training accuracy fell.",
                    "L2 regularization increases model variance by design.",
                ],
                answer: 0,
                explanation:
                    "Training performance fell while validation performance improved, which is consistent with reduced overfitting.",
            },
            {
                question:
                    "You preprocess a full dataset with a learned scaler before splitting into train and validation sets. What is the main methodological problem?",
                options: [
                    "The scaler cannot be used with linear models.",
                    "Statistics from validation data can leak into training preprocessing.",
                    "Scaling always lowers model accuracy.",
                    "Validation sets must contain raw, unscaled values.",
                ],
                answer: 1,
                explanation:
                    "Fitting the scaler before the split allows validation-set statistics to influence the learned transformation.",
            },
            {
                question:
                    "For a highly imbalanced binary classifier, accuracy remains 96% while the minority-class recall is only 18%. Which change most directly targets the stated weakness?",
                options: [
                    "Track recall or PR-AUC and adjust the decision threshold.",
                    "Remove the minority class so accuracy becomes more stable.",
                    "Optimize only for training accuracy.",
                    "Increase the test-set size until recall rises.",
                ],
                answer: 0,
                explanation:
                    "Recall measures how many minority-class positives are recovered, and threshold or metric selection can directly address that objective.",
            },
            {
                question:
                    "A model has low training error and high validation error. Which intervention is least directly aligned with reducing variance?",
                options: [
                    "Collect more representative training data.",
                    "Add regularization.",
                    "Use early stopping.",
                    "Increase model complexity without adding data.",
                ],
                answer: 3,
                explanation:
                    "Increasing complexity without additional signal generally does not directly address a high-variance model.",
            },
            {
                question:
                    "Cross-validation scores vary widely across folds because a rare class is unevenly distributed. Which split strategy is most appropriate for classification?",
                options: [
                    "Randomly drop the rare class.",
                    "Use stratified cross-validation.",
                    "Use only the fold with the highest score.",
                    "Shuffle labels before each fold.",
                ],
                answer: 1,
                explanation:
                    "Stratification preserves class proportions across folds and reduces avoidable distribution imbalance.",
            },
            {
                question:
                    "A feature is created using the target value from the same row that the model is later asked to predict. Why is this feature especially dangerous?",
                options: [
                    "It introduces target leakage.",
                    "It guarantees class balance.",
                    "It forces the model to become linear.",
                    "It only changes GPU memory usage.",
                ],
                answer: 0,
                explanation:
                    "Using target information from the prediction row exposes future information that would not be available at inference time.",
            },
            {
                question:
                    "Two models have similar ROC-AUC, but Model A has substantially better precision in the high-score region where alerts are triggered. Which factor matters most if false alerts are expensive?",
                options: [
                    "Precision-relevant performance in the operating region.",
                    "Only the number of model parameters.",
                    "Only training loss.",
                    "The model with the lower file size.",
                ],
                answer: 0,
                explanation:
                    "When alerts are triggered only in a high-score region, performance in that operating region is more relevant than a single global summary.",
            },
            {
                question:
                    "A feature has a strong correlation with the target in the training sample but vanishes on a later time period. What should be investigated first?",
                options: [
                    "Whether the relationship is unstable or caused by temporal leakage.",
                    "Whether the model needs a larger embedding layer.",
                    "Whether the test set should be deleted.",
                    "Whether correlation should always be maximized.",
                ],
                answer: 0,
                explanation:
                    "A relationship that disappears over time can indicate distribution shift or leakage tied to temporal ordering.",
            },
            {
                question:
                    "You need calibrated probabilities rather than only correct class rankings. Which evaluation property becomes especially important?",
                options: [
                    "Whether predicted probabilities correspond to observed frequencies.",
                    "Whether the model uses exactly two layers.",
                    "Whether the confusion matrix is perfectly symmetric.",
                    "Whether every feature is normally distributed.",
                ],
                answer: 0,
                explanation:
                    "Calibration concerns whether predicted probabilities align with observed event frequencies.",
            },
            {
                question:
                    "A model performs well offline but degrades after deployment because user behavior changes. Which concept best describes the issue?",
                options: [
                    "Distribution shift or concept drift.",
                    "Purely deterministic inference.",
                    "Database normalization.",
                    "Lossless compression.",
                ],
                answer: 0,
                explanation:
                    "Changing real-world data or relationships after deployment can cause distribution or concept drift.",
            },
        ],
    },

    2: {
        title: "Machine Learning — Medium",
        difficulty: "Medium",
        questions: [
            {
                question:
                    "Why is a validation set typically kept separate from the final test set during model development?",
                options: [
                    "Validation data helps tune choices while the test set estimates final generalization.",
                    "The validation set must always be larger than the training set.",
                    "The test set is used to update model weights every epoch.",
                    "Validation data is only needed for unsupervised learning.",
                ],
                answer: 0,
                explanation:
                    "Validation data supports development and tuning, while the untouched test set provides a cleaner final evaluation.",
            },
            {
                question:
                    "A decision tree keeps growing and perfectly fits the training examples. What is the most likely concern?",
                options: [
                    "The tree may overfit.",
                    "The tree has no features.",
                    "The tree has become unsupervised.",
                    "The training set has necessarily become linearly separable.",
                ],
                answer: 0,
                explanation:
                    "A very flexible tree can memorize training patterns and generalize poorly.",
            },
            {
                question:
                    "Which metric is usually more informative than plain accuracy when positive cases are rare and false negatives are costly?",
                options: [
                    "Recall",
                    "Number of features",
                    "Training time",
                    "Parameter count",
                ],
                answer: 0,
                explanation:
                    "Recall directly measures the fraction of actual positive cases that are detected.",
            },
            {
                question:
                    "What does a confusion matrix help you inspect?",
                options: [
                    "Class-specific prediction outcomes such as false positives and false negatives.",
                    "Only GPU utilization.",
                    "Only feature scaling statistics.",
                    "The exact neural-network architecture.",
                ],
                answer: 0,
                explanation:
                    "A confusion matrix breaks predictions into outcome categories for classification analysis.",
            },
            {
                question:
                    "Why might a practitioner standardize features before fitting some models?",
                options: [
                    "To put features on comparable numeric scales.",
                    "To guarantee no missing values.",
                    "To remove every outlier automatically.",
                    "To convert classification into clustering.",
                ],
                answer: 0,
                explanation:
                    "Standardization can prevent features with larger scales from dominating scale-sensitive algorithms.",
            },
        ],
    },

    3: {
        title: "Python — Easy",
        difficulty: "Easy",
        questions: [
            {
                question:
                    "A list contains [4, 7, 2]. Which operation returns the number of items in the list?",
                options: ["len([4, 7, 2])", "[4, 7, 2].size()", "count([4, 7, 2])", "length([4, 7, 2])"],
                answer: 0,
                explanation: "Python's built-in len function returns the number of items in a list.",
            },
            {
                question:
                    "What happens when code accesses a dictionary key that does not exist using square brackets?",
                options: [
                    "A KeyError is raised.",
                    "Python silently returns zero.",
                    "The dictionary automatically creates the key.",
                    "The program always returns None.",
                ],
                answer: 0,
                explanation: "Square-bracket access on a missing dictionary key raises KeyError.",
            },
            {
                question:
                    "What does a for loop over a list iterate through by default?",
                options: [
                    "The list's elements.",
                    "Only the list length.",
                    "Only the first element.",
                    "The dictionary keys of the list.",
                ],
                answer: 0,
                explanation: "A for loop over a list yields its elements in iteration order.",
            },
            {
                question:
                    "Which value represents the Boolean result of 5 > 2 in Python?",
                options: ["True", "False", "1.0", "None"],
                answer: 0,
                explanation: "The comparison evaluates to the Boolean value True.",
            },
            {
                question:
                    "What does a return statement do inside a function?",
                options: [
                    "Ends the current function call and can provide a value.",
                    "Restarts the function from the top.",
                    "Converts all local variables to global variables.",
                    "Creates a new Python module.",
                ],
                answer: 0,
                explanation: "return exits the current function invocation and can send a value back to the caller.",
            },
        ],
    },

    4: {
        title: "Database Management — Hard",
        difficulty: "Hard",
        questions: [
            {
                question:
                    "A transaction updates two related tables. The second update fails after the first succeeds. Which ACID property requires the database to avoid leaving only half the transaction applied?",
                options: ["Atomicity", "Isolation", "Consistency", "Durability"],
                answer: 0,
                explanation: "Atomicity requires a transaction's operations to succeed as a unit or be rolled back.",
            },
            {
                question:
                    "An index exists on a column, but a query wraps that column in a function inside its predicate. What should you investigate first when the index is not being used?",
                options: [
                    "Whether the expression prevents efficient use of the ordinary index.",
                    "Whether indexes can only be created on numeric columns.",
                    "Whether SQL forbids WHERE clauses.",
                    "Whether normalization automatically removes indexes.",
                ],
                answer: 0,
                explanation: "Expressions applied to indexed columns can prevent straightforward use of a normal index depending on the database and query plan.",
            },
            {
                question:
                    "A table has a composite primary key (StudentId, CourseId), and a non-key column depends only on StudentId. Which normal-form issue is indicated?",
                options: [
                    "A partial dependency relevant to 2NF.",
                    "A transitive dependency relevant only to 4NF.",
                    "A missing foreign key automatically violates 1NF.",
                    "A duplicate index automatically violates 3NF.",
                ],
                answer: 0,
                explanation: "A non-key attribute depending on only part of a composite key is a partial dependency, which 2NF addresses.",
            },
            {
                question:
                    "Two concurrent transactions read the same row, but one transaction cannot see the other's uncommitted update. Which isolation concern is being controlled?",
                options: [
                    "Dirty reads.",
                    "Disk fragmentation.",
                    "Schema denormalization.",
                    "Primary-key generation.",
                ],
                answer: 0,
                explanation: "Preventing visibility of uncommitted changes is specifically about dirty reads.",
            },
            {
                question:
                    "A query joins a large fact table to a small dimension table and filters strongly on the dimension. What should you inspect to understand whether the optimizer will execute efficiently?",
                options: [
                    "The query execution plan and relevant indexes/selectivity.",
                    "Only the table names.",
                    "Only the number of SQL keywords.",
                    "Whether every column is stored as text.",
                ],
                answer: 0,
                explanation: "The execution plan reveals join and scan choices, while indexes and selectivity affect cost.",
            },
        ],
    },

    5: {
        title: "Artificial Intelligence — Mixed",
        difficulty: "Mixed",
        questions: [
            {
                question:
                    "Which learning setup is designed around an agent taking actions and receiving rewards?",
                options: [
                    "Reinforcement learning",
                    "Supervised learning",
                    "Batch normalization",
                    "Static type checking",
                ],
                answer: 0,
                explanation: "Reinforcement learning models decision-making through interaction and reward signals.",
            },
            {
                question:
                    "A classifier is correct 90% of the time but misses most positive examples. Which metric should you inspect closely?",
                options: ["Recall", "File size", "Parameter count", "Training duration"],
                answer: 0,
                explanation: "Recall captures the fraction of actual positives that the model detects.",
            },
            {
                question:
                    "A search system repeatedly retrieves documents containing the exact query terms but misses semantically related wording. Which capability is missing?",
                options: ["Semantic understanding", "Disk partitioning", "Image compression", "Primary-key constraints"],
                answer: 0,
                explanation: "Semantic retrieval aims to capture meaning beyond literal keyword overlap.",
            },
            {
                question:
                    "A model's validation performance improves after adding a penalty on large weights. What technique was likely introduced?",
                options: ["L2 regularization", "Data deletion", "Label shuffling", "Target leakage"],
                answer: 0,
                explanation: "L2 regularization penalizes large weights and can reduce overfitting.",
            },
            {
                question:
                    "A deployed model receives data whose distribution has changed from training. What risk should be monitored?",
                options: ["Distribution shift", "Syntax highlighting", "Database indexing", "Static linking"],
                answer: 0,
                explanation: "A changed input distribution can reduce model performance after deployment.",
            },
        ],
    },
};

export default function QuizTakePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const quiz = quizData[id] || quizData[1];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState({});

    const question = quiz.questions[currentQuestion];
    const totalQuestions = quiz.questions.length;

    const selectedAnswer = selectedAnswers[currentQuestion];
    const answeredCount = Object.keys(selectedAnswers).length;
    const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

    const isLastQuestion = useMemo(
        () => currentQuestion === totalQuestions - 1,
        [currentQuestion, totalQuestions]
    );

    const handleSelectAnswer = (optionIndex) => {
        setSelectedAnswers((previous) => ({
            ...previous,
            [currentQuestion]: optionIndex,
        }));
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestion((previous) => previous + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((previous) => previous - 1);
        }
    };

    const toggleMarkQuestion = () => {
        setMarkedQuestions((previous) => ({
            ...previous,
            [currentQuestion]: !previous[currentQuestion],
        }));
    };

    const handleSubmit = () => {
        const score = quiz.questions.reduce(
            (total, item, index) =>
                total + (selectedAnswers[index] === item.answer ? 1 : 0),
            0
        );

        navigate(`/quizzes/${id}/result`, {
            state: { quiz, selectedAnswers, score },
        });
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <Link
                    to="/quizzes"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Quizzes
                </Link>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{quiz.difficulty === "Hard" ? "20 min" : quiz.difficulty === "Medium" ? "18 min" : "15 min"}</span>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <p className="text-primary text-sm font-semibold">
                                {quiz.difficulty.toUpperCase()} QUIZ
                            </p>
                            <span className="text-xs text-gray-600">
                                {answeredCount}/{totalQuestions} answered
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
                    </div>

                    <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/15">
                        <span className="text-lg font-bold text-primary">
                            {currentQuestion + 1}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <span className="text-xs font-medium text-gray-400">{progress}%</span>
                </div>

                <div className="h-2 bg-[#15181E] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className="bg-[#20242B] border border-[#30353E] rounded-2xl p-6 md:p-8">
                <div className="flex items-start justify-between gap-5">
                    <div className="max-w-4xl">
                        <p className="text-xs font-medium text-gray-500 mb-3">
                            QUESTION {currentQuestion + 1}
                        </p>
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 leading-relaxed">
                            {question.question}
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={toggleMarkQuestion}
                        className={`shrink-0 p-2.5 rounded-xl transition-colors ${
                            markedQuestions[currentQuestion]
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "border border-[#30353E] text-gray-500 hover:bg-[#292E36] hover:text-gray-200"
                        }`}
                        title="Mark for review"
                    >
                        <Flag className="w-4 h-4" />
                    </button>
                </div>

                <div className="mt-8 space-y-3">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleSelectAnswer(index)}
                                className={`w-full flex items-start gap-4 text-left p-4 rounded-xl border transition-all ${
                                    isSelected
                                        ? "bg-primary/10 border-primary/40 text-white"
                                        : "bg-[#181B21] border-[#30353E] text-gray-400 hover:bg-[#292E36] hover:border-[#3A404A] hover:text-gray-200"
                                }`}
                            >
                                <div
                                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                                        isSelected
                                            ? "bg-primary border-primary text-white"
                                            : "bg-[#20242B] border-[#30353E] text-gray-500"
                                    }`}
                                >
                                    {String.fromCharCode(65 + index)}
                                </div>
                                <span className="text-sm md:text-base font-medium leading-6">
                                    {option}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
                {quiz.questions.map((_, index) => {
                    const answered = selectedAnswers[index] !== undefined;
                    const marked = markedQuestions[index];
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentQuestion(index)}
                            className={`relative w-9 h-9 rounded-lg text-xs font-medium transition-all ${
                                currentQuestion === index
                                    ? "bg-primary text-white"
                                    : answered
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "bg-[#20242B] text-gray-500 border border-[#30353E] hover:bg-[#292E36]"
                            }`}
                        >
                            {index + 1}
                            {marked && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-[#181B21]" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center justify-between gap-4 mt-6">
                <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#30353E] text-gray-400 font-medium hover:bg-[#292E36] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                {isLastQuestion ? (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={answeredCount !== totalQuestions}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Submit Quiz
                        <CheckCircle2 className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={selectedAnswer === undefined}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            <p className="text-xs text-gray-600 mt-5 text-right">
                Hard mode focuses on reasoning, edge cases, and interview-style application rather than simple recall.
            </p>
        </div>
    );
}
