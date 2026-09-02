import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import flashcardService from '../../services/flashcardService';

const FlashcardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSet = async () => {
      try {
        // Uses documentId here since flashcards are keyed to a document in your service
        const data = await flashcardService.getFlashcardsForDocument(id);
        const set = data?.data ?? data;
        setCards(set.cards ?? []);
      } catch (err) {
        toast.error(err.message || 'Failed to load flashcard set');
      } finally {
        setLoading(false);
      }
    };
    fetchSet();
  }, [id]);

  const goNext = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, cards.length - 1));
  };

  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (cards.length === 0) return <p className="text-sm text-gray-400">This set has no cards.</p>;

  const card = cards[index];

  return (
    <div className="max-w-xl mx-auto">
      <button
        onClick={() => navigate('/flashcards')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to flashcards
      </button>

      <p className="text-center text-xs text-gray-400 mb-4">
        Card {index + 1} of {cards.length}
      </p>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="w-full min-h-[260px] bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-8 text-center hover:border-emerald-300 transition-colors"
      >
        <p className="text-lg font-medium text-gray-900">
          {flipped ? card.answer || card.back : card.question || card.front}
        </p>
      </button>
      <p className="text-center text-xs text-gray-400 mt-3">Tap card to flip</p>

      <div className="flex items-center justify-between mt-8">
        <button
          onClick={goPrev}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 disabled:opacity-40 hover:text-gray-900"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={goNext}
          disabled={index === cards.length - 1}
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 disabled:opacity-40 hover:text-emerald-700"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardPage;