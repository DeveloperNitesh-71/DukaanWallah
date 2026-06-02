import React from 'react'

const BuyerLoginForm = ({handleProcess, handleSelectCard}) => {
  return (
    <form action="" className='h-115 min-w-max w-115 p-9 border border-[rgba(52,211,153,0.25)] bg-[rgba(255,255,255,0.05)] rounded-[15px] flex flex-col items-center justify-between gap-2 text-gray-400'>
            <div className='self-start text-[14px] cursor-pointer' onClick={() => {
                handleSelectCard('')
            }}>← Back</div>
            <div className='text-4xl'>🛍️</div>
            <p className='text-white text-[23px] font-bold'>Buyer Login</p>
            <p className='text-[14px]'>Apne account me jaaye</p>
            <div className='flex items-center justify-center w-full mt-5'>
                <div className='w-full flex justify-center py-3 border border-[rgb(52,211,153)] rounded-tl-[10px] rounded-bl-[10px] bg-[rgb(52,211,153)] text-black font-bold text-[14px] cursor-pointer' onClick={() => {
                  handleProcess('login')
                }}>Login</div>
                <div className='w-full flex justify-center py-3 border border-gray-600 rounded-tr-[10px] rounded-br-[10px] font-bold text-[14px] cursor-pointer text-gray-450' onClick={() => {
                  handleProcess('signup')
                }}>Sign Up</div>
            </div>
            <input type="email" placeholder='Email address *' name='email' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <input type="password" placeholder='Password * (min 6 characters)' name='password' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <div className='w-full py-3 flex justify-center items-center bg-[rgb(52,211,153)] text-black font-bold text-[15px] rounded-[10px] cursor-pointer mt-2'>Login kare</div>
        </form>
  )
}

export default BuyerLoginForm