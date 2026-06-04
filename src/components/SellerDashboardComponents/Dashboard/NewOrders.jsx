import React from 'react'
import _170ml from '../../../assets/170ml.jpeg'
import _500ml from '../../../assets/500ml.jpeg'
import butter from '../../../assets/butter.jpeg'
import _500gmdahi from '../../../assets/500gmdahi.jpeg'
import masala from '../../../assets/masala.jpeg'
import sada from '../../../assets/sada.jpeg'

const NewOrders = () => {
  return (
    <div className='w-full h-auto flex flex-col justify-center items-center p-4 rounded-lg bg-white shadow-md'>
        {/* <p>📦 No new orders today. Check back later!</p> */}
        <div className='w-full h-auto flex flex-col justify-center items-center px-4 rounded-lg bg-white'>
            <ul className='w-full grid grid-cols-5 place-content-center font-medium text-lg bg-purple-100 px-4 py-1'>
                <li>Product</li>
                <li>Quantity</li>
                <li>Unit</li>
                <li>Price</li>
                <li>Total Amount</li>
            </ul>
        </div>

        <div className='w-full h-auto flex flex-col justify-center items-center px-4 rounded-lg bg-white'>
            <ul className='w-full grid grid-cols-5 place-content-center items-center font-medium text-lg  px-4 py-1 border-b border-gray-300'>
                <div className='flex items-center space-x-4'>
                    <img src={_170ml} alt="170ml" className='w-16 h-16 object-contain' />
                    <li className='text-sm'>170ml amul milk</li>
                </div>
                <li>10</li>
                <li className='text-gray-600 font-bold'>ml</li>
                <li className='text-green-600'>₹ 10</li>
                <li className='text-green-600 font-bold'>₹ 100</li>
            </ul>
            <ul className='w-full grid grid-cols-5 place-content-center items-center font-medium text-lg  px-4 py-1 border-b border-gray-300'>
                <div className='flex items-center space-x-4'>
                    <img src={_500ml} alt="500ml" className='w-16 h-16 object-contain' />
                    <li className='text-sm'>500ml amul milk</li>
                </div>
                <li>10</li>
                <li className='text-gray-600 font-bold'>ml</li>
                <li className='text-green-600'>₹ 36</li>
                <li className='text-green-600 font-bold'>₹ 360</li>
            </ul>
            <ul className='w-full grid grid-cols-5 place-content-center items-center font-medium text-lg  px-4 py-1 border-b border-gray-300'>
                <div className='flex items-center space-x-4'>
                    <img src={butter} alt="butter" className='w-16 h-16 object-contain' />
                    <li className='text-sm'>butter</li>
                </div>
                <li>10</li>
                <li className='text-gray-600 font-bold'>ml</li>
                <li className='text-green-600'>₹ 50</li>
                <li className='text-green-600 font-bold'>₹ 500</li>
            </ul>
            <ul className='w-full grid grid-cols-5 place-content-center items-center font-medium text-lg  px-4 py-1 border-b border-gray-300'>
                <div className='flex items-center space-x-4'>
                    <img src={_500gmdahi} alt="500gmdahi" className='w-16 h-16 object-contain' />
                    <li className='text-sm'>500gm dahi</li>
                </div>
                <li>10</li>
                <li className='text-gray-600 font-bold'>ml</li>
                <li className='text-green-600'>₹ 35</li>
                <li className='text-green-600 font-bold'>₹ 350</li>
            </ul>
            <ul className='w-full grid grid-cols-5 place-content-center items-center font-medium text-lg  px-4 py-1 border-b border-gray-300'>
                <div className='flex items-center space-x-4'>
                    <img src={masala} alt="masala" className='w-16 h-16 object-contain' />
                    <li className='text-sm'>masala chhach</li>
                </div>
                <li>10</li>
                <li className='text-gray-600 font-bold'>ml</li>
                <li className='text-green-600'>₹ 10</li>
                <li className='text-green-600 font-bold'>₹ 100</li>
            </ul>
            <ul className='w-full grid grid-cols-5 place-content-center items-center font-medium text-lg  px-4 py-1 border-b border-gray-300'>
                <div className='flex items-center space-x-4'>
                    <img src={sada} alt="sada" className='w-16 h-16 object-contain' />
                    <li className='text-sm'>sada chhachh</li>
                </div>
                <li>10</li>
                <li className='text-gray-600 font-bold'>ml</li>
                <li className='text-green-600'>₹ 15</li>
                <li className='text-green-600 font-bold'>₹ 150</li>
            </ul>
        </div>

        <div className='w-full h-auto flex justify-between items-center px-10 py-2 pr-52 rounded-lg bg-yellow-100'>
            <span className='font-bold text-xl'>Total</span>
            <span className=' text-right text-orange-600 text-xl'>₹ 1560</span>
        </div>
        
    </div>
  )
}

export default NewOrders