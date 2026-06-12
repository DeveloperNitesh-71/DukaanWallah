import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const BuyerContext = createContext();

export const useBuyer = () => {
  const context = useContext(BuyerContext);
  if (!context) {
    throw new Error('useBuyer must be used within a BuyerProvider');
  }
  return context;
};

export const BuyerProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize: Check for an active session by calling /me
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await API.get('/auth/me');
        setUserInfo(data);
      } catch (err) {
        // Not logged in or token expired - silent fail is fine for init
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      setUserInfo(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      throw err;
    }
  };

  const register = async (userData) => {
    setError(null);
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', userData);
      setUserInfo(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
      setUserInfo(null);
    } catch (err) {
      // Logout error
    }
  };

  const updateUserInfo = async (updatedData) => {
    try {
      const { data } = await API.put('/auth/profile', updatedData);
      setUserInfo(data);
      return { success: true, data };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const updateImage = async (type, imageUrl) => {
    try {
      const updatedData = { [type]: imageUrl };
      const { data } = await API.put('/auth/profile', updatedData);
      setUserInfo(data);
      return { success: true, data };
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  const value = {
    userInfo,
    loading,
    error,
    login,
    register,
    logout,
    updateUserInfo,
    updateImage,
  };

  return (
    <BuyerContext.Provider value={value}>
      {!loading && children}
    </BuyerContext.Provider>
  );
};
