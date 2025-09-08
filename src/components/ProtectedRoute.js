import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('authToken');

  // Check if user is authenticated
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (user.role) {
      case 'Admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'MIC':
        return <Navigate to="/mic/dashboard" replace />;
      case 'Player':
        return <Navigate to="/player/dashboard" replace />;
      case 'Normal':
        return <Navigate to="/club" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
