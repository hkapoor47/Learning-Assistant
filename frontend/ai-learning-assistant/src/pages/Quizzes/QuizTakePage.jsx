import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Clock,
    Flag,
    HelpCircle,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Existing Quiz Data
|--------------------------------------------------------------------------
*/

const quizData = {
    1: {
        id: 1,
        title: "Machine Learning Quiz",
        topic: "Machine Learning",
        difficulty: "Hard",
        questionsCount: 10,
        duration: 15,
        questions: [
            {
                id: 1,
                question:
                    "Which technique is most appropriate for reducing overfitting in a complex machine learning model?",
                options: [
                    "Increasing model complexity",
                    "Using regularization",
                    "Removing validation data",
                    "Increasing the learning rate",
                ],
                correctAnswer: 1,
                explanation:
                    "Regularization penalizes overly complex models and helps improve generalization to unseen data.",
            },
            {
                id: 2,
                question:
                    "What is the main purpose of a validation dataset?",
                options: [
                    "To train the model parameters",
                    "To permanently store predictions",
                    "To tune model settings and evaluate generalization during development",
                    "To replace the training dataset",
                ],
                correctAnswer: 2,
                explanation:
                    "The validation set is used during development to compare configurations and tune hyperparameters without using the final test set.",
            },
            {
                id: 3,
                question:
                    "Which algorithm is commonly used for dimensionality reduction?",
                options: [
                    "PCA",
                    "Linear Regression",
                    "K-Means",
                    "Naive Bayes",
                ],
                correctAnswer: 0,
                explanation:
                    "Principal Component Analysis (PCA) transforms high-dimensional data into a smaller number of principal components.",
            },
            {
                id: 4,
                question:
                    "In gradient descent, what happens when the learning rate is too large?",
                options: [
                    "Training always becomes faster and stable",
                    "The model may overshoot the minimum",
                    "The model cannot calculate gradients",
                    "The dataset becomes smaller",
                ],
                correctAnswer: 1,
                explanation:
                    "A very large learning rate can cause updates to jump over the minimum and prevent stable convergence.",
            },
            {
                id: 5,
                question:
                    "Which metric is generally more informative than accuracy for a highly imbalanced classification dataset?",
                options: [
                    "Precision and recall",
                    "Training time",
                    "Number of features",
                    "Batch size",
                ],
                correctAnswer: 0,
                explanation:
                    "Precision and recall provide more useful information when one class is much more common than another.",
            },
            {
                id: 6,
                question:
                    "What does cross-validation primarily help estimate?",
                options: [
                    "GPU temperature",
                    "Model performance on unseen data",
                    "Number of model parameters",
                    "Dataset file size",
                ],
                correctAnswer: 1,
                explanation:
                    "Cross-validation evaluates how a model is likely to perform on unseen data by repeatedly training and validating on different splits.",
            },
            {
                id: 7,
                question:
                    "Which situation is a common sign of underfitting?",
                options: [
                    "Excellent training and poor validation performance",
                    "Poor performance on both training and validation data",
                    "Zero training error",
                    "Very high model complexity",
                ],
                correctAnswer: 1,
                explanation:
                    "Underfitting occurs when a model is too simple or insufficiently trained to capture the underlying patterns.",
            },
            {
                id: 8,
                question:
                    "What is the main purpose of feature scaling for many machine learning algorithms?",
                options: [
                    "To remove all features",
                    "To make feature magnitudes comparable",
                    "To increase the dataset size",
                    "To guarantee perfect predictions",
                ],
                correctAnswer: 1,
                explanation:
                    "Scaling puts numerical features on comparable ranges, which can improve optimization and distance-based calculations.",
            },
            {
                id: 9,
                question:
                    "Which method can be used to handle missing numerical values?",
                options: [
                    "Imputation",
                    "Randomly deleting every row",
                    "Increasing model depth",
                    "Changing the target label",
                ],
                correctAnswer: 0,
                explanation:
                    "Imputation replaces missing values using a defined strategy such as the mean, median, or another model-based estimate.",
            },
            {
                id: 10,
                question:
                    "Why should the test dataset generally be used only at the end of model development?",
                options: [
                    "It is always smaller than the training data",
                    "It prevents the final evaluation from becoming part of model tuning",
                    "It cannot contain labels",
                    "It is only used for data cleaning",
                ],
                correctAnswer: 1,
                explanation:
                    "Keeping the test set separate gives a cleaner estimate of final generalization performance.",
            },
        ],
    },

    2: {
        id: 2,
        title: "Machine Learning Quiz",
        topic: "Machine Learning",
        difficulty: "Medium",
        questionsCount: 5,
        duration: 10,
        questions: [
            {
                id: 1,
                question:
                    "Which type of learning uses labeled training data?",
                options: [
                    "Supervised learning",
                    "Unsupervised learning",
                    "Random learning",
                    "Reinforcement-free learning",
                ],
                correctAnswer: 0,
                explanation:
                    "Supervised learning uses examples where the desired output or label is known.",
            },
            {
                id: 2,
                question:
                    "Which algorithm is commonly used for clustering?",
                options: [
                    "K-Means",
                    "Linear Regression",
                    "Logistic Regression",
                    "Naive Bayes",
                ],
                correctAnswer: 0,
                explanation:
                    "K-Means is a common unsupervised clustering algorithm.",
            },
            {
                id: 3,
                question:
                    "What does overfitting mean?",
                options: [
                    "The model performs poorly on training data",
                    "The model learns training data too closely and generalizes poorly",
                    "The model has no parameters",
                    "The model cannot learn anything",
                ],
                correctAnswer: 1,
                explanation:
                    "Overfitting occurs when a model captures training-specific patterns that do not generalize well to new data.",
            },
            {
                id: 4,
                question:
                    "Which dataset is normally used for the final unbiased evaluation?",
                options: [
                    "Training set",
                    "Validation set",
                    "Test set",
                    "Feature set",
                ],
                correctAnswer: 2,
                explanation:
                    "The test set is normally reserved for final evaluation after model development is complete.",
            },
            {
                id: 5,
                question:
                    "Which of the following is a classification task?",
                options: [
                    "Predicting whether an email is spam",
                    "Predicting house price",
                    "Predicting temperature",
                    "Predicting monthly revenue",
                ],
                correctAnswer: 0,
                explanation:
                    "Spam detection predicts a discrete class, such as spam or not spam.",
            },
        ],
    },

    3: {
        id: 3,
        title: "Python Fundamentals Quiz",
        topic: "Python",
        difficulty: "Easy",
        questionsCount: 5,
        duration: 10,
        questions: [
            {
                id: 1,
                question: "Which keyword is used to define a function in Python?",
                options: ["function", "def", "func", "define"],
                correctAnswer: 1,
                explanation:
                    "Python uses the def keyword to define functions.",
            },
            {
                id: 2,
                question:
                    "Which data type is used to store an ordered collection that can be changed?",
                options: ["Tuple", "String", "List", "Integer"],
                correctAnswer: 2,
                explanation:
                    "Lists are ordered and mutable collections in Python.",
            },
            {
                id: 3,
                question:
                    "Which symbol is used for a single-line comment in Python?",
                options: ["//", "#", "/*", "--"],
                correctAnswer: 1,
                explanation:
                    "Python uses # for single-line comments.",
            },
            {
                id: 4,
                question:
                    "What does len() return when applied to a list?",
                options: [
                    "The largest element",
                    "The number of elements",
                    "The list's memory size",
                    "The first element",
                ],
                correctAnswer: 1,
                explanation:
                    "len() returns the number of items in the list.",
            },
            {
                id: 5,
                question:
                    "Which collection stores key-value pairs?",
                options: ["List", "Tuple", "Set", "Dictionary"],
                correctAnswer: 3,
                explanation:
                    "A Python dictionary stores data as key-value pairs.",
            },
        ],
    },

    4: {
        id: 4,
        title: "Database Management Quiz",
        topic: "Database Management",
        difficulty: "Hard",
        questionsCount: 5,
        duration: 10,
        questions: [
            {
                id: 1,
                question: "What is the main purpose of normalization?",
                options: [
                    "Increase duplicate data",
                    "Reduce redundancy and improve data integrity",
                    "Remove all tables",
                    "Increase storage usage",
                ],
                correctAnswer: 1,
                explanation:
                    "Normalization organizes relational data to reduce unnecessary redundancy and improve consistency.",
            },
            {
                id: 2,
                question:
                    "Which SQL command is used to retrieve data?",
                options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
                correctAnswer: 0,
                explanation:
                    "SELECT is used to retrieve rows from one or more tables.",
            },
            {
                id: 3,
                question: "What does a primary key identify?",
                options: [
                    "A database server",
                    "A unique row in a table",
                    "A SQL query",
                    "A database user",
                ],
                correctAnswer: 1,
                explanation:
                    "A primary key uniquely identifies each row in a relational table.",
            },
            {
                id: 4,
                question:
                    "Which operation combines rows from related tables?",
                options: ["JOIN", "DROP", "TRUNCATE", "ALTER"],
                correctAnswer: 0,
                explanation:
                    "JOIN operations combine related rows from multiple tables based on a specified relationship.",
            },
            {
                id: 5,
                question:
                    "Which property of a transaction means it is treated as one indivisible unit?",
                options: [
                    "Consistency",
                    "Isolation",
                    "Atomicity",
                    "Durability",
                ],
                correctAnswer: 2,
                explanation:
                    "Atomicity means a transaction's operations are treated as an all-or-nothing unit.",
            },
        ],
    },

    5: {
        id: 5,
        title: "Artificial Intelligence Quiz",
        topic: "Artificial Intelligence",
        difficulty: "Mixed",
        questionsCount: 5,
        duration: 10,
        questions: [
            {
                id: 1,
                question:
                    "Which field focuses on enabling computers to understand human language?",
                options: [
                    "Computer Vision",
                    "Natural Language Processing",
                    "Database Systems",
                    "Operating Systems",
                ],
                correctAnswer: 1,
                explanation:
                    "Natural Language Processing focuses on processing and understanding human language.",
            },
            {
                id: 2,
                question:
                    "Which technique allows a model to improve by learning from examples?",
                options: [
                    "Machine Learning",
                    "Manual compilation",
                    "File compression",
                    "Static rendering",
                ],
                correctAnswer: 0,
                explanation:
                    "Machine learning enables systems to learn patterns from data and examples.",
            },
            {
                id: 3,
                question:
                    "What is computer vision primarily concerned with?",
                options: [
                    "Understanding images and visual information",
                    "Managing databases",
                    "Compiling source code",
                    "Managing computer memory",
                ],
                correctAnswer: 0,
                explanation:
                    "Computer vision deals with extracting and understanding information from images and video.",
            },
            {
                id: 4,
                question:
                    "Which is an example of an AI application?",
                options: [
                    "Recommendation systems",
                    "A basic calculator",
                    "A simple text file",
                    "A passive storage drive",
                ],
                correctAnswer: 0,
                explanation:
                    "Recommendation systems commonly use AI and machine learning techniques to personalize results.",
            },
            {
                id: 5,
                question:
                    "What is the purpose of training an AI model?",
                options: [
                    "To learn useful patterns from data",
                    "To delete all data",
                    "To disable predictions",
                    "To remove model parameters",
                ],
                correctAnswer: 0,
                explanation:
                    "Training adjusts model parameters so the model can learn patterns from the provided data.",
            },
        ],
    },
};

