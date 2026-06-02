import React from 'react'

const BuyerCard = ({ handleSelectCard }) => {
  return (
    <div className='h-80 w-55 border-1 border-[rgba(52,211,153,0.25)] rounded-[10px] bg-[rgba(255,255,255,0.1)] hover:bg-[rgb(52,211,153,0.25)] hover:border-[rgb(52,211,153)] hover:translate-y-[-4px] transition-all duration-200 ease-in backdrop-blur-[10px] px-5 py-5 flex flex-col gap-2' onClick={() => {
        handleSelectCard("buyerSelectd")
    }}>
        <div className='text-5xl'>🛍️</div>
        <span className='text-white text-2xl font-bold'>Buyer</span>
        <p className='text-gray-400 text-[14px]'>Ghar baithe kharido</p>
        <ul className='text-gray-300 text-[14px] flex flex-col gap-1'>
            <li>
                <span className='text-[rgb(52,211,153)]'>✓ </span> 
                <span>Apne supplier se order karein</span>
            </li>
            <li>
                <span className='text-[rgb(52,211,153)]'>✓ </span>
                <span>order track karein</span>
            </li>
            <li>
                <span className='text-[rgb(52,211,153)]'>✓ </span>
                <span>Asaan checkout</span>
            </li>
        </ul>
        <div className='bg-[rgb(52,211,153)] px-1 py-1 rounded font-medium mt-4'>Continue as a Buyer →</div>
    </div>
  )
}

export default BuyerCard

