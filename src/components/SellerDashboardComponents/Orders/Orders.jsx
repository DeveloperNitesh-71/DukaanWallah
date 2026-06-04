import React from 'react'
import Header from '../Header'
import OrderSearch from './OrderSearch'
import OrdersStatus from './OrdersStatus'

const Orders = () => {
  return (
    <div className='w-full min-h-screen gap-4 bg-blue-50'>
        <OrderSearch />
        <OrdersStatus />
    </div>
  )
}

export default Orders