import React, { createContext, useContext, useState, useMemo } from 'react';
import { getMockOrders } from '../data/mockData';

const SellerOrderContext = createContext();

export const useSellerOrders = () => {
  const context = useContext(SellerOrderContext);
  if (!context) {
    throw new Error('useSellerOrders must be used within a SellerOrderProvider');
  }
  return context;
};

export const SellerOrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => getMockOrders());

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const updateMultipleOrdersStatus = (orderIds, status) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        orderIds.includes(order.id) ? { ...order, status } : order
      )
    );
  };

  const acceptOrder = (orderId) => updateOrderStatus(orderId, 'Processing');
  const rejectOrder = (orderId) => updateOrderStatus(orderId, 'Cancelled');

  const acceptAllPending = () => {
    const today = new Date().toISOString().split('T')[0];
    const pendingIds = orders
      .filter(o => o.date === today && o.status === 'Pending')
      .map(o => o.id);
    updateMultipleOrdersStatus(pendingIds, 'Processing');
  };

  const rejectAllPending = () => {
    const today = new Date().toISOString().split('T')[0];
    const pendingIds = orders
      .filter(o => o.date === today && o.status === 'Pending')
      .map(o => o.id);
    updateMultipleOrdersStatus(pendingIds, 'Cancelled');
  };

  const value = {
    orders,
    acceptOrder,
    rejectOrder,
    acceptAllPending,
    rejectAllPending,
    updateOrderStatus
  };

  return (
    <SellerOrderContext.Provider value={value}>
      {children}
    </SellerOrderContext.Provider>
  );
};
