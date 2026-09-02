import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const QuizResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  if (!result) {
    return (
      <div className="text-center">
        <p className="text-sm text-gray-400">No result to show.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-emerald-600 text-sm font-medium mt-3"
        >
          Back to dashboard
        </button>
      </div>
    );
  }

  const { score, total } = result;
  const percentage = total ? Math.round((score / total) * 100) : 0;

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Quiz complete</h1>
      <p className="text-gray-400 mt-1">Here's how you did</p>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 mt-8">
        <p className="text-4xl font-bold text-gray-900">{percentage}%</p>
        <p className="text-sm text-gray-400 mt-2">
          {score} out of {total} correct
        </p>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-xl mt-8 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default QuizResultPage;