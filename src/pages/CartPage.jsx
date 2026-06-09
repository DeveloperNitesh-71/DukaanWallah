import React from 'react';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import { useCart } from '../context/CartContext';
import { IoMdAdd, IoMdRemove, IoMdTrash, IoMdArrowBack, IoMdCheckmarkCircle, IoMdInformationCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const dairyTotal = cart
    .filter((item) => item.category === 'Dairy')
    .reduce((total, item) => total + item.price * item.quantity, 0);
  
  const nonDairyTotal = cartTotal - dairyTotal;
  const estimatedGST = Math.round(nonDairyTotal * 0.18);
  const totalPayable = cartTotal + estimatedGST;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs / Back */}
        <div className="flex items-center gap-4 mb-10 group">
          <Link to="/buyer" className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl hover:bg-gray-900 hover:text-white transition-all">
            <IoMdArrowBack className="text-xl" />
          </Link>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Return to</p>
            <h1 className="text-xl font-black text-gray-900 leading-none tracking-tight">Shopping Bag</h1>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-20 text-center border border-gray-50 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center text-6xl mb-8">🛒</div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your bag is empty</h2>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed">
              Looks like you haven't discovered our local treasures yet. Start exploring and fill your bag with goodness!
            </p>
            <Link 
              to="/buyer" 
              className="inline-flex items-center gap-3 bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-green-700 hover:scale-105 transition-all shadow-xl shadow-green-200"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex justify-between items-center px-4">
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{cart.length} Items Selected</h3>
                <button 
                  onClick={clearCart}
                  className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                >
                  Clear All
                </button>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-md transition-shadow">
                  {/* Image Container */}
                  <div className="h-32 w-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 relative">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {item.category === 'Dairy' && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase">Tax Free</div>
                    )}
                  </div>
                  
                  {/* Details */}
                  <div className="flex-grow flex flex-col gap-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.2em]">{item.category}</span>
                    <h3 className="font-black text-xl text-gray-900 tracking-tight">{item.name}</h3>
                    <div className="flex items-center gap-2 justify-center sm:justify-start mt-1">
                      <span className="text-2xl font-black text-gray-900">₹{item.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.2)}</span>
                    </div>
                    {item.category === 'Dairy' && (
                      <p className="text-[10px] text-green-600 font-bold mt-1 italic">Special: 0% GST & Free Delivery</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center sm:items-end gap-4">
                    <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-90"
                      >
                        <IoMdRemove />
                      </button>
                      <span className="px-6 font-black text-gray-900 text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-90"
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                    >
                      <IoMdTrash className="text-lg" /> Remove Item
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="bg-green-50 rounded-3xl p-6 border border-green-100 flex items-center gap-4 mt-4">
                <IoMdCheckmarkCircle className="text-3xl text-green-600" />
                <div>
                  <p className="font-black text-green-900 leading-none mb-1">Tax Benefits Applied!</p>
                  <p className="text-green-700 text-sm opacity-80">We've removed GST and delivery charges for all your Dairy items.</p>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-gray-900 rounded-[40px] shadow-2xl p-10 text-white relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
                
                <h2 className="text-2xl font-black mb-10 tracking-tight flex items-center justify-between">
                  Summary
                  <IoMdInformationCircle className="text-gray-600 text-xl" />
                </h2>
                
                <div className="space-y-6 mb-10 border-b border-white/5 pb-10">
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                    <span className="font-black text-white">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400">
                    <span className="font-bold uppercase tracking-widest text-[10px]">Estimated GST (18%*)</span>
                    <span className="font-black text-white">₹{estimatedGST}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold uppercase tracking-widest text-[10px] text-green-500">Delivery</span>
                    <span className="font-black text-green-500 uppercase text-xs tracking-tighter">Complimentary</span>
                  </div>
                  <p className="text-[9px] text-gray-500 font-bold italic leading-tight">* GST waived for Dairy products as per local trade policy.</p>
                </div>

                <div className="flex justify-between items-end mb-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Total Payable</span>
                    <span className="text-5xl font-black tracking-tighter">₹{totalPayable}</span>
                  </div>
                </div>

                <button className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-xl hover:bg-green-500 hover:scale-[1.02] transition-all transform active:scale-95 shadow-xl shadow-green-900/40">
                  Checkout Now
                </button>
                
                <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payments</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                    <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                    <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-6 bg-white rounded-3xl border border-gray-100 text-center">
                <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">Have a promo code?</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="CODE123" className="flex-grow bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 outline-none focus:border-green-500 transition-all font-black" />
                  <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-gray-800 transition-colors">APPLY</button>
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

