import React, { useState, useRef } from 'react'
import { IoMdPerson, IoMdMail, IoMdPhonePortrait, IoMdPin, IoMdCamera, IoMdSave, IoMdBusiness } from 'react-icons/io';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Ramesh Kumar',
    shopName: 'Ramesh Kirana & Dairy',
    email: 'ramesh@dukaanwallah.com',
    phone: '+91 99887 76655',
    address: '45, Market Street, Sector 18, Noida - 201301',
    profileImage: null,
    bannerImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const profileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Seller profile updated successfully!');
  };

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 py-4'>
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Profile</h2>
            <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Manage your business credentials and store identity</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100 max-w-4xl">
          {/* Hidden File Inputs */}
          <input 
            type="file" 
            ref={profileInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'profileImage')} 
          />
          <input 
            type="file" 
            ref={bannerInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'bannerImage')} 
          />

          {/* Cover Header Wrapper */}
          <div className="relative">
            {/* Banner Container */}
            <div className="h-40 relative overflow-hidden">
              {userInfo.bannerImage ? (
                <img src={userInfo.bannerImage} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-green-500 to-green-400"></div>
              )}
              
              <button 
                onClick={() => bannerInputRef.current.click()}
                aria-label="Change banner photo" 
                className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-400 rounded-xl shadow-lg hover:text-green-600 transition-all active:scale-95 z-10"
              >
                <IoMdCamera className="text-xl" aria-hidden="true" />
              </button>
            </div>

            {/* Profile Picture Container */}
            <div className="absolute -bottom-12 left-10 z-20">
              <div className="relative group">
                <div className="w-28 h-28 bg-white rounded-2xl border border-gray-100 p-1.5 shadow-xl flex items-center justify-center overflow-hidden">
                  {userInfo.profileImage ? (
                    <img src={userInfo.profileImage} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center text-4xl font-black text-white shadow-lg uppercase">
                      {userInfo.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => profileInputRef.current.click()}
                  aria-label="Upload store photo" 
                  className="absolute bottom-1 right-1 p-2.5 bg-white border border-gray-100 text-gray-400 rounded-xl shadow-lg hover:text-green-600 transition-all active:scale-95"
                >
                  <IoMdCamera className="text-xl" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-10 px-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">{userInfo.shopName}</h1>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full">Managed by {userInfo.name}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-green-600 px-3 py-1 rounded-full shadow-lg shadow-green-100">Pro Seller</span>
                </div>
              </div>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
                  isEditing 
                  ? 'bg-green-600 text-white shadow-xl shadow-green-100 hover:bg-green-700' 
                  : 'bg-gray-900 text-white shadow-xl shadow-gray-200 hover:bg-green-600'
                }`}
              >
                {isEditing ? <><IoMdSave aria-hidden="true" className="text-xl" /> Save Profile</> : 'Edit Identity'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {/* Shop Name Field - Buyer Style */}
              <div className="space-y-3">
                <label htmlFor="shopName" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Business Name</label>
                <div className="relative group">
                  <IoMdBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" aria-hidden="true" />
                  <input 
                    type="text" 
                    id="shopName"
                    name="shopName"
                    value={userInfo.shopName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm font-bold transition-all ${
                      isEditing 
                      ? 'bg-white border-gray-200 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none' 
                      : 'bg-gray-50 border-transparent text-gray-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {/* Owner Name Field */}
              <div className="space-y-3">
                <label htmlFor="ownerName" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Owner Name</label>
                <div className="relative group">
                  <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" aria-hidden="true" />
                  <input 
                    type="text" 
                    id="ownerName"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm font-bold transition-all ${
                      isEditing 
                      ? 'bg-white border-gray-200 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none' 
                      : 'bg-gray-50 border-transparent text-gray-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <label htmlFor="emailAddress" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                <div className="relative group">
                  <IoMdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" aria-hidden="true" />
                  <input 
                    type="email" 
                    id="emailAddress"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm font-bold transition-all ${
                      isEditing 
                      ? 'bg-white border-gray-200 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none' 
                      : 'bg-gray-50 border-transparent text-gray-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-3">
                <label htmlFor="phoneNumber" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contact Number</label>
                <div className="relative group">
                  <IoMdPhonePortrait className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" aria-hidden="true" />
                  <input 
                    type="tel" 
                    id="phoneNumber"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm font-bold transition-all ${
                      isEditing 
                      ? 'bg-white border-gray-200 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none' 
                      : 'bg-gray-50 border-transparent text-gray-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="space-y-3 md:col-span-2">
                <label htmlFor="storeAddress" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Store Address</label>
                <div className="relative group">
                  <IoMdPin className="absolute left-4 top-4 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" aria-hidden="true" />
                  <textarea 
                    id="storeAddress"
                    name="address"
                    value={userInfo.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="3"
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-sm font-bold transition-all resize-none ${
                      isEditing 
                      ? 'bg-white border-gray-200 text-gray-900 shadow-sm focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none' 
                      : 'bg-gray-50 border-transparent text-gray-400 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Performance Stats - Buyer Style */}
            <div className="mt-16 pt-10 border-t border-gray-50 grid grid-cols-2 md:grid-cols-4 gap-6">
               <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                 <p className="text-3xl font-black text-gray-900 tracking-tighter">4.8</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Rating</p>
               </div>
               <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                 <p className="text-3xl font-black text-gray-900 tracking-tighter">56</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Products</p>
               </div>
               <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                 <p className="text-3xl font-black text-gray-900 tracking-tighter">1.2k</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Orders</p>
               </div>
               <div className="bg-green-600 rounded-2xl p-6 text-center shadow-xl shadow-green-100 group hover:-translate-y-1 transition-all">
                 <p className="text-3xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform">₹8.4L</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-green-100 mt-2">Total Sales</p>
               </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile