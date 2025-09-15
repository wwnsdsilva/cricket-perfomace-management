import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  /* const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('authToken');

  // Check if user is authenticated
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  } */

  const user_role = JSON.parse(localStorage.getItem('user_role') || 'null');
  const access_token = localStorage.getItem('access_token');

  // Check if user is authenticated
  if (!user_role || !access_token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required user_role (if specified)
  if (requiredRole && user_role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual user_role
    switch (user_role) {
      case 'ADMIN':
        return <Navigate to="/admin/dashboard" replace />;
      case 'MIC':
        return <Navigate to="/mic/dashboard" replace />;
      case 'PLAYER':
        return <Navigate to="/player/dashboard" replace />;
      case 'NORMAL':
        return <Navigate to="/club" replace />;
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
