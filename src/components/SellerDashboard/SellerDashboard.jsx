import React from 'react'
import Header from '../SellerDashboardComponents/Header'
import Dashboard from '../SellerDashboardComponents/Dashboard/Dashboard'
import Orders from '../SellerDashboardComponents/Orders/Orders'
const SellerDashboard = () => {
  return (
    <div>
        <Header />
        {/* <Dashboard /> */}
        <Orders />
    </div>
  )
}

export default SellerDashboard