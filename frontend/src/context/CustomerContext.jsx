import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import { useBuyer } from './BuyerContext';

const CustomerContext = createContext();

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userInfo } = useBuyer();
  const maxCustomers = 200;

  const fetchCustomers = async () => {
    if (!userInfo || userInfo.role !== 'seller') return;
    
    setLoading(true);
    try {
      const { data } = await API.get('/customers');
      // Map customId to id for frontend compatibility
      const mappedData = data.map(c => ({
        ...c,
        id: c.customId
      }));
      setCustomers(mappedData);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [userInfo]);

  const addCustomer = async (customerData) => {
    if (customers.length >= maxCustomers) {
      throw new Error(`Maximum customer limit (${maxCustomers}) reached.`);
    }

    try {
      const { data } = await API.post('/customers', customerData);
      const newCustomer = {
        ...data,
        id: data.customId
      };
      setCustomers(prev => [newCustomer, ...prev]);
      return { success: true, message: 'Customer connected successfully!' };
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      throw new Error(message);
    }
  };

  const removeCustomer = async (dbId) => {
    try {
      await API.delete(`/customers/${dbId}`);
      setCustomers(prev => prev.filter(c => c._id !== dbId));
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const value = {
    customers,
    loading,
    error,
    addCustomer,
    removeCustomer,
    maxCustomers,
    fetchCustomers
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
