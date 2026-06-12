import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../context/ProductContext';
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";
import { IoMdStar } from "react-icons/io";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  if (!product) return null;

  const handleEdit = () => {
    navigate(`/seller/products/${product._id}/edit`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product._id);
    }
  };

  return (
    <div className='bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all hover:-translate-y-1 group flex flex-col relative'>
        <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100 p-10 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 mix-blend-multiply' 
            />
          ) : (
            <div className="text-6xl opacity-10 grayscale">📦</div>
          )}
          
          {/* Action Buttons overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-500">
            <button 
              onClick={handleEdit} 
              aria-label="Edit product"
              className="p-3 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl text-gray-400 hover:text-green-600 transition-all active:scale-95"
            >
              <MdModeEdit aria-hidden="true" className="text-2xl" />
            </button>
            <button 
              onClick={handleDelete} 
              aria-label="Delete product"
              className="p-3 bg-white/90 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl text-gray-400 hover:text-red-500 transition-all active:scale-95"
            >
              <MdDeleteOutline aria-hidden="true" className="text-2xl" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 flex gap-2">
             <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-gray-100 shadow-sm flex items-center gap-1.5">
                <IoMdStar className="text-yellow-400 text-sm" />
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{product.rating ? product.rating.toFixed(1) : '0.0'}</span>
             </div>
             <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.numReviews || 0} Reviews</span>
             </div>
          </div>
        </div>

        <div className='p-8 flex-grow flex flex-col bg-white'>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em] mb-1.5 block">{product.category}</span>
                <h3 className='font-black text-gray-900 text-xl tracking-tight line-clamp-1 group-hover:text-green-600 transition-colors uppercase'>{product.name}</h3>
              </div>
            </div>
            
            <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-6">
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Listing Price</p>
                   <p className="font-black text-3xl text-gray-900 tracking-tighter">₹{product.price}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inventory</p>
                    <p className={`font-black text-sm uppercase tracking-widest ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductCard
