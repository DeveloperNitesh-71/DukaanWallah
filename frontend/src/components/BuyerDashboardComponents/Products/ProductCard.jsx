import React, { useState } from "react";
import { IoMdAdd, IoMdHeartEmpty, IoMdHeart, IoMdStar, IoMdStarHalf, IoMdStarOutline, IoMdFlash } from "react-icons/io";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleDetails = () => {
    navigate(`/buyer/product/${product._id}`);
  };

  const originalPrice = Math.round(product.price * 1.25);
  const discountPercent = 20; // Hardcoded or calculated

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<IoMdStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<IoMdStarHalf key={i} className="text-yellow-400" />);
      } else {
        stars.push(<IoMdStarOutline key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] hover:-translate-y-2 relative flex flex-col h-full">
      {/* Discount Badge */}
      <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-green-900/20 uppercase tracking-widest">
        {discountPercent}% OFF
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm text-gray-400 hover:text-red-500 transition-all hover:scale-110 active:scale-90"
      >
        {isWishlisted ? <IoMdHeart className="text-xl text-red-500" /> : <IoMdHeartEmpty className="text-xl" />}
      </button>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-gray-50 relative cursor-pointer" onClick={handleDetails}>
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-10 grayscale">📦</div>
        )}
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur-md text-gray-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Details</span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-col mb-4 cursor-pointer" onClick={handleDetails}>
          <div className="flex justify-between items-start">
             <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-2 px-2 py-0.5 bg-green-50 rounded w-fit">
                {product.category}
              </span>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                 <IoMdStar className="text-yellow-500 text-xs" />
                 <span className="text-[10px] font-black text-yellow-700">{product.rating || '4.5'}</span>
              </div>
          </div>
          
          <h3 className="font-black text-gray-900 text-xl line-clamp-1 group-hover:text-green-600 transition-colors tracking-tight">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs mt-2 line-clamp-2 h-8 font-medium leading-relaxed">
            {product.description || 'Premium local selection for your daily essentials.'}
          </p>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-2 mb-6">
            <div className="flex text-sm">
                {renderStars(product.rating || 4.5)}
            </div>
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">({product.numReviews || '24'} Reviews)</span>
        </div>
        
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{product.price}</span>
                <span className="text-xs text-gray-300 font-bold line-through uppercase">₹{originalPrice}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
                <IoMdFlash className="text-orange-500 text-[10px]" />
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Free Fast Delivery</span>
            </div>
          </div>
          
          <button 
            onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
            }}
            className="w-14 h-14 flex items-center justify-center bg-gray-900 hover:bg-green-600 text-white rounded-2xl transition-all active:scale-95 shadow-xl shadow-gray-200 group-hover:shadow-green-100"
            title="Add to Bag"
          >
            <IoMdAdd className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
