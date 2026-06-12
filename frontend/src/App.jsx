import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SellerLogin from './pages/SellerLogin'
import BuyerLogin from './pages/BuyerLogin'
import SellerDashboard from './components/SellerDashboard/SellerDashboard'
import Dashboard from './components/SellerDashboardComponents/Dashboard/Dashboard'
import Orders from './components/SellerDashboardComponents/Orders/Orders'
import OrderCheckoutPage from './components/SellerDashboardComponents/Orders/OrderCheckoutPage'
import Products from './components/SellerDashboardComponents/Products/Products'
import AddProduct from './components/SellerDashboardComponents/Products/AddProduct'
import EditProduct from './components/SellerDashboardComponents/Products/EditProduct'
import Profile from './components/SellerDashboardComponents/Profile/Profile'
import Customers from './components/SellerDashboardComponents/Customers/Customers'
import Settings from './components/SellerDashboardComponents/Settings/Settings'
import BuyerDashboard from './components/BuyerDashboard/BuyerDashboard'
import CartPage from './pages/CartPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/ProfilePage'
import MyOrders from './pages/MyOrders'
import { CartProvider } from './context/CartContext'
import { SellerOrderProvider } from './context/SellerOrderContext'
import { ProductProvider } from './context/ProductContext'
import { CustomerProvider } from './context/CustomerContext'
import { BuyerProvider } from './context/BuyerContext'

import { ToastProvider } from './context/ToastContext'

const App = () => {
  return (
    <ToastProvider>
      <ProductProvider>
        <BuyerProvider>
          <CustomerProvider>
            <SellerOrderProvider>
              <CartProvider>
                <Router>
                  <div className='w-full min-h-screen'>
                    <Routes>
                      <Route path="/" element={<LoginPage />} />
                      <Route path="/seller-login" element={<SellerLogin />} />
                      <Route path="/buyer-login" element={<BuyerLogin />} />
                      <Route path="/buyer" element={<BuyerDashboard />} />
                      <Route path="/buyer/cart" element={<CartPage />} />
                      <Route path="/buyer/product/:id" element={<ProductDetailsPage />} />
                      <Route path="/buyer/profile" element={<ProfilePage />} />
                      <Route path="/buyer/orders" element={<MyOrders />} />
                      {/* Seller Dashboard with Nested Routes */}
                      <Route path="/seller" element={<SellerDashboard />}>
                        <Route index element={<Dashboard />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/:id/checkout" element={<OrderCheckoutPage />} />
                        <Route path="products" element={<Products />} />
                        <Route path="products/add" element={<AddProduct />} />
                        <Route path="products/:id/edit" element={<EditProduct />} />
                        <Route path="customers" element={<Customers />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="profile" element={<Profile />} />
                      </Route>
                    </Routes>
                  </div>
                </Router>
              </CartProvider>
            </SellerOrderProvider>
          </CustomerProvider>
        </BuyerProvider>
      </ProductProvider>
    </ToastProvider>
  )
}

export default App
