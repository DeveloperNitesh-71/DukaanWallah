import React from 'react'

const SellerSignUpForm = ({handleProcess, handleSelectCard}) => {
  return (
    <form action="" className='h-max min-w-max w-115 p-9 border border-[rgba(245,158,11,0.3)] bg-[rgba(255,255,255,0.05)] rounded-[15px] flex flex-col items-center justify-between gap-2 text-gray-400'>
            <div className='self-start text-[14px] cursor-pointer' onClick={() => {
              handleSelectCard('')
            }}>← Back</div>
            <div className='text-4xl'>🏪</div>
            <p className='text-white text-[23px] font-bold'>Seller Sign Up</p>
            <p className='text-[14px]'>Naya Account Banayein</p>
            <div className='flex items-center justify-center w-full mt-5'>
                <div className='w-full flex justify-center py-3 border border-gray-600 rounded-tl-[10px] rounded-bl-[10px] font-bold text-[14px] cursor-pointer text-gray-450' onClick={() => {
                  handleProcess('login')
                }}>Login</div>
                <div className='w-full flex justify-center py-3 border border-[rgb(245,158,11)] rounded-tr-[10px] rounded-br-[10px] bg-[rgb(245,158,11)] text-black font-bold text-[14px] cursor-pointer' onClick={() => {
                  handleProcess('signup')
                }}>Sign Up</div>
            </div>
            <input type="text" placeholder='Full Name *' name='Fullname' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <input type="text" placeholder='Shop Name *' name='shopname' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <input type="phone" placeholder='Mobile Number *' name='mobileNumber' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <input type="text" placeholder="Shop's address" name='shopaddress' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2'/>
            <input type="email" placeholder='Email address *' name='email' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <input type="password" placeholder='Password * (min 6 characters)' name='password' className='border border-gray-500 px-5 py-3 w-full rounded-[10px] text-[14px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] outline-none mt-2' required/>
            <div className='border border-[rgba(245,158,11,0.3)] w-full bg-[rgba(245,158,11,0.3)] p-3 rounded-[10px] flex flex-col gap-2 mt-2'>
                <p className='text-[rgb(245,158,11)] text-[13px]'>⚠️ Zaruri Shart — Delivery Zimmedari</p>
                <p className='text-[12px] text-gray-300'>Seller ke roop mein, aapko apne saare orders khud deliver karne honge.</p>
                <div className='flex gap-2'>
                    <input type="checkbox" name='selfDelivery'/>
                    <p className='text-[12px] text-gray-300'>Main samajhta/samajhti hoon aur delivery ki zimmedari leta/leti hoon</p>
                </div>
            </div>
            <div className='w-full py-3 flex justify-center items-center bg-[rgb(245,158,11)] text-black font-bold text-[15px] rounded-[10px] cursor-pointer mt-2'>Create Account</div>
        </form>
  )
}

export default SellerSignUpForm