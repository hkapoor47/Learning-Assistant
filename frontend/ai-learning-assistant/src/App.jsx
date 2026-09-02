import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import DocumentDetailPage from './pages/Documents/DocumentDetailPage';
import DocumentListPage from './pages/Documents/DocumentListPage';
import FlashcardPage from './pages/Flashcards/FlashcardPage';
import FlashcardListPage from './pages/Flashcards/FlashcardListPage';
import QuizTakePage from './pages/Quizzes/QuizTakePage';
import QuizResultPage from './pages/Quizzes/QuizResultPage';
import ProfilePage from './pages/Profile/ProfilePage';

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/documents" element={<DocumentListPage />} />
            <Route path="/documents/:id" element={<DocumentDetailPage />} />
            <Route path="/flashcards" element={<FlashcardListPage />} />
            <Route path="/flashcards/:id" element={<FlashcardPage />} />
            <Route path="/quizzes/:id" element={<QuizTakePage />} />
            <Route path="/quizzes/:id/result" element={<QuizResultPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;