import React from 'react';
import { IoMdClose, IoMdNotifications, IoMdCheckmarkCircle, IoMdTime, IoMdAlert } from 'react-icons/io';

const NotificationsPanel = ({ isOpen, onClose }) => {
  const notifications = [
    { id: 1, title: 'New Order Received', desc: 'Order #ORD-9921 from Ramesh for ₹550', time: '2 mins ago', type: 'order' },
    { id: 2, title: 'Payment Successful', desc: 'Received ₹1,200 for 3 orders', time: '15 mins ago', type: 'payment' },
    { id: 3, title: 'Low Stock Alert', desc: 'Amul Milk 500ml is below 10 units', time: '1 hour ago', type: 'alert' },
    { id: 4, title: 'Delivery Completed', desc: 'Order #ORD-8812 delivered successfully', time: '2 hours ago', type: 'delivery' },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/10 backdrop-blur-[1px] z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-[#ebebeb] shadow-xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-4 border-b border-[#ebebeb] flex items-center justify-between bg-[#fafafa]">
            <h2 className="text-sm font-semibold text-[#171717]">Activity</h2>
            <button onClick={onClose} className="p-1 hover:bg-[#ebebeb] rounded-md transition-colors text-[#888888]">
              <IoMdClose className="text-xl" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-2 space-y-1 no-scrollbar">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 rounded-md hover:bg-[#fafafa] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xs font-medium text-[#171717]">{notif.title}</h3>
                  <span className="text-[10px] text-[#888888] font-mono">{notif.time}</span>
                </div>
                <p className="text-xs text-[#666666] leading-relaxed">{notif.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-[#ebebeb]">
            <button className="w-full py-2 bg-[#171717] text-white font-medium text-xs rounded-md hover:bg-[#333333] transition-all">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;
