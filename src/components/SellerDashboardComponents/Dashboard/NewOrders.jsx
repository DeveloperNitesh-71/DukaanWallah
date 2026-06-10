import React from 'react'
import { IoMdMore, IoMdCheckmarkCircle, IoMdTime, IoMdCloseCircle, IoMdCheckmark, IoMdClose } from 'react-icons/io'

const NewOrders = ({ 
  orders = [], 
  isDashboardView = false, 
  onOrderClick,
  onAccept,
  onReject,
  onAcceptAll,
  onRejectAll,
  showActions = false
}) => {
  const exportToCSV = (ordersToExport) => {
    if (!ordersToExport || ordersToExport.length === 0) {
      alert("No orders to export");
      return;
    }

    const headers = ["Buyer Name", "Buyer Shop Address", "Product", "Quantity", "Unit", "Price", "Total Amount"];
    
    const escapeCSV = (val) => {
      if (val === null || val === undefined) return "";
      const str = String(val);
      if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = ordersToExport.map(order => [
      escapeCSV(order.buyerName || 'N/A'),
      escapeCSV(order.buyerAddress || 'N/A'),
      escapeCSV(order.name),
      order.qty,
      escapeCSV(order.unit),
      order.price,
      order.qty * order.price
    ]);

    // Calculate Grand Total
    const grandTotal = ordersToExport.reduce((sum, order) => sum + (order.qty * order.price), 0);
    rows.push(["", "", "", "", "", "Grand Total", grandTotal]);

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

  const handleOrderAction = (e, action, order) => {
    e.stopPropagation();
    if (action === 'Accept' && onAccept) {
      onAccept(order.id);
    } else if (action === 'Reject' && onReject) {
      onReject(order.id);
    } else if (action === 'Checkout/Complete' && onOrderClick) {
      onOrderClick(order);
    } else if (action === 'Download CSV') {
      exportToCSV(orders);
    } else {
      alert(`${action} action for Order: ${order.id}`);
    }
  };

  return (
    <div className='w-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)]'>
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <div>
          <h3 className="text-lg font-black text-gray-900 tracking-tighter uppercase">
            {showActions ? "Today's Order Center" : (isDashboardView ? "Recent Orders" : "All Orders")}
          </h3>
          {showActions && orders.some(o => o.status === 'Pending') && (
            <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mt-1">Action Required</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {showActions && (
            <div className="flex gap-2">
              <button 
                onClick={(e) => handleOrderAction(e, 'Download CSV', {id: 'Today Pending'})}
                className="text-[10px] font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-100 mr-2"
              >
                Export CSV
              </button>
              {orders.some(o => o.status === 'Pending') && (
                <>
                  <button 
                    onClick={onAcceptAll}
                    className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-green-100"
                  >
                    <IoMdCheckmark className="text-sm" />
                    Accept All
                  </button>
                  <button 
                    onClick={onRejectAll}
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
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Quantity</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</th>
              {showActions && <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group active:bg-blue-50" 
                  tabIndex="0"
                  onClick={(e) => !showActions && handleOrderAction(e, 'Checkout/Complete', order)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !showActions) {
                      e.preventDefault();
                      handleOrderAction(e, 'Checkout/Complete', order);
                    }
                  }}
                  aria-label={showActions ? `Order ${order.id}` : `Checkout order ${order.id}`}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl border border-gray-100 bg-white p-1.5 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                        <img src={order.img} alt={order.name} width="48" height="48" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm group-hover:text-green-600 transition-colors">{order.name}</p>
                        <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-widest">ID: {order.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-gray-900">{order.qty}</span>
                    <span className="text-[10px] text-gray-400 ml-1.5 font-black uppercase tracking-widest">{order.unit}</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-black text-gray-900">₹{order.price}</td>
                  <td className="px-8 py-5">
                    <span className="font-black text-gray-900 text-base tracking-tighter">₹{order.qty * order.price}</span>
                  </td>
                  {showActions && (
                    <td className="px-8 py-5 text-right">
                      {order.status === 'Processing' ? (
                        <div className="flex justify-end">
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                            <IoMdCheckmarkCircle className="text-sm" />
                            Accepted
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={(e) => handleOrderAction(e, 'Accept', order)}
                            className="p-2.5 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all active:scale-95 group/btn shadow-sm"
                            title="Accept Order"
                          >
                            <IoMdCheckmark className="text-lg" />
                          </button>
                          <button 
                            onClick={(e) => handleOrderAction(e, 'Reject', order)}
                            className="p-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all active:scale-95 group/btn shadow-sm"
                            title="Reject Order"
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

      {!showActions && orders.length > 0 && (
        <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-3">
            <button 
              onClick={(e) => handleOrderAction(e, 'Download CSV', {id: 'All Visible'})}
              className="text-[10px] font-black uppercase tracking-widest text-white bg-gray-900 hover:bg-green-600 px-5 py-2.5 rounded-xl shadow-lg shadow-gray-200 transition-all active:scale-95"
            >
              Export CSV
            </button>
            <button 
              onClick={(e) => handleOrderAction(e, 'Print', {id: 'All Visible'})}
              className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 px-5 py-2.5 rounded-xl hover:bg-white transition-all active:scale-95"
            >
              Print
            </button>
          </div>
          <div className="text-right flex items-center gap-4">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Grand Total</span>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">₹{orders.reduce((sum, o) => sum + (o.qty * o.price), 0)}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewOrders