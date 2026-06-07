import React from 'react'
import ProductCard from './ProductCard'

const Product = () => {
    return (
        <div>
            <div className='flex items-center w-full pt-5 px-15'>
                <ul className='flex items-center justify-center gap-5'>
                    <li className='border-1 border-gray-400 px-2  rounded-full bg-white hover:bg-gray-50'>All</li>
                    <li className='border-1 border-gray-400 px-2  rounded-full bg-white hover:bg-gray-50'>Dairy</li>
                    <li className='border-1 border-gray-400 px-2  rounded-full bg-white hover:bg-gray-50'>Grocery</li>
                    <li className='border-1 border-gray-400 px-2  rounded-full bg-white hover:bg-gray-50'>Cold driks</li>
                </ul>
            </div>
            <div className='px-15 pt-5 flex flex-wrap gap-8 pb-[20vh]'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default Product