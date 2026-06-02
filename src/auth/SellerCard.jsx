import React from 'react'

const SellerCard = ({handleSelectCard}) => {
  return (
    <div className='h-80 w-55 border-1 border-[rgba(245,158,11,0.3)] rounded-[10px] bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(245,158,11,0.1)] hover:border-[rgb(245,158,11)] hover:translate-y-[-4px] transition-all duration-200 ease-in backdrop-blur-[10px] px-5 py-5 flex flex-col gap-2' onClick={() => {
        handleSelectCard("sellerSelected")
    }}>
        <div className='text-5xl'>🏪</div>
        <span className='text-white text-2xl font-bold'>Seller</span>
        <p className='text-gray-400 text-[14px]'>Apna saman becho</p>
        <ul className='text-gray-300 text-[14px] flex flex-col gap-1'>
            <li>
                <span className='text-[rgb(245,158,11)]'>✓ </span> 
                <span> Khud delivery karein</span>
            </li>
            <li>
                <span className='text-[rgb(245,158,11)]'>✓ </span>
                <span>orders track karein</span>
            </li>
            <li>
                <span className='text-[rgb(245,158,11)]'>✓ </span>
                <span>Daily/Weekly reports</span>
            </li>
        </ul>
        <div className='bg-[rgb(245,158,11)] px-2 py-1 rounded font-medium mt-4'>Continue as a seller →</div>
    </div>
  ) 
}

export default SellerCard