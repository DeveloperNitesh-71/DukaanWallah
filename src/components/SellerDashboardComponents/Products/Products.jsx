import React from 'react'
import ProductCard from './ProductCard'

const Products = () => {
  return (
    <div>
        <div className='flex justify-between px-20 py-10 w-full'>
            <span className='text-2xl font-medium'>My Products</span>
            <button className='border-1 px-2 py-1 rounded bg-blue-500 text-white'> + Add Products</button>
        </div>
        <div className='px-20 flex gap-5 flex-wrap'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
  )
}

export default Products