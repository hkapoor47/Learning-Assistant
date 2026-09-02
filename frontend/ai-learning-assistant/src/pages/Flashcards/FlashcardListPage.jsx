import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import flashcardService from '../../services/flashcardService';

const FlashcardListPage = () => {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        // Assumes flashcards come back grouped by document, e.g.
        // [{ documentId, documentTitle, cards: [...] }]
        // If your API returns a flat list instead, adjust the grouping here.
        const data = await flashcardService.getAllFlashcardSets();
        setSets(data?.data ?? data ?? []);
      } catch (err) {
        toast.error(err.message || 'Failed to load flashcards');
      } finally {
        setLoading(false);
      }
    };
    fetchFlashcards();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-400">Loading flashcards...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Flashcards</h1>
      <p className="text-gray-400 mt-1">Review flashcards generated from your documents</p>

      {sets.length === 0 ? (
        <p className="text-sm text-gray-400 mt-8">
          No flashcards yet — upload a document and generate a set to start studying.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {sets.map((set) => (
            <a
              key={set._id || set.documentId}
              href={`/flashcards/${set._id || set.documentId}`}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-pink-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-500 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <p className="font-semibold text-gray-900">{set.documentTitle || set.title}</p>
              <p className="text-xs text-gray-400 mt-1">{(set.cards || []).length} cards</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashcardListPage;