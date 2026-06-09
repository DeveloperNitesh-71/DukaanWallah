import React, { useState } from 'react';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import { IoMdPerson, IoMdMail, IoMdPhonePortrait, IoMdPin, IoMdCamera, IoMdSave } from 'react-icons/io';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Guest User',
    email: 'guest@dukaanwallah.com',
    phone: '+91 98765 43210',
    address: '123, Green Park, South Delhi, Delhi - 110016',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate API call
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-50">
          {/* Cover Header */}
          <div className="h-48 bg-gradient-to-r from-green-600 to-green-800 relative">
            <div className="absolute -bottom-16 left-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-green-50 flex items-center justify-center text-4xl font-black text-green-700 border-2 border-green-100">
                    {userInfo.name.charAt(0)}
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <IoMdCamera />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{userInfo.name}</h1>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Prime Member • Member since 2026</p>
              </div>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${
                  isEditing 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {isEditing ? <><IoMdSave /> Save Changes</> : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input 
                    type="text" 
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-bold outline-none ${
                      isEditing 
                      ? 'bg-white border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.1)] text-gray-900' 
                      : 'bg-gray-50 border-gray-100 text-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <IoMdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input 
                    type="email" 
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-bold outline-none ${
                      isEditing 
                      ? 'bg-white border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.1)] text-gray-900' 
                      : 'bg-gray-50 border-gray-100 text-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative">
                  <IoMdPhonePortrait className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input 
                    type="text" 
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-bold outline-none ${
                      isEditing 
                      ? 'bg-white border-green-500 shadow-[0_0_0_4_rgba(34,197,94,0.1)] text-gray-900' 
                      : 'bg-gray-50 border-gray-100 text-gray-500'
                    }`}
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Default Delivery Address</label>
                <div className="relative">
                  <IoMdPin className="absolute left-4 top-5 text-gray-400 text-xl" />
                  <textarea 
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border transition-all font-bold outline-none resize-none ${
                      isEditing 
                      ? 'bg-white border-green-500 shadow-[0_0_0_4px_rgba(34,197,94,0.1)] text-gray-900' 
                      : 'bg-gray-50 border-gray-100 text-gray-500'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Account Stats */}
            <div className="mt-12 pt-12 border-t border-gray-100 grid grid-cols-3 gap-4">
               <div className="text-center">
                 <p className="text-2xl font-black text-gray-900">12</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Orders</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-black text-gray-900">₹2,450</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Spent</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-black text-gray-900">4</p>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Wishlist</p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
