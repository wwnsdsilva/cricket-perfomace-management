import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PlayerDashboard from './components/PlayerDashboard';
import MICDashboard from './components/MICDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ClubInformation from './components/ClubInformation';
import SquadPreview from './components/SquadPreview';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mic/dashboard" 
            element={
              <ProtectedRoute requiredRole="MIC">
                <MICDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/player/dashboard" 
            element={
              <ProtectedRoute requiredRole="Player">
                <PlayerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/club" 
            element={
              <ProtectedRoute requiredRole="Normal">
                <ClubInformation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/club/squad" 
            element={
              <ProtectedRoute requiredRole="Normal">
                <SquadPreview />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
