import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack, IoMdCash, IoMdPerson, IoMdCheckmark, IoMdMap, IoMdInformationCircle, IoMdBusiness } from 'react-icons/io';
import API from '../../../api';
import { useToast } from '../../../context/ToastContext';
import { useSellerOrders } from '../../../context/SellerOrderContext';

const OrderCheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { orders, updateOrderStatus, loading: contextLoading } = useSellerOrders();
  
  const [primaryOrder, setPrimaryOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // 1. Fetch the primary order from API to ensure we have fresh data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setPrimaryOrder(data);
        setLoading(false);
      } catch (err) {
        showToast(err.response?.data?.message || 'Failed to fetch order details', 'error');
        navigate('/seller/orders');
      }
    };
    fetchOrder();
  }, [id]);

  // 2. Aggregate all orders for this customer from the global context
  const aggregatedData = useMemo(() => {
    if (!primaryOrder || orders.length === 0) return null;

    const customerKey = primaryOrder.buyerId?._id || primaryOrder.buyerId?.email || primaryOrder._id;
    
    // Find all other orders from the same customer that are NOT cancelled or already delivered
    // We strictly match what's on the dashboard (Today's active orders)
    const relatedOrders = orders.filter(o => {
        const oKey = o.buyerId?._id || o.buyerId?.email || o._id;
        const status = o.status.toLowerCase();
        return oKey === customerKey && (status === 'pending' || status === 'processing');
    });

    // If primary order is already delivered, just show it
    if (primaryOrder.status.toLowerCase() === 'delivered') {
        return {
            items: primaryOrder.items,
            totalAmount: primaryOrder.totalAmount,
            orderIds: [primaryOrder._id],
            customerName: primaryOrder.buyerId?.name || "Guest Customer",
            shopName: primaryOrder.buyerId?.shopName || "",
            customerInfo: primaryOrder.buyerId,
            address: primaryOrder.shippingAddress,
            status: 'delivered'
        };
    }

    // Merge logic
    const itemsMap = {};
    const orderIds = new Set();
    let total = 0;

    relatedOrders.forEach(o => {
        orderIds.add(o._id);
        total += o.totalAmount;
        o.items.forEach(item => {
            if (itemsMap[item.name]) {
                itemsMap[item.name].quantity += item.quantity;
            } else {
                itemsMap[item.name] = { ...item };
            }
        });
    });

    return {
        items: Object.values(itemsMap),
        totalAmount: total,
        orderIds: Array.from(orderIds),
        customerName: primaryOrder.buyerId?.name || "Guest Customer",
        shopName: primaryOrder.buyerId?.shopName || "",
        customerInfo: primaryOrder.buyerId,
        address: primaryOrder.shippingAddress,
        status: primaryOrder.status
    };
  }, [primaryOrder, orders]);

  const handleComplete = async () => {
    if (!aggregatedData) return;
    
    setIsProcessing(true);
    try {
      // Finalize ALL grouped orders
      await Promise.all(aggregatedData.orderIds.map(orderId => updateOrderStatus(orderId, 'delivered')));
      
      setIsProcessing(false);
      setIsSuccess(true);
      showToast('All customer orders marked as delivered!', 'success');
      setTimeout(() => {
        navigate('/seller/orders');
      }, 2000);
    } catch (err) {
      setIsProcessing(false);
      // Error handled by context
    }
  };

  if (loading || contextLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Compiling Customer Manifest...</p>
      </div>
    );
  }

  if (!aggregatedData) return null;

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/seller/orders')}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-all group px-2 py-1 -ml-2"
      >
        <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform text-xl" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Orders</span>
      </button>

      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 py-4'>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Group Transaction</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
               <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                 Grouping: <span className="text-green-600">{aggregatedData.orderIds.length} Combined Orders</span>
               </span>
               <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-sm ${
                 aggregatedData.status === 'delivered' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'
               }`}>
                 {aggregatedData.status}
               </span>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Customer & Delivery Info */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
            <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Logistics & Identity</h2>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl flex-shrink-0 border border-indigo-100 shadow-sm">
                  <IoMdPerson />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">{aggregatedData.customerName}</h3>
                  <p className="text-sm font-bold text-gray-500 mt-1">{aggregatedData.customerInfo?.phone || 'No phone provided'}</p>
                  <p className="text-xs font-medium text-gray-400">{aggregatedData.customerInfo?.email}</p>
                </div>
              </div>

              <div className="h-px bg-gray-50 w-full"></div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 text-2xl flex-shrink-0 border border-orange-100 shadow-sm">
                  <IoMdMap />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Destination</p>
                  <div className="flex items-center gap-2 mb-2">
                    <IoMdBusiness className="text-green-600" />
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{aggregatedData.shopName || 'Home Delivery'}</h3>
                  </div>
                  <div className="text-sm font-bold text-gray-500 mt-2 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {aggregatedData.address?.address}, {aggregatedData.address?.city}
                    <br />
                    {aggregatedData.address?.postalCode}, {aggregatedData.address?.country}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
            <div className="px-8 py-5 border-b border-gray-50 bg-gray-50/30">
              <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Settlement Configuration</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center justify-between px-6 py-5 rounded-2xl border transition-all active:scale-[0.98] ${
                    paymentMethod === 'cash' 
                    ? 'bg-green-50 border-green-500 text-green-700 shadow-lg shadow-green-100' 
                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <IoMdCash className="text-2xl" /> 
                    <span className="text-sm font-black uppercase tracking-widest">Cash on Delivery</span>
                  </div>
                  {paymentMethod === 'cash' && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                </button>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between px-6 py-5 rounded-2xl border transition-all active:scale-[0.98] ${
                    paymentMethod === 'upi' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-lg shadow-blue-100' 
                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black italic">UPI</span>
                    <span className="text-sm font-black uppercase tracking-widest">Digital Payment</span>
                  </div>
                  {paymentMethod === 'upi' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Summary */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-[2.5rem] shadow-2xl p-10 text-white sticky top-24 overflow-hidden">
             {/* Decor */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h2 className="text-xl font-black tracking-tight uppercase">Invoice</h2>
                <IoMdInformationCircle className="text-gray-500 text-xl" />
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Aggregated Manifest</p>
                <div className="max-h-60 overflow-y-auto pr-2 space-y-4 no-scrollbar">
                  {aggregatedData.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                      <div>
                        <p className="text-sm font-black tracking-tight group-hover:text-green-400 transition-colors">{item.name}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Qty: {item.quantity} x ₹{item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-black text-sm tracking-tight text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Combined Subtotal</span>
                  <span className="font-bold text-white">₹{aggregatedData.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Delivery Fee</span>
                  <span className="text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">FREE</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-xs font-black uppercase tracking-widest text-white">Total Payable</span>
                  <span className="text-3xl font-black text-white tracking-tighter">₹{aggregatedData.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleComplete}
                disabled={isProcessing || isSuccess || aggregatedData.status === 'delivered'}
                className={`w-full py-6 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-xl flex items-center justify-center gap-3 ${
                  aggregatedData.status === 'delivered' || isSuccess 
                    ? 'bg-green-600 text-white cursor-default' 
                    : 'bg-white text-gray-900 hover:bg-green-600 hover:text-white shadow-white/5'
                } disabled:opacity-50`}
              >
                {isProcessing ? (
                  <span className="w-5 h-5 border-4 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></span>
                ) : (aggregatedData.status === 'delivered' || isSuccess) ? (
                  <><IoMdCheckmark className="text-xl" /> Group Delivered</>
                ) : (
                  <>Finalize All Delivery</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckoutPage;
