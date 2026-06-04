import React from 'react'

const OrderSearch = () => {
  return (
    <div className='w-full h-auto px-20 py-6 flex flex-col justify-between gap-4 bg-blue-50'>
        <div className='flex items-center justify-between'>
            <h1 className="text-2xl font-bold">📋 Orders</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Download Excel</button>
        </div>
        <input type="text" placeholder='🔍 Search by order ID, customer name, phone number or product name' className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
    </div>
  )
}

export default OrderSearch