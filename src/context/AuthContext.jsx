import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // The interceptor in api.js will automatically add the token to the header
          const response = await api.get('/auth/user');
          setUser(response.data); // Restore user session
        } catch (error) {
          // If token is invalid/expired, remove it
          localStorage.removeItem('token');
          console.error("Session expired or token is invalid. Please log in again.");
        }
      }
      setLoading(false); // Finished trying to load user
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    if (response.data.user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  // --- UPDATED: Full Signup Logic ---
  const signup = async (name, email, password) => {
    // 1. Send data to the backend
    const response = await api.post('/users/register', { name, email, password });
    
    // 2. Save the token
    localStorage.setItem('token', response.data.token);
    
    // 3. Set the user in state
    setUser(response.data.user);
    
    // 4. Navigate to home
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = { user, loading, login, logout, signup };

  // Don't render the app until we've checked for a user
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
