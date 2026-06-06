import React, { useState } from 'react'
import Dashboard from '../SellerDashboardComponents/Dashboard/Dashboard'
import Orders from '../SellerDashboardComponents/Orders/Orders'
import Header from '../SellerDashboardComponents/Header'
import Products from '../SellerDashboardComponents/Products/Products'
import Profile from '../SellerDashboardComponents/Profile/Profile'
const SellerDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard')
  function handlePage (page) {
    setActivePage(page)
  }
  return (
    <div className='min-h-screen bg-blue-50'>
        <Header handlePage={handlePage} />
        {activePage == 'Dashboard' ? <Dashboard /> : (activePage == 'Products' ?  <Products /> : (activePage == 'Orders' ? <Orders /> : <Profile /> ))}
        {/*  */}
        {/*  */}
        {/**/}
        
    </div>
  )
}

export default SellerDashboard