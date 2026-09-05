import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Brain } from "lucide-react";

const flashcardData = {
    1: {
        title: "Machine Learning",
        level: "Hard",
        cards: [
            {
                question: "A model's training accuracy is 99% but validation accuracy is 72%. What does this pattern suggest, and what evidence would you inspect next?",
                answer: "It suggests overfitting. Inspect the train/validation gap across folds, learning curves, data leakage, regularization strength, model complexity, and whether the validation split represents the deployment distribution.",
            },
            {
                question: "Why can fitting a feature scaler before a train/validation split create an optimistic evaluation?",
                answer: "The scaler learns statistics from the full dataset, so validation information influences the transformation applied during training. Fit preprocessing only on the training portion and apply the learned transform to validation/test data.",
            },
            {
                question: "When would PR-AUC be more informative than ROC-AUC for a binary classifier?",
                answer: "When the positive class is rare and the practical objective is to retrieve positives accurately. PR-AUC focuses on precision-recall behavior, which can reveal performance differences hidden by ROC-AUC under strong class imbalance.",
            },
            {
                question: "A feature is extremely predictive offline but unavailable when the prediction is made in production. What category of problem is this?",
                answer: "It is a form of data leakage caused by using information that would not be available at inference time. Remove or redesign the feature so training conditions match the real prediction workflow.",
            },
            {
                question: "Why can adding more model complexity decrease validation performance even when training loss continues to improve?",
                answer: "The more flexible model can fit noise or idiosyncrasies in the training data. Training loss can keep falling while generalization worsens, which is a classic variance/overfitting trade-off.",
            },
        ],
    },
    2: {
        title: "Python",
        level: "Medium",
        cards: [
            {
                question: "A function mutates a list passed to it, but reassigning the parameter does not change the caller's variable. What distinction explains this behavior?",
                answer: "The function receives a reference to the object. In-place mutation changes the shared list object, while rebinding the local parameter only changes what that local name points to.",
            },
            {
                question: "Why is a mutable default argument such as def f(items=[]): usually dangerous across calls?",
                answer: "The default object is created once when the function is defined, so mutations can persist between calls. Use None and create a fresh list inside the function.",
            },
            {
                question: "When would a set be preferable to a list for membership checks?",
                answer: "When fast average-case membership testing and uniqueness are more important than preserving duplicates and order. A set is hash-based and is designed for unique elements.",
            },
            {
                question: "What is the practical value of catching a specific exception instead of a bare Exception?",
                answer: "Specific exception handling narrows the failure cases the code intentionally handles and reduces the chance of masking unrelated programming errors.",
            },
            {
                question: "What does a generator provide compared with building the entire result list immediately?",
                answer: "It can produce values lazily, which can reduce peak memory usage and allow incremental processing of large or streaming inputs.",
            },
        ],
    },
    3: {
        title: "Database Management",
        level: "Hard",
        cards: [
            {
                question: "How does a partial dependency differ from a transitive dependency in relational normalization?",
                answer: "A partial dependency occurs when a non-key attribute depends on part of a composite key. A transitive dependency occurs when a non-key attribute depends on another non-key attribute.",
            },
            {
                question: "Why can an index fail to help a query even though the indexed column appears in the WHERE clause?",
                answer: "The optimizer may find another plan cheaper, or the predicate may transform the column in a way that prevents efficient use of a normal index. Selectivity, statistics, functions, and data distribution all matter.",
            },
            {
                question: "What does atomicity guarantee for a multi-step transaction?",
                answer: "The transaction's changes are treated as one unit: they are committed together or rolled back so a partial result is not left behind.",
            },
            {
                question: "What problem does an isolation level try to control?",
                answer: "It controls how concurrently executing transactions can observe one another's intermediate or committed changes, trading consistency guarantees against concurrency.",
            },
            {
                question: "Why should query performance analysis include the execution plan instead of only the SQL text?",
                answer: "The plan shows the actual or estimated access paths, join strategies, scans, and other operations the database optimizer intends to use.",
            },
        ],
    },
    4: {
        title: "Artificial Intelligence",
        level: "Mixed",
        cards: [
            {
                question: "What is the key distinction between supervised learning and reinforcement learning?",
                answer: "Supervised learning learns from labeled examples, while reinforcement learning learns through actions and reward signals generated by interaction with an environment.",
            },
            {
                question: "Why is a similarity score not sufficient evidence that a retrieval system truly understands a user's intent?",
                answer: "Similarity can reflect surface or embedding proximity without guaranteeing that the retrieved result satisfies the user's actual information need. Evaluation should include task relevance and failure cases.",
            },
            {
                question: "What is distribution shift in an ML system?",
                answer: "It is a change in the data distribution between training and deployment or across time, potentially causing a model to perform worse than it did during offline evaluation.",
            },
            {
                question: "Why can a high overall accuracy hide serious model failures?",
                answer: "Aggregate accuracy can be dominated by a majority class or easy cases. Class-specific metrics and error analysis are needed to expose minority-class and high-cost errors.",
            },
            {
                question: "What makes a good evaluation set for an AI feature?",
                answer: "It should represent realistic inputs, include difficult and failure-prone cases, define measurable success criteria, and be kept separate enough from development to provide useful evidence of generalization.",
            },
        ],
    },
};

