import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import DocumentListPage from "./pages/Documents/DocumentListPage";
import DocumentDetailPage from "./pages/Documents/DocumentDetailPage";
import FlashcardListPage from "./pages/Flashcards/FlashcardListPage";
import FlashcardPage from "./pages/Flashcards/FlashcardPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import QuizListPage from "./pages/Quizzes/QuizListPage";
import QuizTakePage from "./pages/Quizzes/QuizTakePage";

const App = () => {
   const { user, loading } = useAuth();

    const isAuthenticated = !!user;


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
                    element={
                        isAuthenticated
                            ? <Navigate to="/dashboard" replace />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <DashboardPage />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/documents"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <DocumentListPage />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/documents/:id"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <DocumentDetailPage />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/flashcards"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <FlashcardListPage />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/flashcards/:id"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <FlashcardPage />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizzes"
                      element={
                        <ProtectedRoute>
                          <DashboardLayout>
                            <QuizListPage />
                         </DashboardLayout>
                         </ProtectedRoute>
                        }
                />

                <Route
                    path="/quizzes/:id"
                    element={
                        <ProtectedRoute>
                          <DashboardLayout>
                            <QuizTakePage />
                          </DashboardLayout>
                        </ProtectedRoute>
                      }
                />

                <Route 
                   path ="/quizzes/:id/result"
                   element={
                    <ProtectedRoute>
                        <DashboardLayout>
                            <QuizTakePage />
                        </DashboardLayout>
                    </ProtectedRoute>
                   }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <ProfilePage />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFoundPage />}
                />

            </Routes>
        </Router>
    );
};

export default App;