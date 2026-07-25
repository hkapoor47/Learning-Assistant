import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const isAuthenticated =true;
  const loading =false;
  if (loading){
    return (
     <div className="flex items-center justify-center h-screen">
     <p>Loading...</p>
     </div>

    );
  }
  
  return(
    <Router>
      <Routes>
        <Route 
         path="/"
         element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login"  replace/>}
         />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>


         <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  );
}

export default App
