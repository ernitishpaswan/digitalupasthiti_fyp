// Admin ka login state manage karne ke liye Context
// Pura app mein admin info available rahega
import React, { createContext, useContext, useState, useEffect } from 'react';
import { verifyToken } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // App load hone pe token check karo
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        try {
          const { data } = await verifyToken();
          setAdmin(data);
        } catch {
          // Token invalid hai, hata do
          localStorage.removeItem('admin_token');
        }
      }
      setLoading(false);
    };
    checkToken();
  }, []);

  const login = (token, adminData) => {
    localStorage.setItem('admin_token', token);
    setAdmin(adminData);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook - easy use ke liye
export const useAuth = () => useContext(AuthContext);