/*
|--------------------------------------------------------------------------
| Local Generated Quiz
|--------------------------------------------------------------------------
|
| This is a frontend demo generator.
|
| It allows the user to type ANY topic and immediately enter a quiz.
| Later, this function can be replaced with your backend AI API.
|
|--------------------------------------------------------------------------
*/

const generatedQuestionTemplates = [
    {
        question: (topic) =>
            `What is the most useful first step when learning or solving a problem related to ${topic}?`,
        options: [
            "Identify the core concepts, requirements, and constraints",
            "Skip the fundamentals and start with the hardest problem",
            "Memorize every possible example without understanding them",
            "Avoid testing the solution until the very end",
        ],
        correctAnswer: 0,
        explanation:
            "Starting by identifying the relevant concepts, requirements, and constraints provides a clear foundation for solving problems effectively.",
    },

    {
        question: (topic) =>
            `Which approach is most useful when trying to understand ${topic} deeply?`,
        options: [
            "Only memorize definitions",
            "Connect concepts with examples and practical applications",
            "Avoid comparing related concepts",
            "Study only the easiest examples",
        ],
        correctAnswer: 1,
        explanation:
            "Connecting concepts with examples and applications helps build a deeper understanding rather than relying only on memorization.",
    },

    {
        question: (topic) =>
            `A solution involving ${topic} works for simple cases but fails for unusual inputs. What should you investigate?`,
        options: [
            "Only the user interface",
            "Edge cases and the assumptions made by the solution",
            "The font used by the application",
            "The file name only",
        ],
        correctAnswer: 1,
        explanation:
            "Failures on unusual inputs commonly require checking edge cases and assumptions against the actual requirements.",
    },

    {
        question: (topic) =>
            `When comparing two approaches related to ${topic}, which group of factors is most useful to consider?`,
        options: [
            "Correctness, constraints, performance, and maintainability",
            "Only the number of lines written",
            "Only how popular the approach sounds",
            "Only the visual appearance",
        ],
        correctAnswer: 0,
        explanation:
            "A meaningful comparison considers correctness, constraints, performance or cost, and maintainability rather than a single superficial factor.",
    },

    {
        question: (topic) =>
            `How should you verify an important claim about ${topic}?`,
        options: [
            "Accept the first explanation you see",
            "Compare it with reliable evidence, documentation, examples, or tests",
            "Assume it is true if it sounds reasonable",
            "Avoid checking conflicting information",
        ],
        correctAnswer: 1,
        explanation:
            "Important claims should be checked against reliable evidence, documentation, examples, or tests.",
    },

    {
        question: (topic) =>
            `You are building a project that uses ${topic}. What should you do before optimizing the solution?`,
        options: [
            "Make the solution more complicated immediately",
            "Confirm that the solution is correct and understand its constraints",
            "Remove testing from the project",
            "Optimize every component before defining requirements",
        ],
        correctAnswer: 1,
        explanation:
            "Correctness and constraints should be established before optimization so that improvements target a valid solution.",
    },

    {
        question: (topic) =>
            `Which practice can make work involving ${topic} easier to debug?`,
        options: [
            "Use small test cases and isolate problems systematically",
            "Change many parts of the system at once",
            "Avoid recording assumptions",
            "Test only after everything is completed",
        ],
        correctAnswer: 0,
        explanation:
            "Small test cases and systematic isolation make it easier to identify where a problem originates.",
    },

    {
        question: (topic) =>
            `If two solutions for ${topic} are both correct, what should guide the choice between them?`,
        options: [
            "Only the length of their names",
            "Relevant requirements, trade-offs, and constraints",
            "Which solution was written first",
            "Which solution has the most comments",
        ],
        correctAnswer: 1,
        explanation:
            "When multiple solutions are correct, the requirements, constraints, and relevant trade-offs help determine which approach fits the situation.",
    },

    {
        question: (topic) =>
            `What is a useful way to check whether you genuinely understand ${topic}?`,
        options: [
            "Explain it, apply it to an example, and test your understanding",
            "Read the same definition repeatedly without applying it",
            "Avoid solving problems related to it",
            "Memorize only the title of the topic",
        ],
        correctAnswer: 0,
        explanation:
            "Explaining a concept, applying it, and testing your understanding provides stronger evidence of learning than passive memorization.",
    },

    {
        question: (topic) =>
            `When studying an advanced part of ${topic}, what is generally useful?`,
        options: [
            "Ignore prerequisite concepts",
            "Connect the advanced idea to its prerequisites and practical use",
            "Avoid examples",
            "Study unrelated concepts instead",
        ],
        correctAnswer: 1,
        explanation:
            "Advanced concepts are easier to understand when connected to their prerequisites and practical applications.",
    },

    {
        question: (topic) =>
            `A result related to ${topic} looks suspicious. What is a useful next step?`,
        options: [
            "Verify the inputs, assumptions, and intermediate steps",
            "Immediately assume the result is correct",
            "Delete the result",
            "Ignore the issue if the output looks reasonable",
        ],
        correctAnswer: 0,
        explanation:
            "Checking inputs, assumptions, and intermediate steps helps determine whether a suspicious result is actually valid.",
    },

    {
        question: (topic) =>
            `Which strategy is most useful for retaining knowledge about ${topic}?`,
        options: [
            "Active recall and practice",
            "Reading without attempting recall",
            "Avoiding questions",
            "Studying only once",
        ],
        correctAnswer: 0,
        explanation:
            "Active recall and repeated practice require you to retrieve and apply knowledge, which supports learning.",
    },

    {
        question: (topic) =>
            `When a problem involving ${topic} has several possible solutions, what should you identify first?`,
        options: [
            "The exact requirements and constraints",
            "The most complicated-looking solution",
            "The solution with the longest explanation",
            "The solution with the most features regardless of need",
        ],
        correctAnswer: 0,
        explanation:
            "Requirements and constraints define what a valid solution must satisfy and help narrow the appropriate approaches.",
    },

    {
        question: (topic) =>
            `Why is testing important when working with ${topic}?`,
        options: [
            "It helps reveal whether the solution behaves as expected",
            "It guarantees that no future issue can ever occur",
            "It removes the need for requirements",
            "It makes every solution optimal",
        ],
        correctAnswer: 0,
        explanation:
            "Testing provides evidence about whether the solution behaves according to its expected requirements and cases.",
    },

    {
        question: (topic) =>
            `Which approach is most appropriate when your first attempt at a ${topic}-related problem does not work?`,
        options: [
            "Inspect the failure, revisit assumptions, and try a focused change",
            "Change everything randomly",
            "Stop checking the requirements",
            "Assume the problem cannot be solved",
        ],
        correctAnswer: 0,
        explanation:
            "A focused debugging process uses the observed failure and underlying assumptions to guide the next change.",
    },
];

