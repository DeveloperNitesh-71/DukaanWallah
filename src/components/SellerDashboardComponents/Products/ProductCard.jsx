import React from 'react'
import _170ml from "../../../assets/170ml.jpeg"
const ProductCard = () => {
  return (
    <div className='w-55 border-1 border-gray-400 rounded px-5 py-3 bg-white shadow-xl gap-2 flex flex-col'>
        <img src={_170ml} alt="Amul Milk 170 ml" className='h-50 w-full rounded' />
        <div className='flex flex-col'>
            <span className='font-medium '>Amul milk 170ml</span>
            <span className='font-medium text-gray-600 text-sm'>Dairy • per ml</span>
            <div className='flex w-full justify-between items-center'>
            <span className='text-green-700 font-medium'>₹10</span>
            <span className='text-gray-500 text-sm'>stock: 50</span>
            </div>
            <div className='flex w-full justify-between items-center'>
                <button className='border-1 border-blue-600 bg-blue-300 px-2 rounded '>✏️ Edit</button>
                <button className='border-1 border-red-600 bg-red-300 px-2 rounded '>🗑️ Delete</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard