import React from 'react';
import { IoMdClose, IoMdSettings, IoMdPerson, IoMdLock, IoMdNotifications, IoMdColorPalette } from 'react-icons/io';

const SettingsModal = ({ isOpen, onClose }) => {
  const sections = [
    { id: 'account', name: 'Account Info', icon: <IoMdPerson /> },
    { id: 'security', name: 'Security', icon: <IoMdLock /> },
    { id: 'notif', name: 'Notifications', icon: <IoMdNotifications /> },
    { id: 'theme', name: 'Appearance', icon: <IoMdColorPalette /> },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-lg border border-[#ebebeb] shadow-[0_24px_32px_-8px_rgba(0,0,0,0.06)] z-[70] transform transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="flex h-[500px]">
          {/* Sidebar */}
          <div className="w-60 bg-[#fafafa] p-6 rounded-l-lg border-r border-[#ebebeb]">
            <div className="flex items-center gap-2 mb-8">
              <h2 className="text-sm font-semibold text-[#171717]">Settings</h2>
            </div>
            <nav className="space-y-1">
              {sections.map(s => (
                <button key={s.id} className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all ${s.id === 'account' ? 'bg-[#171717] text-white' : 'text-[#666666] hover:bg-[#ebebeb]'}`}>
                  <span className="text-lg">{s.icon}</span>
                  {s.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-grow p-8 flex flex-col relative bg-white rounded-r-lg">
            <button onClick={onClose} className="absolute top-6 right-6 p-1 hover:bg-[#ebebeb] rounded-md transition-colors text-[#888888]">
              <IoMdClose className="text-xl" />
            </button>

            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-[#171717] mb-6 tracking-tight">Account</h3>
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-[#888888] uppercase tracking-wider font-mono">Store Language</label>
                  <select className="w-full bg-white border border-[#ebebeb] px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#171717]">
                    <option>English (US)</option>
                    <option>Hindi (India)</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-medium text-[#888888] uppercase tracking-wider font-mono">Timezone</label>
                  <select className="w-full bg-white border border-[#ebebeb] px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#171717]">
                    <option>(GMT+05:30) Mumbai, New Delhi</option>
                    <option>(GMT+00:00) London</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-[#ebebeb]">
              <button onClick={onClose} className="w-full py-2 bg-[#171717] text-white font-medium text-xs rounded-md hover:bg-[#333333] transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
