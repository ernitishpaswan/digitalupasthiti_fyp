// Protected route - sirf logged in admin hi admin pages dekh sake
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  // Token verify ho raha hai - wait karo
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#111827',
        color: '#25D366', fontFamily: "'Montserrat', sans-serif",
      }}>
        <span>Verifying session...</span>
      </div>
    );
  }

  // Login nahi hai toh login page pe bhej do
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
