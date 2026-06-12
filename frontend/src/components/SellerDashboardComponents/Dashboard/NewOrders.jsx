import React, { useMemo } from 'react'
import { IoMdMore, IoMdCheckmarkCircle, IoMdTime, IoMdCloseCircle, IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { useToast } from '../../../context/ToastContext';
import { useSellerOrders } from '../../../context/SellerOrderContext';

const NewOrders = ({ 
  orders = [], 
  isDashboardView = false, 
  onOrderClick,
  onAccept: propsOnAccept,
  onReject: propsOnReject,
  onAcceptAll: propsOnAcceptAll,
  onRejectAll: propsOnRejectAll,
  showActions = false
}) => {
  const { showToast } = useToast();
  const { acceptOrder, rejectOrder, acceptAllPending, rejectAllPending } = useSellerOrders();

  // Use props if provided, otherwise use context
  const handleAccept = propsOnAccept || acceptOrder;
  const handleReject = propsOnReject || rejectOrder;
  const handleAcceptAll = propsOnAcceptAll || acceptAllPending;
  const handleRejectAll = propsOnRejectAll || rejectAllPending;

  // Grouping logic: Combine multiple orders from the same customer into one display row
  const displayRows = useMemo(() => {
    const groups = {};
    
    orders.forEach(order => {
      // Robust key: Use buyerId _id, or buyer email, or order ID
      const customerKey = order.buyerId?._id || order.buyerId?.email || order._id;
      const customerName = order.buyerId?.name || "Guest Customer";
      
      if (!groups[customerKey]) {
        groups[customerKey] = {
          customerName,
          buyerId: order.buyerId,
          totalAmount: 0,
          items: [],
          status: order.status,
          date: order.createdAt,
          orderIds: [order._id],
          originalOrders: [order]
        };
      } else {
        groups[customerKey].orderIds.push(order._id);
        groups[customerKey].originalOrders.push(order);
      }

      groups[customerKey].totalAmount += order.totalAmount;
      
      order.items.forEach(item => {
        const existingItem = groups[customerKey].items.find(i => i.name === item.name);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          groups[customerKey].items.push({ ...item });
        }
      });

      // Priority status for the group row
      const currentStatus = order.status.toLowerCase();
      const groupStatus = groups[customerKey].status.toLowerCase();
      
      if (currentStatus === 'pending') {
        groups[customerKey].status = 'pending';
      } else if (currentStatus === 'processing' && groupStatus !== 'pending') {
        groups[customerKey].status = 'processing';
      }
    });

    return Object.values(groups).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders]);

  const exportToCSV = (ordersToExport) => {
    if (!ordersToExport || ordersToExport.length === 0) {
      showToast("No orders to export", 'error');
      return;
    }

    const headers = ["Customer", "Status", "Total Amount", "Items"];
    const rows = ordersToExport.map(row => [
      row.customerName,
      row.status,
      row.totalAmount.toFixed(2),
      row.items.map(i => `${i.name} (${i.quantity})`).join('; ')
    ]);

    const csvContent = headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGroupAction = (e, action, row) => {
    e.stopPropagation();
    if (action === 'Accept') {
      row.orderIds.forEach(id => handleAccept(id));
    } else if (action === 'Reject') {
      row.orderIds.forEach(id => handleReject(id));
    } else if (action === 'Checkout/Complete' && onOrderClick) {
      onOrderClick(row.originalOrders[0]); 
    } else if (action === 'Download CSV') {
      exportToCSV(displayRows);
    }
  };

  return (
    <div className='w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]'>
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-black text-gray-900 tracking-tighter uppercase">
            {showActions ? "Today's Order Center" : (isDashboardView ? "Recent Orders" : "All Orders")}
          </h3>
          {showActions && displayRows.some(o => o.status.toLowerCase() === 'pending') && (
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Action Required</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showActions && (
            <div className="flex gap-2">
              <button 
                onClick={(e) => handleGroupAction(e, 'Download CSV')}
                className="text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100 mr-2"
              >
                Export CSV
              </button>
              {displayRows.some(o => o.status.toLowerCase() === 'pending') && (
                <>
                  <button 
                    onClick={handleAcceptAll}
                    className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-green-100"
                  >
                    <IoMdCheckmark className="text-sm" />
                    Accept All
                  </button>
                  <button 
                    onClick={handleRejectAll}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-red-100 text-red-600 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                  >
                    <IoMdClose className="text-sm" />
                    Reject All
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Details</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Aggregated Items</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Value</th>
              {showActions && <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {displayRows.length > 0 ? (
              displayRows.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group active:bg-blue-50" 
                  tabIndex="0"
                  onClick={(e) => !showActions && handleGroupAction(e, 'Checkout/Complete', row)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !showActions) {
                      e.preventDefault();
                      handleGroupAction(e, 'Checkout/Complete', row);
                    }
                  }}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-gray-400 overflow-hidden shadow-inner">
                         {row.buyerId?.profileImage ? (
                           <img src={row.buyerId.profileImage} className="w-full h-full object-cover" alt="" />
                         ) : (
                           row.customerName.charAt(0)
                         )}
                       </div>
                       <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-green-600 transition-colors">{row.customerName}</p>
                        <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">
                          {row.orderIds.length} Order{row.orderIds.length > 1 ? 's' : ''} • {new Date(row.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-2">
                      {row.items.slice(0, 3).map((item, iidx) => (
                        <span key={iidx} className="bg-gray-50 px-2 py-1 rounded-lg border border-gray-100 text-[10px] font-bold text-gray-600">
                          {item.name} <span className="text-gray-400">x{item.quantity}</span>
                        </span>
                      ))}
                      {row.items.length > 3 && (
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pt-1">+{row.items.length - 3} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      row.status.toLowerCase() === 'delivered' ? 'bg-green-100 text-green-700' : 
                      row.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      row.status.toLowerCase() === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-gray-900 text-base tracking-tighter">₹{row.totalAmount.toFixed(2)}</span>
                  </td>
                  {showActions && (
                    <td className="px-8 py-5 text-right">
                      {row.status.toLowerCase() === 'processing' || row.status.toLowerCase() === 'delivered' ? (
                        <div className="flex justify-end">
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                            <IoMdCheckmarkCircle className="text-sm" />
                            {row.status.toUpperCase()}
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={(e) => handleGroupAction(e, 'Accept', row)}
                            className="p-2.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all active:scale-95 group/btn shadow-sm"
                            title="Accept All from Customer"
                          >
                            <IoMdCheckmark className="text-lg" />
                          </button>
                          <button 
                            onClick={(e) => handleGroupAction(e, 'Reject', row)}
                            className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all active:scale-95 group/btn shadow-sm"
                            title="Reject All from Customer"
                          >
                            <IoMdClose className="text-lg" />
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={showActions ? 5 : 4} className="px-8 py-16 text-center">
                  <p className="text-gray-400 text-sm font-black uppercase tracking-widest">No orders found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {!showActions && displayRows.length > 0 && (
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-3">
            <button 
              onClick={(e) => handleGroupAction(e, 'Download CSV')}
              className="text-[10px] font-black uppercase tracking-widest text-white bg-gray-900 hover:bg-green-600 px-5 py-2.5 rounded-xl shadow-lg shadow-gray-200 transition-all active:scale-95"
            >
              Export CSV
            </button>
          </div>
          <div className="text-right flex items-center gap-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Total Portfolio Volume</span>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">₹{displayRows.reduce((sum, r) => sum + r.totalAmount, 0).toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewOrders