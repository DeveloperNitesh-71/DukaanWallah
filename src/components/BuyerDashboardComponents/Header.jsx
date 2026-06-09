import React from "react";
import { IoMdSearch, IoMdCart, IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { cartCount } = useCart();

  return (
    <div className="bg-white sticky top-0 z-50 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <Link to="/buyer" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-green-200 group-hover:rotate-12 transition-transform">🛍️</div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              DUKAAN<span className="text-green-600">WALLAH</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative group">
            <input 
              type="text" 
              placeholder='Search for "Amul Milk", "Bread" or "Masala"...' 
              className="w-full bg-gray-50 border border-gray-100 px-12 py-3.5 rounded-2xl outline-none focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] transition-all font-medium text-gray-600"
            />
            <IoMdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-2xl group-focus-within:text-green-600 transition-colors" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-200 text-[10px] font-bold text-gray-500 px-1.5 py-0.5 rounded border border-gray-300">CTRL + K</div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:flex p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
              <IoMdNotificationsOutline className="text-2xl" />
            </button>
            <button className="hidden sm:flex p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
              <IoMdHeartEmpty className="text-2xl" />
            </button>
            
            <Link to="/buyer/cart" className="relative p-3 bg-gray-900 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-gray-200 active:scale-95 group">
              <IoMdCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="h-10 w-px bg-gray-100 mx-2 hidden sm:block"></div>

            <Link to="/buyer/profile" className="flex items-center gap-3 pl-2 group">
              <div className="hidden lg:block text-right">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Account</p>
                <p className="text-sm font-black text-gray-900 leading-none group-hover:text-green-600 transition-colors">Guest User</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-50 rounded-xl border border-green-200 flex items-center justify-center font-black text-green-700 shadow-sm group-hover:border-green-500 transition-all">
                G
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;


