import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from './ProductCard'
import { useProducts } from '../../../context/ProductContext'
import { IoMdAdd, IoMdFunnel } from 'react-icons/io'

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  return (
    <div className="space-y-10 max-w-full overflow-x-hidden py-2">
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 py-4'>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">Products</h2>
              <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Manage and track your <span className="text-green-600">{products.length} active</span> product listings</p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all shadow-[0_2px_20px_rgba(0,0,0,0.04)] active:scale-95">
                <IoMdFunnel aria-hidden="true" className="text-xl text-green-600" /> Filters
              </button>
              <button 
                onClick={() => navigate('/seller/products/add')}
                className="flex items-center gap-2 px-8 py-3 bg-gray-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-gray-200 hover:bg-green-600 transition-all active:scale-95"
              >
                <IoMdAdd className="text-2xl text-green-500" aria-hidden="true" /> New Product
              </button>
            </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default Products