import { useEffect, useState } from 'react';
import { FileText, BookOpen, Sparkles, Clock } from 'lucide-react';
import progressService from '../../services/progressService';

const StatCard = ({ label, value, icon: Icon, bg }) => (
  <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-start justify-between">
    <div>
      <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
    </div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  </div>
);

const DashboardPage = () => {
  const [stats, setStats] = useState({ documents: 0, flashcards: 0, quizzes: 0 });
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Assumes progressController.js returns something like:
        // { data: { totalDocuments, totalFlashcards, totalQuizzes, recentActivity: [...] } }
        // Adjust the field names below to match your actual controller's response shape.
        const data = await progressService.getDashboardData();
        const payload = data?.data ?? data ?? {};

        setStats({
          documents: payload.totalDocuments ?? 0,
          flashcards: payload.totalFlashcards ?? 0,
          quizzes: payload.totalQuizzes ?? 0,
        });
        setActivity(payload.recentActivity ?? []);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB') + ', ' + d.toLocaleTimeString('en-GB');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-400 mt-1">Track your learning progress and activity</p>

      {error && (
        <div className="mt-4 text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <StatCard label="Total Documents" value={loading ? '—' : stats.documents} icon={FileText} bg="bg-blue-500" />
        <StatCard label="Total Flashcards" value={loading ? '—' : stats.flashcards} icon={BookOpen} bg="bg-pink-500" />
        <StatCard label="Total Quizzes" value={loading ? '—' : stats.quizzes} icon={Sparkles} bg="bg-emerald-500" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 mt-8 p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <Clock className="w-4 h-4 text-gray-500" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : activity.length === 0 ? (
          <p className="text-sm text-gray-400">No activity yet — open a document, flashcard set, or quiz to see it here.</p>
        ) : (
          <div className="space-y-3">
            {activity.map((item, i) => (
              <div
                key={item._id || i}
                className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4"
              >
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.action || 'Accessed Document'}: {item.title || item.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(item.createdAt || item.timestamp)}</p>
                  </div>
                </div>
                <button
                  onClick={() => item.link && (window.location.href = item.link)}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;