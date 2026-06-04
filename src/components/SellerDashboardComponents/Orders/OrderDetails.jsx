import React from 'react'

const OrderDetails = () => {
  return (
    <div className='w-full gap-4 bg-white p-4 flex justify-between rounded-lg border-1 border-gray-200'>
        <div className='flex flex-col text-sm gap-2'>
            <span className='font-medium text-gray-600'>dfa54545sdf25kh</span>
            <span className='text-gray-500'>2023-10-10 • 12:30:53 am </span>
            <span className='font-medium'>John Doe • 123-456-7890</span>
            <span className=''>Pal general Store</span>
            <span>123 Main St, City, Country</span>
            <div className='flex items-center justify-center gap-2'>
                <div className='border-1 border-gray-300 px-2 py-1 rounded cursor-pointer'>▾ Show Details</div>
                <button className='border-1 border-gray-300 px-2 py-1 rounded bg-green-300 cursor-pointer'>Confirm →</button>
                <button className='border-1 border-gray-300 px-2 py-1 rounded bg-red-300 cursor-pointer'>✕ Cancel</button>
            </div>
        </div>
        <div className='flex flex-col gap-2 items-center'>
            <span className='border-1 border-amber-300 rounded-lg px-2 py-1 bg-amber-100'>Pending</span>
            <span className='text-green-800 text-xl'>₹999</span>
        </div>
    </div>
  )
}

export default OrderDetails