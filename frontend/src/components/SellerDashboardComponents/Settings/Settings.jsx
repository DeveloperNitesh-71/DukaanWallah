import React, { useState } from 'react';
import { IoMdPerson, IoMdLock, IoMdNotifications, IoMdColorPalette, IoMdSave, IoMdGlobe, IoMdNotificationsOutline, IoMdEye, IoMdKey } from 'react-icons/io';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', name: 'Profile Settings', icon: <IoMdPerson /> },
    { id: 'store', name: 'Store Preferences', icon: <IoMdGlobe /> },
    { id: 'notifications', name: 'Notifications', icon: <IoMdNotifications /> },
    { id: 'security', name: 'Security & Privacy', icon: <IoMdLock /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" defaultValue="Ramesh Kumar" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" defaultValue="ramesh@dukaanwallah.com" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bio / Store Description</label>
              <textarea rows="4" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900 resize-none"></textarea>
            </div>
          </div>
        );
      case 'store':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Store Language</label>
                <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900 appearance-none">
                  <option>English (US)</option>
                  <option>Hindi (India)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Currency</label>
                <select className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900 appearance-none">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
               <div>
                 <p className="font-black text-gray-900 uppercase tracking-tight">Public Storefront</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Make your store visible to everyone</p>
               </div>
               <div className="w-12 h-6 bg-green-600 rounded-full relative cursor-pointer">
                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
               </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { title: 'Email Notifications', desc: 'Receive daily sales reports via email' },
              { title: 'New Order Alerts', desc: 'Get notified immediately when a new order arrives' },
              { title: 'Customer Messages', desc: 'Alerts for new chat messages from buyers' },
              { title: 'Marketing Emails', desc: 'Stay updated with new features and tips' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl text-gray-400">
                    <IoMdNotificationsOutline />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 uppercase tracking-tight">{item.title}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{item.desc}</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'security':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-widest text-xs mb-6">
                <IoMdKey className="text-xl text-green-600" /> Password Management
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 outline-none transition-all font-bold text-gray-900" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 outline-none transition-all font-bold text-gray-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 outline-none transition-all font-bold text-gray-900" />
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
               <div>
                 <p className="font-black text-gray-900 uppercase tracking-tight">Two-Factor Authentication</p>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Add an extra layer of security to your account</p>
               </div>
               <button className="px-6 py-2.5 bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-900 rounded-xl hover:bg-gray-50 transition-all shadow-sm">Enable</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Settings</h2>
          <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Personalize your experience and store control</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-green-600 transition-all active:scale-95">
          <IoMdSave className="text-xl" />
          Save All Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 space-y-2 sticky top-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-gray-900 text-white shadow-xl shadow-gray-200'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={`text-2xl ${activeTab === tab.id ? 'text-green-500' : 'text-gray-400'}`}>
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-grow bg-white rounded-[40px] border border-gray-100 shadow-[0_2px_40px_rgba(0,0,0,0.03)] p-10 min-h-[600px]">
          <div className="mb-10 flex items-center justify-between border-b border-gray-50 pb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
                {tabs.find(t => t.id === activeTab)?.name}
              </h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                Configure your {activeTab} preferences below
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl text-green-600">
              {tabs.find(t => t.id === activeTab)?.icon}
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
