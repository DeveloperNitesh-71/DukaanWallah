import React from 'react'
import Header from '../BuyerDashboardComponents/Header'
import Product from '../BuyerDashboardComponents/Products/Product'
import Footer from '../BuyerDashboardComponents/Footer'
import './BuyerDashboard'

const BuyerDashboard = () => {
  return (
    <div className=' bg-blue-50 buyerdashboard'>
        <Header />
        <Product />
        <Footer />
    </div>
  )
}

export default BuyerDashboard