export default function FlashcardPage() {
    const { id } = useParams();
    const set = flashcardData[id] || flashcardData[1];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [level, setLevel] = useState(set.level);

    const currentCard = set.cards[currentIndex];
    const progress = ((currentIndex + 1) / set.cards.length) * 100;

    const goToCard = (nextIndex) => {
        setCurrentIndex(nextIndex);
        setIsFlipped(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-7">
                <Link
                    to="/flashcards"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Flashcards
                </Link>

                <span className="text-xs text-gray-600">
                    Active recall · {currentIndex + 1}/{set.cards.length}
                </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-primary" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                            {set.level} level
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">{set.title} Flashcards</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Difficult cards focus on reasoning, trade-offs, debugging, and application.
                    </p>
                </div>

                <select
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    className="bg-[#181B21] border border-[#292D36] rounded-xl px-4 py-2.5 text-sm text-gray-300 outline-none"
                >
                    <option value="Hard" className="bg-[#181B21]">Hard</option>
                    <option value="Medium" className="bg-[#181B21]">Medium</option>
                    <option value="Easy" className="bg-[#181B21]">Easy</option>
                </select>
            </div>

            <div className="h-2 bg-[#15181E] rounded-full overflow-hidden mb-7">
                <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <button
                type="button"
                onClick={() => setIsFlipped((previous) => !previous)}
                className="w-full min-h-[330px] bg-[#20242B] border border-[#30353E] rounded-2xl p-7 md:p-10 flex flex-col items-center justify-center text-center hover:bg-[#292E36] hover:border-[#3A404A] transition-all"
            >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-7">
                    <BookOpen className="w-7 h-7 text-primary" />
                </div>

                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
                    {isFlipped ? "Answer" : "Question"}
                </p>

                <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed max-w-3xl mt-5">
                    {isFlipped ? currentCard.answer : currentCard.question}
                </p>

                <p className="text-sm text-gray-600 mt-8">
                    Click the card to {isFlipped ? "return to the question" : "reveal the answer"}
                </p>
            </button>

            <div className="flex items-center justify-between mt-6">
                <button
                    type="button"
                    onClick={() => goToCard(Math.max(0, currentIndex - 1))}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#30353E] text-gray-400 hover:bg-[#292E36] disabled:opacity-30 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </button>

                <span className="text-xs text-gray-600">
                    {level} mode
                </span>

                <button
                    type="button"
                    onClick={() => goToCard(Math.min(set.cards.length - 1, currentIndex + 1))}
                    disabled={currentIndex === set.cards.length - 1}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-purple-500 disabled:opacity-30 transition-colors"
                >
                    Next
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
                {set.cards.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => goToCard(index)}
                        className={`w-8 h-8 rounded-lg text-xs ${
                            currentIndex === index
                                ? "bg-primary text-white"
                                : "bg-[#20242B] border border-[#30353E] text-gray-500 hover:text-gray-200"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
