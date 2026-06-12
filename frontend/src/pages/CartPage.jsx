import React, { useState } from 'react';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { IoMdAdd, IoMdRemove, IoMdTrash, IoMdArrowBack, IoMdInformationCircle, IoMdWallet, IoMdGift, IoMdFlame } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart, placeOrder } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dairyTotal = cart
    .filter((item) => item.category === 'Dairy')
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
  const nonDairyTotal = cartTotal - dairyTotal;
  const estimatedGST = Math.round(nonDairyTotal * 0.18);
  const totalPayable = cartTotal + estimatedGST;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const shippingAddress = {
        address: '123, Green Park',
        city: 'New Delhi',
        postalCode: '110016',
        country: 'India'
      };
      await placeOrder(shippingAddress);
      showToast('Order placed successfully!', 'success');
      navigate('/buyer');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="flex items-center gap-6">
            <Link to="/buyer" className="w-14 h-14 bg-white shadow-xl shadow-gray-100 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-green-600 hover:border-green-100 transition-all transform hover:-translate-x-1">
              <IoMdArrowBack className="text-2xl" />
            </Link>
            <div>
              <p className="text-[10px] text-green-600 font-black uppercase tracking-[0.3em] mb-1">Your Shopping Experience</p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                Shopping Bag <span className="text-gray-200">/</span> <span className="text-green-600">{cart.length}</span>
              </h1>
            </div>
          </div>
          {cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <IoMdTrash className="text-lg" /> Clear Entire Bag
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[60px] shadow-[0_40px_100px_rgba(0,0,0,0.02)] p-20 text-center border border-gray-50 flex flex-col items-center animate-in fade-in zoom-in duration-700">
            <div className="w-40 h-40 bg-gray-50 rounded-full flex items-center justify-center text-7xl mb-10 relative">
              🛒
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-2xl">🔍</div>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">Your bag is feeling light</h2>
            <p className="text-gray-400 mb-12 max-w-sm mx-auto leading-relaxed font-medium">
              Discover local favorites and start filling your bag with premium quality products curated just for you.
            </p>
            <Link 
              to="/buyer" 
              className="inline-flex items-center gap-4 bg-gray-900 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-green-600 hover:scale-105 transition-all shadow-2xl shadow-gray-200"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {cart.map((item, idx) => (
                <div 
                  key={item._id} 
                  className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col sm:flex-row items-center gap-10 group hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500 animate-in slide-in-from-left-10"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="h-40 w-40 rounded-[2rem] overflow-hidden flex-shrink-0 bg-gray-50 relative border border-gray-50 shadow-inner">
                    <img 
                      src={item.images && item.images.length > 0 ? item.images[0] : ''} 
                      alt={item.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {item.category === 'Dairy' && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-green-600 text-[8px] font-black px-3 py-1 rounded-full uppercase shadow-sm border border-green-50">Tax Free</div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-grow flex flex-col gap-2 text-center sm:text-left">
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.3em]">{item.category}</span>
                    <h3 className="font-black text-2xl text-gray-900 tracking-tight group-hover:text-green-600 transition-colors">{item.name}</h3>
                    <p className="text-gray-400 text-xs font-medium line-clamp-1 mb-2">{item.description || 'Premium quality local produce'}</p>
                    
                    <div className="flex items-center gap-4 justify-center sm:justify-start">
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{item.price}</span>
                        <span className="text-[10px] text-gray-300 font-bold line-through uppercase">₹{Math.round(item.price * 1.2)}</span>
                      </div>
                      <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>
                      <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-tight hidden sm:block">
                        <p className="text-green-600">Free</p>
                        <p>Delivery</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="flex flex-col items-center sm:items-end gap-6 sm:pl-6 sm:border-l border-gray-50">
                    <div className="flex items-center bg-gray-50/50 p-2 rounded-2xl border border-gray-100 shadow-inner gap-1">
                      <button 
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 10))}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:text-red-500 hover:border-red-100 transition-all active:scale-90 text-gray-400 text-[10px] font-black"
                        title="Decrease by 10"
                      >
                        -10
                      </button>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:text-green-600 hover:border-green-100 transition-all active:scale-90 text-gray-400"
                      >
                        <IoMdRemove className="text-xl" />
                      </button>
                      <span className="px-4 font-black text-gray-900 text-xl w-14 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:text-green-600 hover:border-green-100 transition-all active:scale-90 text-gray-400"
                      >
                        <IoMdAdd className="text-xl" />
                      </button>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 10)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100 hover:text-green-600 hover:border-green-100 transition-all active:scale-90 text-gray-400 text-[10px] font-black"
                        title="Increase by 10"
                      >
                        +10
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm hover:shadow-red-200"
                      title="Remove Item"
                    >
                      <IoMdTrash className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-5 sticky top-32">
              <div className="bg-gray-900 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] p-12 text-white relative overflow-hidden flex flex-col gap-10">
                {/* Background Decor */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-600/10 rounded-full blur-[100px]"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px]"></div>

                <div className="flex items-center justify-between border-b border-white/5 pb-8 relative z-10">
                  <h2 className="text-3xl font-black tracking-tight">Order Summary</h2>
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl text-gray-500">
                    <IoMdInformationCircle />
                  </div>
                </div>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-black uppercase tracking-widest text-[10px]">Bag Total</span>
                    <span className="font-black text-white text-lg">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="font-black uppercase tracking-widest text-[10px]">Estimated GST</span>
                      <div className="px-2 py-0.5 bg-white/5 rounded-md text-[8px] font-black uppercase tracking-widest">18%</div>
                    </div>
                    <span className="font-black text-white text-lg">₹{estimatedGST}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-500">
                    <span className="font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                      <IoMdFlame /> Shipping Fee
                    </span>
                    <span className="font-black uppercase tracking-widest text-[10px]">FREE</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-[2rem] p-8 flex flex-col gap-2 border border-white/5 relative z-10">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Total Payable Amount</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tighter">₹{totalPayable}</span>
                    <span className="text-xs text-gray-600 font-bold uppercase tracking-widest">INR</span>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <button 
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-8 rounded-[2rem] font-black text-2xl hover:bg-green-500 hover:scale-[1.02] transition-all transform active:scale-95 shadow-2xl shadow-green-900/40 disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    {loading ? (
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <><IoMdWallet className="text-3xl" /> Place Order</>
                    )}
                  </button>
                  <p className="text-[8px] text-center text-gray-600 font-black uppercase tracking-widest">By completing this order you agree to our Terms of Service</p>
                </div>

                {/* Secure Badge */}
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/5">
                   <div className="flex -space-x-3">
                     {[1,2,3].map(i => (
                       <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-black">🔒</div>
                     ))}
                   </div>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Safe & Secure<br/>Checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
