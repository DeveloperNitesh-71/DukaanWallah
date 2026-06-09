import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  if (!product) return null;

  const handleEdit = () => {
    navigate(`/seller/products/${product.id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 group flex flex-col relative'>
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 border-b border-gray-100 p-8 flex items-center justify-center">
          <img src={product.image} alt={product.name} width="400" height="300" className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply' />
          
          {/* Action Buttons overlay - Buyer Style */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-300">
            <button 
              onClick={handleEdit} 
              aria-label="Edit product"
              className="p-2.5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-lg text-gray-400 hover:text-green-600 transition-all active:scale-95"
            >
              <MdModeEdit aria-hidden="true" className="text-xl" />
            </button>
            <button 
              onClick={handleDelete} 
              aria-label="Delete product"
              className="p-2.5 bg-white/90 backdrop-blur-sm border border-gray-100 rounded-xl shadow-lg text-gray-400 hover:text-red-500 transition-all active:scale-95"
            >
              <MdDeleteOutline aria-hidden="true" className="text-xl" />
            </button>
          </div>
          
          {/* Stock Badge - Buyer Style */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm transition-colors ${
              product.stock > 10 
                ? 'bg-green-50 text-green-700 border-green-100 shadow-green-100' 
                : 'bg-red-50 text-red-700 border-red-100 shadow-red-100'
            }`}>
              {product.stock > 10 ? 'In Stock' : 'Low Stock'}
            </span>
          </div>
        </div>

        <div className='p-6 flex-grow flex flex-col bg-white'>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 block">{product.category}</span>
                <h3 className='font-black text-gray-900 text-lg tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors'>{product.name}</h3>
              </div>
            </div>
            <p className="font-black text-2xl text-gray-900 tracking-tighter mb-4">₹{product.price}</p>
            
            <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock Level</span>
                <span className="font-black text-sm text-gray-900">{product.stock} <span className="text-[10px] font-bold text-gray-400">UNITS</span></span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Value</span>
                <span className="font-black text-sm text-green-600 tracking-tight">₹{(product.stock * product.price).toLocaleString()}</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard