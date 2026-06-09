import React, { useState } from "react";
import { IoMdAdd, IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  const handleDetails = () => {
    navigate(`/buyer/product/${product.id}`);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 relative">
      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsWishlisted(!isWishlisted);
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors"
      >
        {isWishlisted ? <IoMdHeart className="text-xl text-red-500" /> : <IoMdHeartEmpty className="text-xl" />}
      </button>

      {/* Product Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-50 relative cursor-pointer" onClick={handleDetails}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.stock < 10 && (
          <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Only {product.stock} left!
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <div className="flex flex-col mb-4 cursor-pointer" onClick={handleDetails}>
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">
            {product.category}
          </span>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-400 text-xs mt-1 line-clamp-2 h-8 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
            <span className="text-[10px] text-gray-400 line-through">₹{Math.round(product.price * 1.2)}</span>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-lg shadow-gray-200"
          >
            <IoMdAdd className="text-lg" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



