import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/BuyerDashboardComponents/Header';
import Footer from '../components/BuyerDashboardComponents/Footer';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { IoMdAdd, IoMdHeartEmpty, IoMdHeart, IoMdArrowBack, IoMdStar, IoMdFlash, IoMdCheckmarkCircle } from 'react-icons/io';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-20">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/buyer')} className="text-green-600 font-bold hover:underline">Back to Shop</button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold text-sm mb-10 transition-colors group"
        >
          <IoMdArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery Placeholder */}
          <div className="space-y-4">
            <div className="aspect-square rounded-[40px] overflow-hidden bg-gray-50 border border-gray-100 shadow-inner group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map((i) => (
                 <div key={i} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer hover:border-green-500 transition-colors">
                   <img src={product.image} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" alt="" />
                 </div>
               ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center text-yellow-500 gap-1">
                  <IoMdStar /> <IoMdStar /> <IoMdStar /> <IoMdStar /> <IoMdStar className="text-gray-200" />
                  <span className="text-gray-400 text-xs font-bold ml-2">(42 Reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">{product.name}</h1>
              <p className="text-gray-500 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-10 p-8 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-black text-gray-900 tracking-tighter">₹{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-xs font-black">20% OFF</span>
              </div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Inclusive of all taxes</p>
              
              {product.category === 'Dairy' && (
                <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-sm">
                  <IoMdFlash /> Special Offer: No GST & Free Delivery on Dairy!
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center bg-gray-100 p-2 rounded-2xl border border-gray-200 h-16">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all"
                >
                  <IoMdRemove />
                </button>
                <span className="px-8 font-black text-xl text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center rounded-xl hover:bg-white hover:shadow-sm transition-all"
                >
                  <IoMdAdd />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-grow bg-gray-900 text-white h-16 rounded-2xl font-black text-lg hover:bg-green-600 transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3"
              >
                <IoMdAdd className="text-2xl" /> Add to Cart
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="h-16 w-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
              >
                {isWishlisted ? <IoMdHeart className="text-2xl text-red-500" /> : <IoMdHeartEmpty className="text-2xl" />}
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <IoMdCheckmarkCircle />
                </div>
                In Stock & Ready for 30min Delivery
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl">🚚</div>
                Direct from Local Supplier
              </div>
            </div>
          </div>
        </div>

        {/* Product Features Section */}
        <div className="mt-24 pt-24 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div>
             <h4 className="font-black text-gray-900 mb-4 uppercase tracking-tighter">Pure Quality</h4>
             <p className="text-gray-500 text-sm leading-relaxed">Sourced directly from certified local vendors to ensure the highest standards of freshness and purity.</p>
           </div>
           <div>
             <h4 className="font-black text-gray-900 mb-4 uppercase tracking-tighter">Fast Delivery</h4>
             <p className="text-gray-500 text-sm leading-relaxed">Our neighborhood delivery network ensures your order reaches you in under 30 minutes, every single time.</p>
           </div>
           <div>
             <h4 className="font-black text-gray-900 mb-4 uppercase tracking-tighter">Easy Returns</h4>
             <p className="text-gray-500 text-sm leading-relaxed">Not satisfied? We offer no-questions-asked returns on the spot for all our products.</p>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;

const IoMdRemove = ({className}) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M368 224H144c-17.7 0-32 14.3-32 32s14.3 32 32 32h224c17.7 0 32-14.3 32-32s-14.3-32-32-32z"></path></svg>
)
