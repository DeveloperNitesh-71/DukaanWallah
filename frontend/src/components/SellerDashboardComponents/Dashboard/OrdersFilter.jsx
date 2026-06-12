import React from 'react';
import { IoMdSearch } from 'react-icons/io';

const OrdersFilter = ({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery
}) => {
  const tabs = ['All Orders', 'Pending', 'Processing', 'Completed', 'Cancelled'];

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-[#ebebeb] shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-full">
          <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] text-lg" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search orders…"
            aria-label="Search orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#fafafa] border border-[#ebebeb] rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm placeholder:text-[#888888]"
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-full border-t border-[#ebebeb] pt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'text-[#666666] hover:bg-[#fafafa]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrdersFilter;
