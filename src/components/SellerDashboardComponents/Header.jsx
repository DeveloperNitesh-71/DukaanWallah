import React from 'react'
import logo from '../../assets/edited-image.png'
const Header = () => {
  return (
    <div className='w-full h-16  flex items-center justify-between px-4 font-medium border-b border-gray-300 shadow-sm'>
        <div className='flex items-center space-x-2'>
            <img src={logo} alt="Logo" className='h-8 w-8 rounded-full' />
            <h1 className='text-xl font-bold'>DukaanWaala</h1>
        </div>
        <ul className='flex space-x-10 cursor-pointer'>
            <li className='bg-green-400 px-2 py-1 rounded font-medium'>Dashboard</li>
            <li className='px-2 py-1  rounded font-medium hover:bg-gray-200'>Orders</li>
            <li className='px-2 py-1  rounded font-medium hover:bg-gray-200'>Products</li>
            <li className='px-2 py-1  rounded font-medium hover:bg-gray-200'>Profile</li>
        </ul>
    </div>
  )
}

export default Header