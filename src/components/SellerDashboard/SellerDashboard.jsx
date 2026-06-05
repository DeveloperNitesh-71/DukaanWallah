import React from 'react'
import Dashboard from '../SellerDashboardComponents/Dashboard/Dashboard'
import Orders from '../SellerDashboardComponents/Orders/Orders'
import Header from '../SellerDashboardComponents/Header'
import Products from '../SellerDashboardComponents/Products/Products'
const SellerDashboard = () => {
  return (
    <div className='min-h-screen bg-blue-50'>
        <Header />
        {/* <Dashboard /> */}
        {/* <Orders /> */}
        <Products />
    </div>
  )
}

export default SellerDashboard