import React from 'react';
import { IoMdSpeedometer, IoMdListBox, IoMdCart, IoMdPerson, IoMdLogOut, IoMdSettings, IoMdHelpCircle, IoMdPeople } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <IoMdSpeedometer />, path: '/seller' },
    { name: 'Orders', icon: <IoMdListBox />, path: '/seller/orders' },
    { name: 'Products', icon: <IoMdCart />, path: '/seller/products' },
    { name: 'Customer', icon: <IoMdPeople />, path: '/seller/customers' },
    { name: 'Profile', icon: <IoMdPerson />, path: '/seller/profile' },
  ];

  const secondaryItems = [
    { name: 'Settings', icon: <IoMdSettings />, path: '/seller/settings' },
    { name: 'Help', icon: <IoMdHelpCircle />, id: 'Help' },
  ];

  return (
    <div className="w-72 min-w-[18rem] flex-shrink-0 bg-white h-screen flex flex-col border-r border-gray-100 z-20 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      {/* Brand - Buyer Style */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/seller')}>
          <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-green-100 group-hover:rotate-12 transition-transform">
            🛍️
          </div>
          <div>
            <span className="block text-xl font-black tracking-tighter leading-none text-gray-900 uppercase">Dukaan<span className="text-green-600">Waala</span></span>
            <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mt-1 block">Seller Hub</span>
          </div>
        </div>
      </div>

      {/* Main Navigation - Buyer Style */}
      <div className="px-4 mb-auto space-y-8">
        <div>
          <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Navigation</p>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = activePage === item.name;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] group ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-2xl transition-colors ${isActive ? 'text-green-500' : 'text-gray-400 group-hover:text-green-600'}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-tight">{item.name}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>}
                </button>
              )
            })}
          </nav>
        </div>

        <div>
          <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Management</p>
          <nav className="space-y-2">
            {secondaryItems.map((item) => {
              const isActive = activePage === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => item.path && navigate(item.path)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all group active:scale-[0.98] ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`text-2xl transition-colors ${isActive ? 'text-green-500' : 'text-gray-400 group-hover:text-green-600'}`}>
                    {item.icon}
                  </span>
                  <span className="tracking-tight">{item.name}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Profile/Logout - Buyer Style */}
      <div className="p-6 border-t border-gray-100">
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-black text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all group active:scale-[0.98]"
        >
          <IoMdLogOut className="text-2xl text-gray-400 group-hover:text-red-500 transition-colors" />
          <span className="uppercase tracking-widest text-xs">Sign Out</span>
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
