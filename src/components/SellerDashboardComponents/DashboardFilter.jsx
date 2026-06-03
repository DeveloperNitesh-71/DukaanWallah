import React from 'react'

const DashboardFilter = () => {
  return (
    <div className='w-full flex justify-between items-center px-9 pt-4'>
        <h2 className='text-2xl font-medium mb-4 '>Dashboard</h2>
        <div className='flex space-x-4 mb-4 font-medium'>
            <span className='cursor-pointer bg-green-500 text-white px-4 py-1 rounded-md'>Today</span>
            <span className='cursor-pointer px-4 py-1 rounded-md hover:bg-gray-200'>Last 7 Days</span>
            <span className='cursor-pointer px-4 py-1 rounded-md hover:bg-gray-200'>Last 30 Days</span>
        </div>
    </div>
  )
}

export default DashboardFilter