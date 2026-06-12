import React, { useState } from 'react';
import { useCustomers } from '../../../context/CustomerContext';
import { IoMdPersonAdd, IoMdSearch, IoMdTrash, IoMdCall, IoMdPin } from 'react-icons/io';
import AddCustomerModal from './AddCustomerModal';

const Customers = () => {
  const { customers, loading, error, addCustomer, removeCustomer, maxCustomers } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.buyerId?.name && c.buyerId.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading && customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold animate-pulse uppercase tracking-[0.2em] text-xs">Syncing Customer Network...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 py-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Customers</h2>
          <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">
            Manage your network of <span className="text-green-600">{customers.length} connected shops</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
           {/* Customer Count Badge */}
           <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Network Capacity</span>
              <span className="text-xl font-black text-gray-900 tracking-tighter">{customers.length}/{maxCustomers}</span>
           </div>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 hover:bg-green-600 transition-all active:scale-95"
           >
             <IoMdPersonAdd className="text-xl" />
             Connect more customer
           </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-2xl border border-red-100 font-bold text-xs uppercase tracking-widest">
          ⚠️ Error: {error}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="w-full bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative group">
          <IoMdSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-green-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name, shop, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-500 focus:shadow-[0_0_0_4px_rgba(22,163,74,0.1)] outline-none transition-all font-bold text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Info</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined On</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:bg-green-600 transition-colors overflow-hidden">
                          {customer.buyerId?.profileImage ? (
                            <img src={customer.buyerId.profileImage} className="w-full h-full object-cover" alt="" />
                          ) : (
                            (customer.buyerId?.name || customer.name).charAt(0)
                          )}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm">{customer.shopName}</p>
                          <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">
                            ID: {customer.id} • {customer.buyerId?.name || customer.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs">
                          <IoMdCall className="text-green-600" />
                          {customer.buyerId?.phone || customer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                          <IoMdPin className="text-blue-500" />
                          {customer.buyerId?.address || customer.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-gray-900 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        {new Date(customer.joinedDate || customer.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => { if(window.confirm('Remove customer?')) removeCustomer(customer._id) }}
                        className="p-2.5 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all active:scale-95 shadow-sm border border-transparent hover:border-red-100"
                      >
                        <IoMdTrash className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-20 text-center">
                    <div className="max-w-xs mx-auto space-y-4">
                      <div className="text-5xl">👥</div>
                      <p className="text-gray-400 text-sm font-black uppercase tracking-widest">No customers found matching your search</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="text-green-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addCustomer} 
      />
    </div>
  );
};

export default Customers;
