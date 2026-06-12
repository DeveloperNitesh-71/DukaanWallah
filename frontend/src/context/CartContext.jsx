import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';
import { useBuyer } from './BuyerContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useBuyer();
  const { showToast } = useToast();

  // Load cart from DB when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (!userInfo) {
        setCart([]);
        return;
      }
      try {
        const { data } = await API.get('/cart');
        // Flatten the data for frontend compatibility
        const mappedItems = data.items.map(item => ({
          ...item.productId,
          quantity: item.quantity
        }));
        setCart(mappedItems);
      } catch (err) {
        console.error('Failed to fetch cart', err);
      }
    };
    fetchCart();
  }, [userInfo]);

  const addToCart = async (product) => {
    if (!userInfo) {
        showToast('Please login to add items to cart', 'error');
        return;
    }
    try {
      const { data } = await API.post('/cart', { productId: product._id, quantity: 1 });
      const mappedItems = data.items.map(item => ({
        ...item.productId,
        quantity: item.quantity
      }));
      setCart(mappedItems);
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await API.delete(`/cart/${productId}`);
      const mappedItems = data.items.map(item => ({
        ...item.productId,
        quantity: item.quantity
      }));
      setCart(mappedItems);
    } catch (err) {
      console.error('Failed to remove from cart', err);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const { data } = await API.put(`/cart/${productId}`, { quantity });
      const mappedItems = data.items.map(item => ({
        ...item.productId,
        quantity: item.quantity
      }));
      setCart(mappedItems);
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const clearCart = async () => {
    try {
      await API.delete('/cart');
      setCart([]);
    } catch (err) {
      console.error('Failed to clear cart', err);
    }
  };

  const placeOrder = async (shippingAddress) => {
    if (cart.length === 0) return;

    const orderData = {
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      shippingAddress
    };

    try {
      const { data } = await API.post('/orders', orderData);
      await clearCart();
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
