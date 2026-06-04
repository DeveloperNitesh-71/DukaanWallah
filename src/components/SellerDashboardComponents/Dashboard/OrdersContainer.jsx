import React from 'react'
import NewOrders from './NewOrders'

const OrdersContainer = () => {
  return (
    <div className='w-full h-auto flex flex-col justify-start items-start px-10 py-6 gap-4 bg-white'>
        <h1>📦 Today's Orders - Product Summary</h1>
        <div className='w-full'>
            <NewOrders />
        </div>
    </div>
  )
}

export default OrdersContainer