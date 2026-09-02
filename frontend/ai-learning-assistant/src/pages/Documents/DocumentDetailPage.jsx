import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import documentService from '../../services/documentService';
import aiService from '../../services/aiService';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await documentService.getDocumentById(id);
        setDocument(data?.data ?? data);
      } catch (err) {
        toast.error(err.message || 'Failed to load document');
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  const handleGenerateFlashcards = async () => {
    setGenerating(true);
    try {
      await aiService.generateFlashcards(id);
      toast.success('Flashcards generated');
      navigate('/flashcards');
    } catch (err) {
      toast.error(err.message || 'Failed to generate flashcards');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setGenerating(true);
    try {
      const data = await aiService.generateQuiz(id);
      const quizId = data?.data?._id ?? data?._id;
      toast.success('Quiz generated');
      navigate(quizId ? `/quizzes/${quizId}` : '/dashboard');
    } catch (err) {
      toast.error(err.message || 'Failed to generate quiz');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-gray-400">Loading document...</p>;
  }

  if (!document) {
    return <p className="text-sm text-gray-400">Document not found.</p>;
  }

  return (
    <div>
      <button
        onClick={() => navigate('/documents')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to documents
      </button>

      <h1 className="text-2xl font-bold text-gray-900">{document.title || document.name}</h1>
      <p className="text-gray-400 mt-1">
        Uploaded {document.createdAt && new Date(document.createdAt).toLocaleDateString('en-GB')}
      </p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleGenerateFlashcards}
          disabled={generating}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
          Generate Flashcards
        </button>
        <button
          onClick={handleGenerateQuiz}
          disabled={generating}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Generate Quiz
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 mt-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Extracted content</h2>
        <p className="text-sm text-gray-500 whitespace-pre-wrap leading-relaxed">
          {document.content || document.extractedText || 'No preview available.'}
        </p>
      </div>
    </div>
  );
};

export default DocumentDetailPage;