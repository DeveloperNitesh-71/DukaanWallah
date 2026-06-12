import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import { useBuyer } from '../context/BuyerContext';
import { useToast } from '../context/ToastContext';
import { IoMdPerson, IoMdMail, IoMdPhonePortrait, IoMdPin, IoMdCamera, IoMdSave, IoMdCopy, IoMdBusiness } from 'react-icons/io';

const ProfilePage = () => {
  const { userInfo, updateUserInfo, updateImage } = useBuyer();
  const { showToast } = useToast();
  const [localInfo, setLocalInfo] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '',
    shopName: '',
    ...userInfo 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const profileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    if (userInfo) {
      setLocalInfo({ ...userInfo });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = await updateImage(type, reader.result);
        if (!result.success) {
          showToast(result.message, 'error');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateUserInfo(localInfo);
    setIsSaving(false);
    
    if (result.success) {
      setIsEditing(false);
      showToast('Profile updated successfully!', 'success');
    } else {
      showToast(result.message, 'error');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('ID copied to clipboard!', 'info');
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden border border-gray-50">
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
            <div className="h-48 relative overflow-hidden">
              {userInfo.bannerImage ? (
                <img src={userInfo.bannerImage} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-green-600 to-green-800"></div>
              )}
              
              <button 
                onClick={() => bannerInputRef.current.click()}
                aria-label="Change banner photo"
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl shadow-lg hover:scale-110 transition-transform z-10"
              >
                <IoMdCamera />
              </button>
            </div>

            {/* Profile Picture Container */}
            <div className="absolute -bottom-16 left-10 z-20">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl overflow-hidden">
                  {userInfo.profileImage ? (
                    <img src={userInfo.profileImage} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-green-50 flex items-center justify-center text-4xl font-black text-green-700 border-2 border-green-100 uppercase">
                      {userInfo.name.charAt(0)}
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => profileInputRef.current.click()}
                  aria-label="Upload profile photo"
                  className="absolute bottom-2 right-2 p-2 bg-gray-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform"
                >
                  <IoMdCamera />
                </button>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="absolute -bottom-16 right-10 z-20">
              <div className="bg-white p-3 rounded-3xl shadow-xl border border-gray-50 flex flex-col items-center gap-2 group hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-2">
                   <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${userInfo._id}`} 
                    alt="Your ID QR Code"
                    className="w-full h-full"
                   />
                </div>
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Your QR Code</p>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-12 px-10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">{localInfo.shopName || userInfo.name}</h1>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">Prime Member • Member since 2026</p>
                
                {/* ID Display */}
                <div className="mt-4 flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-fit group">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer ID:</p>
                   <code className="text-xs font-bold text-green-700">{userInfo._id}</code>
                   <button 
                    onClick={() => copyToClipboard(userInfo._id)}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-400 hover:text-green-600"
                    title="Copy ID"
                   >
                     <IoMdCopy />
                   </button>
                </div>
              </div>
              <button 
                disabled={isSaving}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${
                  isEditing 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } disabled:opacity-50`}
              >
                {isSaving ? 'Saving...' : (isEditing ? <><IoMdSave /> Save Changes</> : 'Edit Profile')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shop Name Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Shop / Business Name</label>
                <div className="relative">
                  <IoMdBusiness className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input 
                    type="text" 
                    name="shopName"
                    placeholder="e.g. Agarwal General Store"
                    value={localInfo.shopName || ''}
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

              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                  <input 
                    type="text" 
                    name="name"
                    value={localInfo.name}
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
                    value={localInfo.email}
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
                    value={localInfo.phone || ''}
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

              {/* Address Field */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Default Delivery Address</label>
                <div className="relative">
                  <IoMdPin className="absolute left-4 top-5 text-gray-400 text-xl" />
                  <textarea 
                    name="address"
                    value={localInfo.address || ''}
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
