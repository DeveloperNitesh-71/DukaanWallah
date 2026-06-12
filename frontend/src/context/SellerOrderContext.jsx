import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import { useToast } from './ToastContext';

const SellerOrderContext = createContext();

export const useSellerOrders = () => {
  const context = useContext(SellerOrderContext);
  if (!context) {
    throw new Error('useSellerOrders must be used within a SellerOrderProvider');
  }
  return context;
};

export const SellerOrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/orders/seller');
      setOrders(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { data } = await API.put(`/orders/${orderId}/status`, { status });
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? data : order
        )
      );
      return data;
    } catch (err) {
      showToast(err.response?.data?.message || err.message, 'error');
      throw err;
    }
  };

  const acceptOrder = (orderId) => updateOrderStatus(orderId, 'processing');
  const rejectOrder = (orderId) => updateOrderStatus(orderId, 'cancelled');

  const acceptAllPending = async () => {
    const pendingOrders = orders.filter(o => o.status.toLowerCase() === 'pending');
    if (pendingOrders.length === 0) return;
    
    try {
      await Promise.all(pendingOrders.map(o => API.put(`/orders/${o._id}/status`, { status: 'processing' })));
      await fetchOrders(); // Refresh all
      showToast(`Accepted ${pendingOrders.length} orders`, 'success');
    } catch (err) {
      showToast('Failed to accept all orders', 'error');
    }
  };

  const rejectAllPending = async () => {
    const pendingOrders = orders.filter(o => o.status.toLowerCase() === 'pending');
    if (pendingOrders.length === 0) return;

    try {
      await Promise.all(pendingOrders.map(o => API.put(`/orders/${o._id}/status`, { status: 'cancelled' })));
      await fetchOrders(); // Refresh all
      showToast(`Rejected ${pendingOrders.length} orders`, 'error');
    } catch (err) {
      showToast('Failed to reject all orders', 'error');
    }
  };

  const value = {
    orders,
    loading,
    error,
    acceptOrder,
    rejectOrder,
    acceptAllPending,
    rejectAllPending,
    updateOrderStatus,
    fetchOrders,
  };

  return (
    <SellerOrderContext.Provider value={value}>
      {children}
    </SellerOrderContext.Provider>
  );
};
