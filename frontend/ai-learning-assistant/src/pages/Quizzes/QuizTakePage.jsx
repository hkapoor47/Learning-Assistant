import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import quizService from '../../services/quizService';

const QuizTakePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizService.getQuizById(id);
        setQuiz(data?.data ?? data);
      } catch (err) {
        toast.error(err.message || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const data = await quizService.submitQuiz(id, answers);
      const result = data?.data ?? data;
      navigate(`/quizzes/${id}/result`, { state: { result } });
    } catch (err) {
      toast.error(err.message || 'Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-sm text-gray-400">Loading quiz...</p>;
  if (!quiz) return <p className="text-sm text-gray-400">Quiz not found.</p>;

  const questions = quiz.questions ?? [];
  const allAnswered = questions.every((q) => answers[q._id] !== undefined);

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">{quiz.title || 'Quiz'}</h1>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={q._id} className="bg-white border border-gray-100 rounded-2xl p-6">
            <p className="text-sm font-medium text-gray-900 mb-4">
              {qIndex + 1}. {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => (
                <button
                  key={oIndex}
                  onClick={() => selectAnswer(q._id, oIndex)}
                  className={`w-full text-left text-sm px-4 py-3 rounded-xl border transition-colors ${
                    answers[q._id] === oIndex
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium py-3 rounded-xl mt-8 transition-colors"
      >
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default QuizTakePage;