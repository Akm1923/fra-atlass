import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import GISPage from './pages/GISPage';
import GovDashboardPage from './pages/GovDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AboutUsPage from './pages/AboutUsPage';
import AuthPage from './pages/AuthPage';
import DroneSurveyPage from './pages/DroneSurveyPage';
import { ProvideAuth, useAuth } from './hooks/useAuth';
import Chatbot from './components/chatbot/Chatbot';

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-100">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/atlas" element={<GISPage />} />
              <Route path="/drone-surveys" element={<DroneSurveyPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              <Route 
                path="/gov-dashboard" 
                element={
                  <ProtectedRoute role="gov">
                    <GovDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user-dashboard" 
                element={
                  <ProtectedRoute role="user">
                    <UserDashboardPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ProvideAuth>
  );
};

const ProtectedRoute = ({ children, role }: { children: JSX.Element, role: 'gov' | 'user' }) => {
  const auth = useAuth();
  if (!auth.isLoggedIn || auth.role !== role) {
    return <Navigate to="/auth" />;
  }
  return children;
};


export default App;