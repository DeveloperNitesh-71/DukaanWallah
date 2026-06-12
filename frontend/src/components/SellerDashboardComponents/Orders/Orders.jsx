import React, { useMemo, useState } from "react";
import OrdersContainer from "../Dashboard/OrdersContainer";
import { useSellerOrders } from "../../../context/SellerOrderContext";

const Orders = () => {
  const { orders } = useSellerOrders();
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Calculate confirmed product totals for Today
  const todaysConfirmedOrders = useMemo(() => {
    const today = new Date().setHours(0,0,0,0);
    return orders.filter(order => {
        const orderDate = new Date(order.createdAt).setHours(0,0,0,0);
        const status = order.status.toLowerCase();
        return orderDate === today && (status === 'processing' || status === 'delivered');
    });
  }, [orders]);

  const todaysProductTotals = useMemo(() => {
    const totals = {};
    todaysConfirmedOrders.forEach(order => {
      order.items.forEach(item => {
        const key = item.name;
        if (totals[key]) {
          totals[key].qty += item.quantity;
        } else {
          totals[key] = {
            name: item.name,
            qty: item.quantity,
            unit: 'units'
          };
        }
      });
    });
    return Object.values(totals).sort((a, b) => b.qty - a.qty);
  }, [todaysConfirmedOrders]);

  // 2. Filter orders for the main list based on tab and search
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Search filter
      const searchStr = searchQuery.toLowerCase();
      const matchesSearch = 
        order._id.toLowerCase().includes(searchStr) || 
        order.buyerId?.name?.toLowerCase().includes(searchStr) ||
        order.items.some(i => i.name.toLowerCase().includes(searchStr));
      
      if (!matchesSearch) return false;

      // Tab filter
      if (activeTab === 'All Orders') return true;
      return order.status.toLowerCase() === activeTab.toLowerCase() || (activeTab === 'Completed' && order.status.toLowerCase() === 'delivered');
    });
  }, [orders, activeTab, searchQuery]);

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 py-4'>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Order Command Center</h2>
              <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Global management of all customer transactions</p>
            </div>
      </div>
      
      {/* Today's Product Totals - List View */}
      {todaysProductTotals.length > 0 && (
        <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
          <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Live Product Demand</h3>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Aggregated Confirmed Orders (Today)</p>
            </div>
            <div className="bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{todaysProductTotals.length} Products</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-50">
            {todaysProductTotals.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-6 hover:bg-green-50/30 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-xl border border-gray-100 bg-white p-2 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center text-2xl">
                    📦
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 group-hover:text-green-600 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-md">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Unit:</span>
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{product.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Quantity</p>
                  <div className="flex items-baseline gap-1 justify-end">
                    <span className="text-3xl font-black text-gray-900 tracking-tighter">{product.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Orders List Section */}
      <div className="w-full">
        <OrdersContainer 
          orders={filteredOrders} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isDashboardView={false} 
        />
      </div>
    </div>
  );
};

export default Orders;
