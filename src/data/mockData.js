import _170ml from '../assets/170ml.jpeg';
import _500ml from '../assets/500ml.jpeg';
import dahi from '../assets/500gmdahi.jpeg';
import butter from '../assets/butter.jpeg';
import masala from '../assets/masala.jpeg';
import sada from '../assets/sada.jpeg';

export const products = [
  {
    id: 1,
    name: "Amul Milk 170ml",
    category: "Dairy",
    price: 10,
    image: _170ml,
    description: "Fresh and pure milk in a convenient 170ml pack."
  },
  {
    id: 2,
    name: "Amul Milk 500ml",
    category: "Dairy",
    price: 27,
    image: _500ml,
    description: "Standardized fresh milk, perfect for daily use."
  },
  {
    id: 3,
    name: "Amul Dahi 500gm",
    category: "Dairy",
    price: 55,
    image: dahi,
    description: "Thick and creamy curd made from pasteurized milk."
  },
  {
    id: 4,
    name: "Amul Butter 100g",
    category: "Dairy",
    price: 58,
    image: butter,
    description: "Classic salted butter, a household favorite."
  },
  {
    id: 5,
    name: "Garam Masala",
    category: "Grocery",
    price: 45,
    image: masala,
    description: "Authentic blend of spices for rich flavor."
  },
  {
    id: 6,
    name: "Sada Bread",
    category: "Grocery",
    price: 25,
    image: sada,
    description: "Soft and fresh plain bread for your daily breakfast."
  }
];

export const getMockOrders = () => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const lastWeek = new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0];

  return [
    { id: '8821', img: _170ml, name: 'Amul Milk 170ml', qty: 10, unit: 'pkts', price: 10, status: 'Completed', date: today, buyerName: 'John Doe', buyerAddress: '123 Main St, New York' },
    { id: '8822', img: _500ml, name: 'Amul Milk 500ml', qty: 15, unit: 'pkts', price: 27, status: 'Processing', date: today, buyerName: 'Jane Smith', buyerAddress: '456 Elm St, Los Angeles' },
    { id: '8827', img: dahi, name: 'Amul Dahi 500gm', qty: 5, unit: 'units', price: 55, status: 'Pending', date: today, buyerName: 'Bob Johnson', buyerAddress: '789 Oak St, Chicago' },
    { id: '8828', img: _170ml, name: 'Amul Milk 170ml', qty: 20, unit: 'pkts', price: 10, status: 'Pending', date: today, buyerName: 'Alice Brown', buyerAddress: '321 Pine St, Houston' },
    { id: '8823', img: butter, name: 'Amul Butter 100g', qty: 5, unit: 'units', price: 58, status: 'Completed', date: yesterday, buyerName: 'Charlie Green', buyerAddress: '654 Maple St, Miami' },
    { id: '8824', img: dahi, name: 'Amul Dahi 500gm', qty: 8, unit: 'units', price: 55, status: 'Pending', date: lastWeek, buyerName: 'David White', buyerAddress: '987 Cedar St, Seattle' },
    { id: '8825', img: masala, name: 'Garam Masala', qty: 12, unit: 'pkts', price: 45, status: 'Completed', date: today, buyerName: 'Eve Black', buyerAddress: '159 Birch St, Boston' },
    { id: '8826', img: _500ml, name: 'Amul Milk 500ml', qty: 20, unit: 'pkts', price: 27, status: 'Cancelled', date: lastWeek, buyerName: 'Frank Blue', buyerAddress: '753 Walnut St, Denver' },
  ];
};

export const getMockCustomers = () => {
  return [
    { id: 'CUST001', name: 'John Doe', shopName: 'John\'s General Store', phone: '+91 98765 43210', address: '123 Main St, New York', joinedDate: '2026-01-15' },
    { id: 'CUST002', name: 'Jane Smith', shopName: 'Smith\'s Dairy', phone: '+91 87654 32109', address: '456 Elm St, Los Angeles', joinedDate: '2026-02-20' },
    { id: 'CUST003', name: 'Bob Johnson', shopName: 'Bob\'s Bakery', phone: '+91 76543 21098', address: '789 Oak St, Chicago', joinedDate: '2026-03-10' },
    { id: 'CUST004', name: 'Alice Brown', shopName: 'Alice\'s Organics', phone: '+91 65432 10987', address: '321 Pine St, Houston', joinedDate: '2026-04-05' },
    { id: 'CUST005', name: 'Charlie Green', shopName: 'Green Grocers', phone: '+91 54321 09876', address: '654 Maple St, Miami', joinedDate: '2026-05-12' },
  ];
};
