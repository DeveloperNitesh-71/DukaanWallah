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
        </div>

        <div className='p-6 flex-grow flex flex-col bg-white'>
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-1 block">{product.category}</span>
                <h3 className='font-black text-gray-900 text-lg tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors'>{product.name}</h3>
              </div>
            </div>
            <p className="font-black text-2xl text-gray-900 tracking-tighter mb-4">₹{product.price}</p>
        </div>
    </div>
  )
}

export default ProductCard