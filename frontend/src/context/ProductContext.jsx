import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (formData) => {
    try {
      const { data } = await API.post('/products', formData);
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const { data } = await API.put(`/products/${id}`, formData);
      setProducts((prev) => prev.map((p) => (p._id === id ? data : p)));
      return data;
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const value = {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
