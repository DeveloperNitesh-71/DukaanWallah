import _170ml from '../assets/170ml.jpeg';
import _500ml from '../assets/500ml.jpeg';
import dahi from '../assets/500gmdahi.jpeg';
import butter from '../assets/butter.jpeg';
import masala from '../assets/masala.jpeg';
import sada from '../assets/sada.jpeg';

export const products = [
  // ... (existing products)
  {
    id: 1,
    name: "Amul Milk 170ml",
    category: "Dairy",
    price: 10,
    stock: 50,
    image: _170ml,
    description: "Fresh and pure milk in a convenient 170ml pack."
  },
  {
    id: 2,
    name: "Amul Milk 500ml",
    category: "Dairy",
    price: 27,
    stock: 100,
    image: _500ml,
    description: "Standardized fresh milk, perfect for daily use."
  },
  {
    id: 3,
    name: "Amul Dahi 500gm",
    category: "Dairy",
    price: 55,
    stock: 30,
    image: dahi,
    description: "Thick and creamy curd made from pasteurized milk."
  },
  {
    id: 4,
    name: "Amul Butter 100g",
    category: "Dairy",
    price: 58,
    stock: 40,
    image: butter,
    description: "Classic salted butter, a household favorite."
  },
  {
    id: 5,
    name: "Garam Masala",
    category: "Grocery",
    price: 45,
    stock: 60,
    image: masala,
    description: "Authentic blend of spices for rich flavor."
  },
  {
    id: 6,
    name: "Sada Bread",
    category: "Grocery",
    price: 25,
    stock: 20,
    image: sada,
    description: "Soft and fresh plain bread for your daily breakfast."
  }
];

export const getMockOrders = () => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const lastWeek = new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0];

  return [
    { id: '8821', img: _170ml, name: 'Amul Milk 170ml', qty: 10, unit: 'pkts', price: 10, status: 'Completed', date: today },
    { id: '8822', img: _500ml, name: 'Amul Milk 500ml', qty: 15, unit: 'pkts', price: 27, status: 'Processing', date: today },
    { id: '8827', img: dahi, name: 'Amul Dahi 500gm', qty: 5, unit: 'units', price: 55, status: 'Pending', date: today },
    { id: '8828', img: _170ml, name: 'Amul Milk 170ml', qty: 20, unit: 'pkts', price: 10, status: 'Pending', date: today },
    { id: '8823', img: butter, name: 'Amul Butter 100g', qty: 5, unit: 'units', price: 58, status: 'Completed', date: yesterday },
    { id: '8824', img: dahi, name: 'Amul Dahi 500gm', qty: 8, unit: 'units', price: 55, status: 'Pending', date: lastWeek },
    { id: '8825', img: masala, name: 'Garam Masala', qty: 12, unit: 'pkts', price: 45, status: 'Completed', date: today },
    { id: '8826', img: _500ml, name: 'Amul Milk 500ml', qty: 20, unit: 'pkts', price: 27, status: 'Cancelled', date: lastWeek },
  ];
};
