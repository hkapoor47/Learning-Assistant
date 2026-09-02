import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import documentService from '../../services/documentService';

const DocumentListPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const data = await documentService.getDocuments();
      setDocuments(data?.data ?? data ?? []);
    } catch (err) {
      toast.error(err.message || 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    // Adjust the field name below ('document') to match what multer expects
    // in your documentController.js (upload.single('fieldName'))
    formData.append('document', file);

    setUploading(true);
    try {
      const data = await documentService.uploadDocument(formData);
      toast.success('Document uploaded successfully');
      const newDoc = data?.data ?? data;
      setDocuments((prev) => [newDoc, ...prev]);
    } catch (err) {
      toast.error(err.message || 'Failed to upload document');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id) => {
    try {
      await documentService.deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
      toast.success('Document deleted');
    } catch (err) {
      toast.error(err.message || 'Failed to delete document');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
      <p className="text-gray-400 mt-1">Upload study material to generate flashcards and quizzes</p>

      {/* Upload area */}
      <label
        htmlFor="document-upload"
        className="mt-8 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-2xl py-12 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors"
      >
        {uploading ? (
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
            <UploadCloud className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-900">
            {uploading ? 'Uploading...' : 'Click to upload a document'}
          </p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOCX, or TXT up to 20MB</p>
        </div>
        <input
          id="document-upload"
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileSelect}
          disabled={uploading}
        />
      </label>

      {/* Document list */}
      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-gray-400">Loading documents...</p>
        ) : documents.length === 0 ? (
          <p className="text-sm text-gray-400">No documents yet — upload one to get started.</p>
        ) : (
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-4"
              >
                <button
                  onClick={() => navigate(`/documents/${doc._id}`)}
                  className="flex items-center gap-3 text-left flex-1 min-w-0"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.title || doc.name || doc.originalName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {doc.createdAt && new Date(doc.createdAt).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentListPage;