import React, { useMemo } from "react";
import OrdersContainer from "../Dashboard/OrdersContainer";
import { useSellerOrders } from "../../../context/SellerOrderContext";

const Orders = () => {
  const { orders } = useSellerOrders();

  const todaysAcceptedOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(order => order.date === today && order.status !== 'Pending' && order.status !== 'Cancelled');
  }, [orders]);

  const todaysProductTotals = useMemo(() => {
    const totals = {};
    todaysAcceptedOrders.forEach(order => {
      if (totals[order.name]) {
        totals[order.name].qty += order.qty;
      } else {
        totals[order.name] = {
          name: order.name,
          qty: order.qty,
          unit: order.unit,
          img: order.img
        };
      }
    });
    // Convert object to array and sort by quantity descending
    return Object.values(totals).sort((a, b) => b.qty - a.qty);
  }, [todaysAcceptedOrders]);

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 py-4'>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Orders</h2>
              <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Manage and track your customer orders in real-time.</p>
            </div>
      </div>
      
      {/* Today's Product Totals - List View */}
      {todaysProductTotals.length > 0 && (
        <div className="w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
          <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Ordered by Product</h3>
              <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Confirmed Orders for Today</p>
            </div>
            <div className="bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{todaysProductTotals.length} Products</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-50">
            {todaysProductTotals.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-6 hover:bg-green-50/30 transition-all group">
                <div className="flex items-center gap-6">
                  {/* Product Image */}
                  <div className="w-16 h-16 rounded-xl border border-gray-100 bg-white p-2 flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                  
                  {/* Product Info */}
                  <div>
                    <h4 className="text-lg font-black text-gray-900 group-hover:text-green-600 transition-colors uppercase tracking-tight">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-md">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Unit:</span>
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{product.unit}</span>
                      </div>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aggregated from confirmed orders</p>
                    </div>
                  </div>
                </div>

                {/* Quantity Badge */}
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Quantity</p>
                    <div className="flex items-baseline gap-1 justify-end">
                      <span className="text-3xl font-black text-gray-900 tracking-tighter">{product.qty}</span>
                      <span className="text-xs font-black text-green-600 uppercase tracking-widest">{product.unit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Orders Section */}
      <div className="w-full">
        <OrdersContainer 
          orders={todaysAcceptedOrders} 
          isDashboardView={true} 
        />
      </div>
    </div>
  );
};

export default Orders;
