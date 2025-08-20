import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getUser();
        setUser(response.data);
      } catch {
        localStorage.removeItem('access_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    await authAPI.getCsrf(); // fetch CSRF cookie first
    try {
      const response = await authAPI.login(credentials);
      localStorage.setItem('access_token', response.data.access_token);
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data };
    }
  };

  const register = async (userData) => {
    await authAPI.getCsrf();
    try {
      const response = await authAPI.register(userData);
      localStorage.setItem('access_token', response.data.access_token);
      setUser(response.data.user);
      return { success: true, data: response.data };
    } catch (err) {
      return { success: false, error: err.response?.data };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('access_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
