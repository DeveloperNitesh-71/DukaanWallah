import React, { useRef } from 'react'
import logo from '../../assets/edited-image.png'
const Header = ({handlePage}) => {

  const Dashboard = useRef(null)
  const Orders = useRef(null)
  const Products = useRef(null)
  const Profile = useRef(null)
  const page_arr = [Dashboard, Orders, Products, Profile]

  const RemoveActiveClass = () => {
    page_arr.forEach((page) => {
      page.current.classList.remove('bg-green-400')
      page.current.classList.add('hover:bg-gray-200')
    })
  }

  const handlePageClicks = (e) => {
    RemoveActiveClass()
      e.target.classList.add('bg-green-400')
      e.target.classList.remove('hover:bg-gray-200')
      handlePage(e.target.innerText)
      
  }
  return (
    <div className='w-full h-16  flex items-center justify-between px-4 font-medium border-b border-gray-300 shadow-sm bg-white'>
        <div className='flex items-center space-x-2'>
            <img src={logo} alt="Logo" className='h-8 w-8 rounded-full' />
            <h1 className='text-xl font-bold'>DukaanWaala</h1>
        </div>
        <ul className='flex space-x-10 cursor-pointer'>
            <li ref={Dashboard} className='bg-green-400 px-2 py-1 rounded font-medium ' onClick={(e) => {handlePageClicks(e)}}>Dashboard</li>
            <li ref={Orders} className='px-2 py-1  rounded font-medium hover:bg-gray-200' onClick={(e) => {handlePageClicks(e)}}>Orders</li>
            <li ref={Products} className='px-2 py-1  rounded font-medium hover:bg-gray-200' onClick={(e) => {handlePageClicks(e)}}>Products</li>
            <li ref={Profile} className='px-2 py-1  rounded font-medium hover:bg-gray-200' onClick={(e) => {handlePageClicks(e)}}>Profile</li>
        </ul>
    </div>
  )
}

export default Header