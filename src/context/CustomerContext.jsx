import React, { createContext, useContext, useState } from 'react';
import { getMockCustomers } from '../data/mockData';

const CustomerContext = createContext();

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState(() => getMockCustomers());
  const maxCustomers = 200;

  const addCustomer = (customerData) => {
    if (customers.length >= maxCustomers) {
      return { success: false, message: 'Maximum customer limit (200) reached.' };
    }

    // Check if customer already exists
    if (customers.some(c => c.id === customerData.id)) {
      return { success: false, message: 'This customer is already connected.' };
    }

    const newCustomer = {
      ...customerData,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setCustomers(prev => [...prev, newCustomer]);
    return { success: true, message: 'Customer connected successfully!' };
  };

  const removeCustomer = (customerId) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
  };

  const value = {
    customers,
    addCustomer,
    removeCustomer,
    maxCustomers
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};
