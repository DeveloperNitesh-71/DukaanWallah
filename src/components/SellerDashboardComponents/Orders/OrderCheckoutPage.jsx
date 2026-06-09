import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoMdArrowBack, IoMdCash, IoMdPerson, IoMdCheckmark, IoMdMap } from 'react-icons/io';
import { getMockOrders } from '../../../data/mockData';

const OrderCheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const allOrders = getMockOrders();
    const foundOrder = allOrders.find(o => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // If not found, maybe redirect back
      // navigate('/seller/orders');
    }
  }, [id]);

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/seller/orders');
      }, 2000);
    }, 800);
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/seller/orders')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg px-2 py-1 -ml-2"
      >
        <IoMdArrowBack className="group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
        <span className="text-sm font-medium">Back to Orders</span>
      </button>

      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 py-4'>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Order Checkout</h1>
            <div className="flex items-center gap-3 mt-1">
               <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">ID: <span className="text-green-600">{order.id}</span></span>
               <span className="text-[10px] font-black uppercase tracking-widest text-white bg-yellow-500 px-3 py-1 rounded-full shadow-lg shadow-yellow-100">Action Required</span>
            </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Delivery Info */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Delivery Details</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                  <IoMdPerson className="text-xl" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">John Customer</h3>
                  <p className="text-sm text-gray-500 mt-0.5">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 flex-shrink-0">
                  <IoMdMap className="text-xl" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Delivery Address</h3>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                    Flat 402, Sunshine Apartments, Sector 44, Noida
                    <br />
                    Uttar Pradesh, 201301
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Payment Method</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setPaymentMethod('cash')}
                  className={`flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    paymentMethod === 'cash' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <IoMdCash className="text-lg" aria-hidden="true" /> 
                  <span>Cash on Delivery</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    paymentMethod === 'upi' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-bold italic" aria-hidden="true">UPI</span>
                  <span>Online Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Summary */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm sticky top-24 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-semibold text-gray-900">Order Summary</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border border-gray-100 rounded-lg bg-white p-2 flex-shrink-0 shadow-sm">
                  <img src={order.img} alt={order.name} width="48" height="48" className="w-full h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{order.name}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{order.qty} {order.unit} x ₹{order.price}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{order.price * order.qty}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between pt-4 mt-2 border-t border-gray-100 text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{order.price * order.qty}</span>
                </div>
              </div>

              <button 
                onClick={handleComplete}
                disabled={isProcessing || isSuccess}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${
                  isSuccess 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-70 disabled:hover:bg-indigo-600'
                }`}
              >
                {isProcessing ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></span>
                ) : isSuccess ? (
                  <><IoMdCheckmark className="text-lg" aria-hidden="true" /> Completed</>
                ) : (
                  <>Complete Order</>
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
