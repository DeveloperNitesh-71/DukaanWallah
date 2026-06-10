import React, { useState } from 'react'
import Sidebar from '../SellerDashboardComponents/Sidebar'
import NotificationsPanel from '../SellerDashboardComponents/Dashboard/NotificationsPanel'
import { IoMdNotifications, IoMdSettings, IoMdSearch, IoMdPulse } from 'react-icons/io'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const SellerDashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Determine active page from path
  const getActivePage = () => {
    const path = location.pathname
    if (path === '/seller' || path === '/seller/') return 'Dashboard'
    if (path.includes('/seller/orders')) return 'Orders'
    if (path.includes('/seller/products')) return 'Products'
    if (path.includes('/seller/customers')) return 'Customer'
    if (path.includes('/seller/profile')) return 'Profile'
    if (path.includes('/seller/settings')) return 'Settings'
    return 'Dashboard'
  }

  const activePage = getActivePage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10)
  }

  return (
    <div className='flex h-screen bg-[#eff6ff] overflow-hidden' style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Sidebar activePage={activePage} />
      
      <div 
        className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto overflow-x-hidden"
        onScroll={handleScroll}
      >
        {/* Modern E-commerce Top Navbar - Buyer Style */}
        <header className="h-20 flex items-center justify-between py-4 px-8 sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-xl font-black text-gray-900 tracking-tighter uppercase">{activePage}</h2>
            
            {/* Real-time Status Indicator - Buyer Style */}
            <div className="hidden md:flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-gray-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Dashboard Search - Buyer Style */}
            <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-2xl focus-within:bg-white focus-within:border-green-500 focus-within:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] transition-all w-80">
              <IoMdSearch className="text-gray-400 text-xl" aria-hidden="true" />
              <input type="text" placeholder="Search dashboard..." aria-label="Search dashboard" className="bg-transparent border-none outline-none px-2 text-sm text-gray-900 w-full placeholder:text-gray-400 font-medium" />
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsNotificationsOpen(true)}
                aria-label="Notifications"
                className="p-3 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all relative"
              >
                <IoMdNotifications className="text-2xl" aria-hidden="true" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
              </button>
              <button 
                onClick={() => navigate('/seller/settings')}
                aria-label="Settings"
                className={`p-3 rounded-xl transition-all ${activePage === 'Settings' ? 'bg-gray-900 text-white shadow-lg shadow-gray-200' : 'text-gray-400 hover:text-gray-900 hover:bg-white'}`}
              >
                <IoMdSettings className="text-2xl" aria-hidden="true" />
              </button>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Admin</p>
                <p className="text-sm font-black text-gray-900 leading-none">Ramesh Kumar</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200 flex items-center justify-center font-black text-green-700 shadow-sm">
                RK
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 w-full max-w-7xl mx-auto min-w-0 flex-grow">
          <div className="animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Dashboard Popups */}
      <NotificationsPanel isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
    </div>
  )
}

export default SellerDashboard