function createGeneratedQuestions(topic, difficulty, count) {
    const questions = [];

    for (let i = 0; i < count; i++) {
        const template =
            generatedQuestionTemplates[i % generatedQuestionTemplates.length];

        questions.push({
            id: i + 1,
            question: template.question(topic),
            options: [...template.options],
            correctAnswer: template.correctAnswer,
            explanation: template.explanation,
            difficulty,
        });
    }

    return questions;
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

function QuizTakePage() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    /*
     * Check whether this is a generated quiz.
     */
    const generatedConfig = useMemo(() => {
        if (location.state?.generated) {
            return location.state;
        }

        const savedQuiz = sessionStorage.getItem("generatedQuiz");

        if (id === "generated" && savedQuiz) {
            try {
                return JSON.parse(savedQuiz);
            } catch {
                return null;
            }
        }

        return null;
    }, [location.state, id]);

    /*
     * Select normal quiz OR generate a custom quiz.
     */
    const quiz = useMemo(() => {
        if (generatedConfig?.generated) {
            const generatedQuestions = createGeneratedQuestions(
                generatedConfig.topic,
                generatedConfig.difficulty,
                generatedConfig.questionCount
            );

            return {
                id: "generated",
                title: `${generatedConfig.topic} Quiz`,
                topic: generatedConfig.topic,
                difficulty: generatedConfig.difficulty,
                questionsCount: generatedConfig.questionCount,
                duration:
                    generatedConfig.questionCount === 5
                        ? 10
                        : generatedConfig.questionCount === 10
                        ? 15
                        : 20,
                questions: generatedQuestions,
                generated: true,
            };
        }

        return quizData[id] || quizData[1];
    }, [id, generatedConfig]);

    /*
     * Quiz state
     */
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [markedQuestions, setMarkedQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);

    const question = quiz.questions[currentQuestion];

    const isLastQuestion =
        currentQuestion === quiz.questions.length - 1;

    const answeredCount = Object.keys(selectedAnswers).length;

    /*
     * Select answer
     */
    const selectAnswer = (optionIndex) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [question.id]: optionIndex,
        }));
    };

    /*
     * Mark/unmark question
     */
    const toggleMark = () => {
        setMarkedQuestions((prev) => {
            if (prev.includes(question.id)) {
                return prev.filter((id) => id !== question.id);
            }

            return [...prev, question.id];
        });
    };

    /*
     * Go to next question
     */
    const nextQuestion = () => {
        if (!isLastQuestion) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    /*
     * Go to previous question
     */
    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    /*
     * Calculate score
     */
    const calculateScore = () => {
        let score = 0;

        quiz.questions.forEach((item) => {
            if (selectedAnswers[item.id] === item.correctAnswer) {
                score++;
            }
        });

        return score;
    };

    /*
     * Submit quiz
     */
    const submitQuiz = () => {
        if (answeredCount !== quiz.questions.length) {
            return;
        }

        const score = calculateScore();

        navigate(`/quizzes/${quiz.generated ? "generated" : quiz.id}/result`, {
            state: {
                quiz,
                selectedAnswers,
                score,
            },
        });
    };

    /*
     * Format timer
     */
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (
        <div className="min-h-full pb-8">
            {/* Top Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
                <button
                    onClick={() => navigate("/quizzes")}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Quizzes
                </button>

                <div className="flex items-center gap-3">
                    {quiz.generated && (
                        <span className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                            Generated Quiz
                        </span>
                    )}

                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#181B21] border border-[#292D36]">
                        <Clock className="w-4 h-4 text-primary" />

                        <span className="text-sm font-semibold text-white">
                            {formatTime(timeLeft)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Quiz Heading */}
            <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
                        {quiz.topic}
                    </span>

                    <span className="text-gray-700">•</span>

                    <span className="text-xs text-gray-500">
                        {quiz.difficulty}
                    </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {quiz.title}
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Question {currentQuestion + 1} of{" "}
                    {quiz.questions.length}
                </p>
            </div>

            {/* Progress */}
            <div className="h-2 bg-[#20242B] rounded-full overflow-hidden mb-6">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{
                        width: `${
                            ((currentQuestion + 1) /
                                quiz.questions.length) *
                            100
                        }%`,
                    }}
                />
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">
                {/* Question */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-6 md:p-8">
                    {/* Question Number */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <HelpCircle className="w-5 h-5 text-primary" />
                            </div>

                            <span className="text-sm font-medium text-gray-400">
                                Question {currentQuestion + 1}
                            </span>
                        </div>

                        <button
                            onClick={toggleMark}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                                markedQuestions.includes(question.id)
                                    ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                                    : "bg-[#20242B] border-[#292D36] text-gray-500 hover:text-gray-300"
                            }`}
                        >
                            <Flag className="w-4 h-4" />

                            {markedQuestions.includes(question.id)
                                ? "Marked"
                                : "Mark for Review"}
                        </button>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                        {question.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 mt-8">
                        {question.options.map((option, index) => {
                            const isSelected =
                                selectedAnswers[question.id] === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => selectAnswer(index)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                                        isSelected
                                            ? "bg-primary/10 border-primary text-white"
                                            : "bg-[#0F1115] border-[#292D36] text-gray-400 hover:bg-[#20242B] hover:border-[#3A404A] hover:text-gray-200"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-semibold shrink-0 ${
                                                isSelected
                                                    ? "bg-primary border-primary text-white"
                                                    : "border-[#3A404A] text-gray-500"
                                            }`}
                                        >
                                            {String.fromCharCode(
                                                65 + index
                                            )}
                                        </div>

                                        <span className="text-sm md:text-base leading-relaxed">
                                            {option}
                                        </span>

                                        {isSelected && (
                                            <Check className="w-5 h-5 text-primary ml-auto shrink-0" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-[#292D36]">
                        <button
                            onClick={previousQuestion}
                            disabled={currentQuestion === 0}
                            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#20242B] border border-[#292D36] text-gray-400 hover:text-white hover:bg-[#30353E] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {!isLastQuestion ? (
                            <button
                                onClick={nextQuestion}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={submitQuiz}
                                disabled={
                                    answeredCount !==
                                    quiz.questions.length
                                }
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Submit Quiz
                                <Check className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Answer Status */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-600">
                            {answeredCount} of {quiz.questions.length}{" "}
                            questions answered
                        </p>
                    </div>
                </div>

                {/* Question Navigator */}
                <div className="bg-[#181B21] border border-[#292D36] rounded-2xl p-5 h-fit xl:sticky xl:top-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white">
                            Questions
                        </h3>

                        <span className="text-xs text-gray-600">
                            {answeredCount}/{quiz.questions.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        {quiz.questions.map((item, index) => {
                            const isAnswered =
                                selectedAnswers[item.id] !== undefined;

                            const isCurrent =
                                currentQuestion === index;

                            const isMarked =
                                markedQuestions.includes(item.id);

                            return (
                                <button
                                    key={item.id}
                                    onClick={() =>
                                        setCurrentQuestion(index)
                                    }
                                    className={`relative h-10 rounded-lg text-xs font-semibold border transition-all ${
                                        isCurrent
                                            ? "bg-primary border-primary text-white"
                                            : isAnswered
                                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                                            : "bg-[#0F1115] border-[#292D36] text-gray-500 hover:bg-[#20242B] hover:text-gray-300"
                                    }`}
                                >
                                    {index + 1}

                                    {isMarked && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="mt-5 pt-4 border-t border-[#292D36] space-y-2">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                            Current
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            Answered
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            Marked
                        </div>
                    </div>

                    {/* Submit */}
                    {answeredCount === quiz.questions.length && (
                        <button
                            onClick={submitQuiz}
                            className="w-full mt-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
                        >
                            Submit Quiz
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default QuizTakePage;