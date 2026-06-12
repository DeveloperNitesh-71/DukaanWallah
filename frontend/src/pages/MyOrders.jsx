import React, { useState, useEffect } from 'react';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import API from '../api';
import { IoMdTime, IoMdCheckmarkCircle, IoMdCloseCircle, IoMdArrowBack, IoMdInformationCircle, IoMdPin, IoMdBusiness } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch orders', err);
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return <IoMdTime />;
      case 'processing': return <IoMdInformationCircle />;
      case 'delivered': return <IoMdCheckmarkCircle />;
      case 'cancelled': return <IoMdCloseCircle />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <Link to="/buyer" className="w-14 h-14 bg-white shadow-xl shadow-gray-100 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:border-green-100 transition-all transform hover:-translate-x-1">
              <IoMdArrowBack className="text-2xl" />
            </Link>
            <div>
              <p className="text-[10px] text-green-600 font-black uppercase tracking-[0.3em] mb-1">Your Order History</p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                My Orders <span className="text-gray-200">/</span> <span className="text-green-600">{orders.length}</span>
              </h1>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs">Fetching your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.02)] p-20 text-center border border-gray-50 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center text-7xl mb-10">📦</div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">No orders yet</h2>
            <p className="text-gray-400 mb-12 max-w-sm mx-auto leading-relaxed font-medium">
              You haven't placed any orders yet. Start shopping to fill this space!
            </p>
            <Link 
              to="/buyer" 
              className="inline-flex items-center gap-4 bg-gray-900 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-green-600 hover:scale-105 transition-all shadow-2xl shadow-gray-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500">
                {/* Order Header */}
                <div className="px-10 py-8 border-b border-gray-50 bg-gray-50/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex flex-wrap items-center gap-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                      <p className="font-black text-gray-900 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
                      <p className="font-black text-gray-900 text-sm">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="font-black text-green-600 text-sm">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 px-6 py-3 rounded-2xl border font-black text-[10px] uppercase tracking-widest shadow-sm ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Items */}
                    <div className="space-y-6">
                      <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <div className="w-1 h-4 bg-green-600 rounded-full"></div>
                        Order Items
                      </h4>
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center font-black text-gray-400">
                                {idx + 1}
                              </div>
                              <div>
                                <p className="font-black text-gray-900 text-sm">{item.name}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qty: {item.quantity} • ₹{item.price.toFixed(2)}/unit</p>
                              </div>
                            </div>
                            <p className="font-black text-gray-900 text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-8">
                       {/* Seller Info */}
                       <div>
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                          Store Information
                        </h4>
                        <div className="flex items-center gap-4 p-6 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                          <div className="w-14 h-14 bg-white rounded-2xl border border-blue-100 flex items-center justify-center text-blue-600 text-2xl shadow-sm">
                            <IoMdBusiness />
                          </div>
                          <div>
                            <p className="font-black text-gray-900 text-lg tracking-tight">{order.sellerId?.shopName || order.sellerId?.name || 'Local Seller'}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.sellerId?.email}</p>
                          </div>
                        </div>
                       </div>

                       {/* Shipping Info */}
                       <div>
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                          <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                          Delivery Address
                        </h4>
                        <div className="flex gap-4 p-6 bg-orange-50/30 rounded-3xl border border-orange-100/50">
                          <div className="text-orange-600 text-2xl pt-1">
                            <IoMdPin />
                          </div>
                          <div>
                            <p className="font-bold text-gray-700 text-sm leading-relaxed">
                              {order.shippingAddress?.address}, {order.shippingAddress?.city}<br/>
                              {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                            </p>
                          </div>
                        </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;
